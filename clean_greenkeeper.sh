#!/bin/bash

# gh-pages cleanup script: Switches to gh-pages branch, and removes all
# directories that aren't listed as remote branches


current=$(git rev-parse --abbrev-ref HEAD)
git fetch origin
branches=$(git branch -r --list origin/*)
git checkout -f gh-pages

# Remove all directories that aren't remote branch names
find * -type d \( -path ./.git $(printf " -o -path ./%s" "${branches[@]//origin\//}") \) -prune -o -type d -exec rm -rfvi "$0" {} \;
git add -u
git commit -m "Remove stale directories"
git push origin

# Return to where we were
git checkout -f $current
exit
