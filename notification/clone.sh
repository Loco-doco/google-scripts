#!/bin/bash

# create an array with all the filer/dir inside ~/myDir
arr=(*/)

echo "pApp Code를 입력해주세요 :"
read dirname

isExisted=false

for ((i = 0; i < ${#arr[@]}; i++)); do
  input="${dirname}/"
  targetDir="${arr[$i]}"
  if [[ "${targetDir}" == "${input}" ]]; then
    isExisted=true
  fi
done

echo "스크립트 ID를 입력해주세요 :"
read scriptID

if test "${isExisted}"=false; then
  mkdir ${dirname}
fi

cd ${dirname}

clasp clone ${scriptID}
