# !/bin/bash

# create an array with all the filer/dir inside ~/myDir

arr=(*/)

echo "pAM 이름을 입력해주세요 :"
read dirname

isExisted=false

for ((i = 0; i < ${#arr[@]}; i++)); do
  input="${dirname}/"
  targetDir="${arr[$i]}"
  if [[ "${targetDir}" == "${input}" ]]; then
    isExisted=true
    echo "이미 존재하는 pAM 입니다."
    exit
  fi
done

echo "스크립트 ID를 입력해주세요 :"
read scriptID

if test "${isExisted}"=false; then
  mkdir ${dirname}
fi

cd ${dirname}
clasp clone ${scriptID}

fileCount="$(ls -l | wc -l)"
if [ "${fileCount}" -eq 1 ]; then
  echo "clone 과정에서 문제가 발생했습니다"
  cd ..
  rm -rf ${dirname}
fi
