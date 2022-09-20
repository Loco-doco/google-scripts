#!/bin/bash

# create an array with all the filer/dir inside ~/myDir
echo "pApp Code를 입력해주세요 :"
read dirname

mkdir $dirname
cd $dirname

echo "스크립트 ID를 입력해주세요 :"
read scriptID

clasp clone ${scriptID}