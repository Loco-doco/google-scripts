#!/bin/bash

# create an array with all the filer/dir inside ~/myDir
arr=(*/)

echo "수정한 폴더를 입력해주세요 :"
read fixedDir

echo "복사할 파일을 입력해주세요."
read targetFileName

# cat ./${fixedDir}/${targetFileName}

for ((i = 0; i < ${#arr[@]}; i++)); do
  input="${fixedDir}/"
  targetDir="${arr[$i]}"
  echo "디렉토리 = ${targetDir}, 입력한 폴더명 = ${input}"
  if [[ "${targetDir}" == "${input}" ]]; then
    echo "일치 - pass"
  else
    cp ./${input}${targetFileName} ./${targetDir}${targetFileName}
  fi
done
