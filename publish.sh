#!/bin/bash 
# Publish the website to both mikeandsuz.com and suzandmike.com
# + Push to git

git checkout master
./sync

git checkout suzandmike
git merge master --no-edit

./sync 

git push 

git checkout master
git push 
