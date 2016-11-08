# scratch-gui
#### Scratch GUI is a set of React components that comprise the interface for creating and running Scratch 3.0 projects

## Please note: scratch-gui is at an early stage and we are not ready for pull requests yet

[![Build Status](https://travis-ci.com/LLK/scratch-gui.svg?token=Yfq2ryN1BwaxDME69Lnc&branch=master)](https://travis-ci.com/LLK/scratch-gui)

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

## Testing
```bash
npm test
```

## Git Hooks
If you would like to ensure your contributions build cleanly every time, opt in
to the git hooks for the project. Create a file called `.opt-in` in the root of
the project with the contents:

```
precommit
prepush
postmerge
postrewrite
```

Or you can include only the hooks you would like to use.

### precommit
Run lint before committing

### prepush
Run tests before pushing

### postmerge
`npm install` after merging

### postrewrite
`npm install` after rebasing

## Donate
We provide [Scratch](https://scratch.mit.edu) free of charge, and want to keep it that way! Please consider making a [donation](https://secure.donationpay.org/scratchfoundation/) to support our continued engineering, design, community, and resource development efforts. Donations of any size are appreciated. Thank you!
