module.exports = { 
  "Main config": {
    rootPath: __dirname + "/../../",
    extensions: [
      require('../../buster-helper.js')
    ]
  },
  //"Browser tests": require('./browser'),
  "Server-side tests": require('./node'),
  "AMD tests": require('./amd')
}
