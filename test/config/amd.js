module.exports = {
  extends: "Main config",
  autoRun: false,
  environment: "browser",
  libs: ['amd/require.js'],
  sources: ['amd/app.js'],
  resources: ['lib/*.js'],
  tests: ['test/*-test.js']
};
