#!/bin/bash

# create an array with all the filer/dir inside ~/myDir
arr=(*/)

for ((i=0; i<${#arr[@]}; i++)); do
    cd ${arr[$i]}
    clasp pull
    cd ..
done
