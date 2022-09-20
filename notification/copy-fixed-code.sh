#!/bin/bash

# create an array with all the filer/dir inside ~/myDir
arr=(*/)

echo "수정한 폴더를 입력해주세요 :"
read dirname

echo "복사할 파일을 입력해주세요."
read fileName


# cat ./${dirname}/${fileName}

for ((i=0; i<${#arr[@]}; i++)); do
    input="${dirname}/"
    dir="${arr[$i]}"
    echo "디렉토리 = ${dir}, 입력한 폴더명 = ${input}"
    if [[ "${dir}" == "${input}" ]]
    then
      echo "일치 - pass"
    else
      cp ./${input}${fileName} ./${dir}${fileName}
    fi
done
