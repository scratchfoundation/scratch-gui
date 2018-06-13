#!/bin/bash
# gh-pages cleanup script: Switches to gh-pages branch, and removes all
# directories that aren't listed as remote branches

function deslash () {
    # Recursively build a string of a directory's parents. E.g.,
    # deslashed "feature/test/branch" returns feature/test feature
    deslashed=$(dirname $1)
    if [[ $deslashed =~ .*/.* ]]
    then
        echo $deslashed $(deslash $deslashed)
    else
        echo $deslashed
    fi
}

repository=origin

if [[ $1 != "" ]]
then
    repository=$1
fi

# Cache current branch
current=$(git rev-parse --abbrev-ref HEAD)

# Checkout most recent gh-pages
git fetch --force $repository gh-pages:gh-pages
git checkout gh-pages
git clean -fdx

# Make an array of directories to not delete, from the list of remote branches
branches=$(git ls-remote --refs --quiet $repository | awk '{print $2}' | sed -e 's/refs\/heads\///')

# Add parent directories of branches to the exclusion list (e.g. greenkeeper/)
for branch in $branches; do
    if [[ $branch =~ .*/.* ]]; then
        branches+=" $(deslash $branch)"
    fi
done

# Dedupe all the greenkeepers (or other duplicate parent directories)
branches=$(echo "${branches[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' ')

# Remove all directories that don't have corresponding branches
# It would be nice if we could exclude everything in .gitignore, but we're
# not on the branch with the .gitignore anymore... so we can't.
find . -type d \
    \( \
        -path ./.git -o \
        -path ./node_modules \
        $(printf " -o -path ./%s" $branches) \
    \) -prune \
    -o -mindepth 1 -type d \
    -exec rm -rfv {} \;

# Push
git add -u
git commit -m "Remove stale directories"
git push $repository gh-pages

# Return to where we were
git checkout -f $current
exit
