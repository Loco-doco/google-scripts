class PublishKeys extends Global{
  constructor(){
    super()
    this.formatJS = new FormatValueJS();
  }

  /*
  * 언어에 맞게 validation & Format 한다.
  */
  procedure_valid_format(language){
    switch(language){
      case "JS" :
        const formatJS = new FormatValueJS();
        return formatJS.change_format(this.keyList, this.valueList)
      case "AOS" :
        break;
      case "IOS" :
        break;
      default:
        break;
    }
  }
  
  /*
  * 스프레드에 뿌려주기
  */
  insert_words_to_published_sheet(language){
    console.log("넣는다")
    const words = this.procedure_valid_format(language)
    words.splice(0,0,["KR","EN","JP","ES","zh-ZH","zh-TW","TL"])
    this.clear_word_sheet()
    this.wordSheet.getRange(
      1,1,
      words.length, words[0].length
    ).setValues(words)
  }
  
  /*
  * 한번 싹 지우기
  */
  clear_word_sheet(){
    this.wordSheet.getRange("A:Z").clearContent()
  }
}