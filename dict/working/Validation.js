class Validation {
  constructor(){
    this.patternStartWithBlank = /^ /g
    this.patternDoubleQuotes = /([^\\]")|^"/g
    this.patternRanKey = /^[0-9]*/g
  }

  /*
  * 빈 셀이 있는지 검증
  */
  check_omitted_words(words){
    words.reduce((acc,val,i) => {
      if(!val[0] && (val[1] === 1 || val[1] ===4)) throw new Error (`키 값이 없는 단어가 존재합니다. \\n\\n<해당 스트링> \\n row : ${i+2} \\n value : ${val[2]}`)
      if(!val[1]) throw new Error (`type_num을 입력해주세요 \\n\\n<해당 스트링> \\n row: ${i+2} \\n key : ${val[0]} \\n value : ${val[2]}`)
      if(!val[2]) throw new Error (`국문은 필수 입력 사항입니다. \\n\\n<해당 스트링> \\n row: ${i+2} \\n key : ${val[0]} \\n value: ${val[2]}`)
      if(!val[3]) throw new Error (`영문은 필수 입력 사항입니다. \\n\\n<해당 스트링> \\n row: ${i+2} \\n key : ${val[0]} \\n value: ${val[2]}`)
    },[])

  }

  /*
  * 키 값 알맞게 변환
  * type_num : 1 => str_ 을 앞에 붙인다.
  * type_num : 2 => str_{{senCount}} && config.senCount 업데이트
  * type_num : 3 => str_err_을 앞에 붙인다.
  & type_num : 4 => str_을 앞에 붙인다.
  * lowerCase
  * 빈 값 => 언더스코어
  */
  change_key_format(words, ranKeyCount, type='PREVIEW'){
    const result = words.reduce((acc,val,i) => {
      switch(val[1]){
        case 1:
          if(val[0].substring(0,4) !== "str_") val[0] = "str_"+val[0]
          val[0] = val[0].replace(/ /g,"_")
          val[0] = val[0].toLowerCase(val[0])
          acc.push(val)
          break;

        /*
        * 만약 값이 있다면?
        * => 그 값이 str_숫자 형태라면 : 그냥 넘어감
        * => 그 값이 str_숫자 형태가 아니라면 : str_난수 형태로 만들기 
        * 만약 값이 없다면?
        * => str_난수 형태로 만들기
        */
        case 2:
          [ranKeyCount, val[0]] = change_key_format_ran_err(i,2,this.patternRanKey,ranKeyCount,val[0],val[2])
          acc.push(val)
          break;

        case 3:
          [ranKeyCount, val[0]] = change_key_format_ran_err(i,3,this.patternRanKey,ranKeyCount,val[0],val[2])
          acc.push(val)
          break;

        case 4:
          if(val[0].substring(0,4) !== "str_") val[0] = "str_"+val[0]
          val[0] = val[0].replace(/ /g,"_")
          val[0] = val[0].toLowerCase(val[0])
          acc.push(val)
          break;

        default:
          break;
      }
    return acc
    },[])

    return [result, ranKeyCount]
  }

  /*
  * 중복된 키 검증
  * 1. 입력한 것 내에서 검증
  * 2. 이미 있는 키 중에서 검증
  */
  check_duplicated_keys(words, publishedWords){
    // input 대상 key만 추출
    const keyList = words.reduce((acc,val) => {
      if(val[1] === 1) acc.push(val[0])
      return acc
    },[])


    // 입력한 것들 내에서 검증
    keyList.some((val) => {
      if(keyList.indexOf(val) !== keyList.lastIndexOf(val)) throw new Error (`입력할 키 들 사이에 중복된 키 값이 존재합니다. \\n\\n<해당 스트링> \\n key : ${val}`)
    })

    // publish 된 단어와의 중복 검증
    words.reduce((acc, val1, i) => {
      publishedWords.some((val2) => {
        if(val2.includes(val1[0])) throw new Error (`이미 publish 된 키랑 중복된 키 값이 존재합니다. \\n\\n<해당 스트링> \\n row: ${i+2} \\n key: ${val1[0]}`)
      })
    },[])
  }

  /*
  * 내용 텍스트(String)의 이상 부분 감지 후 얼럿
  * @param : val (array)
  */
  check_value_valid(val){
      if(String(val[2]).match(this.patternStartWithBlank) || String(val[3]).match(this.patternStartWithBlank)) throw new Error (`빈 공백으로 시작하는 문자열이 존재합니다. \\n\\n<해당 스트링> \\n key : ${val[0]} \\n value : ${val[2]}`)
      if(String(val[2]).match(this.patternDoubleQuotes) || String(val[3]).match(this.patternDoubleQuotes)) throw new Error(`쌍 따옴표 앞에는 반드시 백 슬래시를 넣어주세요. \\n\\n<해당 스트링> \\n key : ${val[0]} \\n value : ${val[2]}`)
      if(val[2].endsWith("\n") || val[3].endsWith("\n")) throw new Error(`개행 처리(엔터)로 끝나는 단어가 존재합니다. 마지막 엔터 처리를 지워주세요 \\n\\n <해당 스트링> \\n key : ${val[0]} \\n value : ${val[2]}`)
  }

  /*
  * 내용 텍스트(String)의 이상 부분 감지 후 얼럿
  * @param : val (Single)
  */
  check_value_valid_single(val){
      if(String(val).match(this.patternStartWithBlank)) throw new Error (`빈 공백으로 시작하는 문자열이 존재합니다.`)
      if(String(val).match(this.patternDoubleQuotes)) throw new Error(`쌍 따옴표 앞에는 반드시 백 슬래시를 넣어주세요.`)
      if(val.endsWith("\n")) throw new Error(`개행 처리(엔터)로 끝나는 단어가 존재합니다. 마지막 엔터 처리를 지워주세요`)
  }
}



