class Validation {
  constructor(){
    this.patternStartWithBlank = /^ /g
    this.patternDoubleQuotes = /([^\\]")|^"/g
  }

  /*
  * 내용 텍스트(String)의 이상 부분 감지 후 얼럿
  * @param : val (array)
  */
  check_value_valid(val){
      if(String(val[4]).match(this.patternStartWithBlank)) throw new Error (`빈 공백으로 시작하는 문자열이 존재합니다. \\n\\n<해당 스트링> \\n key : ${val[0]} \\n value : ${val[4]}`)
      if(String(val[4]).match(this.patternDoubleQuotes)) throw new Error(`쌍 따옴표 앞에는 반드시 백 슬래시를 넣어주세요. \\n\\n<해당 스트링> \\n key : ${val[0]} \\n value : ${val[4]}`)
      if(val[4].endsWith("\n")) throw new Error(`개행 처리(엔터)로 끝나는 단어가 존재합니다. 마지막 엔터 처리를 지워주세요 \\n\\n <해당 스트링> \\n key : ${val[0]} \\n value : ${val[4]}`)
  }

  /*
  * 내용 텍스트(String)의 이상 부분 감지 후 얼럿
  * @param : val (Single)
  */
  check_value_valid_single(val){
      if(String(val).match(this.patternStartWithBlank)) throw new Error (`빈 공백으로 시작하는 문자열이 존재합니다.`)
      if(String(val).match(this.patternDoubleQuotes)) throw new Error(`쌍 따옴표 앞에는 반드시 백 슬래시를 넣어주세요.`)
  }
}