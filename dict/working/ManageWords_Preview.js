class Preview extends BulkInsert{
  constructor(){
    super();
  }

  /*
  * 유효성 검사 Procedures - for Preview
  */
  valid_procedure_for_preview(targetWords){
      let words;

      this.valid.check_omitted_words(targetWords); // 빠진 부분 있니
      [words, this.ranKeyCount] = this.valid.change_key_format(targetWords, this.ranKeyCount,"PREVIEW") // key들 알맞게 바꿔주자
      this.valid.check_duplicated_keys(words, this.publish.publishedKeyList) // 중복된 거 있니


      words.reduce((acc,val) => {
        this.valid.check_value_valid(val)
      },"")
      this.configSheet.getRange("B4").setValue(this.ranKeyCount);

      return words
  }

  insert_words_to_working_sheet(targetWords){
    console.log(targetWords)
    const keyList = targetWords.reduce((acc,val) => {
      acc.push([val[0]])
      return acc
    },[])
    console.log(keyList.length)

    this.workingSheet.getRange(2,1,keyList.length,1).setValues(keyList)
  }

}