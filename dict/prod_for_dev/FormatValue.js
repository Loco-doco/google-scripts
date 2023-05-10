class FormatValue {
  constructor(){
    /*
    * 변수 입력 방법
    * iOS = %s 
    * AOS = %1$s, %2$s, ...
    */

    this.patternJSVar = /{{[a-zA-Z0-9]*}}/g


    this.patternSingleQuotes = /([^\\]')/g
  }
}

class FormatValueJS extends FormatValue{
  constructor(){
    super()
  }

  change_format(keyList, valueList){

    const formattedValues = valueList.reduce((acc,val,i) => {

      val = val.reduce((acc2,string) => {
        string = string.replace(/"/g,'\\"')  // 일단 쌍따옴표 앞에 다 백 슬래쉬 넣는다.
        string = string.replace(/(\\)\1{1,}/g,'\\') // 백슬래시 여러개 들어간 녀석들 다 하나로 바꾼다.
        string = string.replace(//g,'') // 이상한 공백문자를 없앤다.
        string.endsWith(" ") // 마지막 공백 없애기
          ? string = string.slice(0,string.length-1)
          : string = string 
        string.endsWith("\n")
          ? string = string.slice(0,string.length-1)
          : string = string
        string = "\""+keyList[i][0]+"\" : \""+string+"\"," // "str_key" : "hello_world" 형태로 처리
        acc2.push(string)
        return acc2
      },[])

      acc.push(val)
      return acc
    },[])

    return formattedValues

  }

}


class FormatValueAOS extends FormatValue{
  constructor(){
    super()
  }
  change_format(keyList, valueList){
    // AOS 형태에 맞게 Validation 하고 Format 해주는 마법의 함수
  }
}

class FormatValueIOS extends FormatValue{
  constructor(){
    super()
  }
  change_format(keyList, valueList){
    // iOS 형태에 맞게 Validation 하고 Format 해주는 마법의 함수
  }
}

