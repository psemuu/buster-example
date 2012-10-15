buster-example
==============

3 gates game simulation tested in buster.js

[![Build Status](https://secure.travis-ci.org/fragphace/buster-example.png?branch=master)](http://travis-ci.org/fragphace/buster-example)

## Installation

```
git clone https://github.com/fragphace/buster-example.git
cd buster-example
npm install
```

## Configuration

Add buster-helper to extensions.
For browser testing place require.js in libs.
Always place require.js configuration in sources.

## Writing tests

For tests to work in all environments use the following methods of the busterHelper object:
- busterHelper.require - the require function of require.js used for loading dependencies
- busterHelper.testsWrapper - pass your highest level tests to this method
- busterHelper.runTests - run tests when all dependencies have been loaded

## Usage

For browser and AMD tests (you need to start buster server first):

```
buster test --browser
```

For node.js tests:

```
buster test --node
``` 

For headless tests:

```
grunt buster
```
