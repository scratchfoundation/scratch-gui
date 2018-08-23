# scratch-gui
#### Scratch GUI is a set of React components that comprise the interface for creating and running Scratch 3.0 projects

[![Build Status](https://travis-ci.com/LLK/scratch-gui.svg?token=Yfq2ryN1BwaxDME69Lnc&branch=master)](https://travis-ci.com/LLK/scratch-gui)
[![Greenkeeper badge](https://badges.greenkeeper.io/LLK/scratch-gui.svg)](https://greenkeeper.io/)

## Installation
This requires you to have Git and Node.js installed.

In your own node environment/application:
```bash
npm install https://github.com/LLK/scratch-gui.git
```
If you want to edit/play yourself:
```bash
git clone git@github.com:LLK/scratch-gui.git
cd scratch-gui
npm install
```

## Getting started
Running the project requires Node.js to be installed.

## Running
Open a Command Prompt or Terminal in the repository and run:
```bash
npm start
```
Then go to [http://localhost:8601/](http://localhost:8601/) - the playground outputs the default GUI component

## Developing alongside other Scratch repositories

If you wish to develop scratch-gui alongside other scratch repositories that depend on it, you may wish
to have the other repositories use your local scratch-gui build instead of fetching the current production
version of the scratch-gui that is found by default using `npm install`.

To do this:

1. Make sure you have run `npm install` from this repository's top level
2. Make sure you have run `npm install` from the top level of each repository (such as scratch-www) that depends on scratch-gui
3. From this repository's top level, build the `dist` directory by running `BUILD_MODE=dist npm run build`
4. From this repository's top level, establish a link to this repository by running `npm link`
5. From the top level of each repository that depends on scratch-gui, run `npm link scratch-gui`
6. Build or run the repositories that depend on scratch-gui

## Testing
NOTE: If you're a windows user, please run these scripts in Windows `cmd.exe`  instead of Git Bash/MINGW64.

Run linter, unit tests, build, and integration tests.
```bash
npm test
```

Run unit tests in isolation.
```bash
npm run unit-test
```

Run unit tests in watch mode (watches for code changes and continuously runs tests). See [jest cli docs](https://facebook.github.io/jest/docs/en/cli.html#content) for more options.
```bash
npm run unit-test -- --watch
```

Run integration tests in isolation.
```bash
npm run integration-test
```

You may want to review the documentation for [Jest](https://facebook.github.io/jest/docs/en/api.html) and [Enzyme](http://airbnb.io/enzyme/docs/api/) as you write your tests.

## Publishing to GitHub Pages

You can publish the GUI to github.io so that others on the Internet can view it.
[Read the wiki for a step-by-step guide.](https://github.com/LLK/scratch-gui/wiki/Publishing-to-GitHub-Pages)

## Donate
We provide [Scratch](https://scratch.mit.edu) free of charge, and want to keep it that way! Please consider making a [donation](https://secure.donationpay.org/scratchfoundation/) to support our continued engineering, design, community, and resource development efforts. Donations of any size are appreciated. Thank you!
