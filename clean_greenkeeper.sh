#!/bin/bash

# gh-pages cleanup script: Switches to gh-pages branch, and removes all
# greenkeeper/* directories that aren't listed as remote branches

# Join list of remote greenkeeper/* branches for GLOBIGNORE
# Turns origin/greenkeeper/package-x.x.x, ..., into
# greenkeeper/package-x.x.x:greenkeeper/package:...:
function join { local IFS=":"; shift; echo "${*#origin/}"; }

current=$(git rev-parse --abbrev-ref HEAD)
git fetch origin
greenkeeper=$(git branch -r --list origin/greenkeeper/*)
git checkout -f gh-pages

# Remove all greenkeeper/* directories that aren't remote branch names
GLOBIGNORE=$(join $greenkeeper)
rm -rf greenkeeper/*
git add -u
git commit -m "Remove old greenkeeper directories"
git push origin

# Return to where we were
git checkout -f $current
exit
