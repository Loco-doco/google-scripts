#!/bin/bash

# Use this script when ...
# 특정 pApp의 스크립트 코드를 변경하였고,
# 그 변경된 파일을 다른 pApp에도 복제하고 싶을 때.


arr=(*/)


echo "수정한 폴더를 입력해주세요 :"
read fixedDir

echo "복사할 파일을 입력해주세요."
read targetFileName

# 디렉토리 순회하면서 알맞은 파일을 찾는다.
for ((i = 0; i < ${#arr[@]}; i++)); do
  # 수정한 폴더명
  input="${fixedDir}/"
  # 순회하면서 마주하는 다른 폴더명
  targetDir="${arr[$i]}"
  
  if [[ "${targetDir}" == "${input}" ]]; then
    echo "일치 - pass"
  else
    # 순회하면서 마주한 폴더가 수정한 폴더랑 다를 경우 (= 변경해야 하는 폴더인 경우)
    cp ./${input}${targetFileName} ./${targetDir}${targetFileName}
  fi
done

