module.exports =  {
    name: 'buster-helper',

    create: function (options) {
        return Object.create(this);
    },

    configure: function (conf) {
        if (conf.environment === 'node') {
            var jsdom = require('jsdom').jsdom,
                document = jsdom();

            //global.document = document;//this crashes buster result reporting in node
            global.window = document.createWindow();
            global.navigator = document.navigator;//necessary for requirejs to be loaded correctly in node

            conf.on('load:sources', function (resourceSet) {
                var requirejs = require('requirejs'),
                    paths = resourceSet.loadPath.paths(),
                    config;

                if (paths.length) {
                    config = require(conf.rootPath + paths[0]);
                    if (typeof config !== 'undefined') {
                        config['baseUrl'] = conf.rootPath;
                        config['nodeRequire'] = require;
                        requirejs.config(config);

                        if (paths.length > 1) {
                            resourceSet.loadPath.remove(paths[0]);
                        } else {
                            resourceSet.loadPath.clear();
                        }
                    }
                }

                global.buster = require('buster');
                global.requirejs = requirejs;
            }.bind(this));

            conf.on('load:tests', function (resourceSet) {
                global.busterHelper = {
                    require: global.requirejs,
                    testsWrapper: function (tests) {
                        var setUp;

                        if (typeof tests.setUp !== 'undefined') {
                            setUp = tests.setUp;
                            tests.setUp = function () {
                                global.document = document;//when you place it here buster reporter shows results

                                return setUp.apply(this, arguments);
                            }
                        }
                        
                        return tests;
                    },
                    runTests: function () {}
                };
            }.bind(this));
        } else if (conf.environment === 'browser') {
            conf.on('load:tests', function (resourceSet) {
                resourceSet.addResource({
                    path: 'bootstrap-browser.js',
                    content: "var busterHelper = {"
                        + "require: ((typeof require === 'function') ? require : function () {}),"
                        + "testsWrapper: function (tests) { return tests; },"
                        + "runTests: function () { buster.run(); }"
                    + "};"
                });
                resourceSet.loadPath.prepend('bootstrap-browser.js');
            });
        }
    }
};
