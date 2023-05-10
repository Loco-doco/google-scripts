class BulkInsert extends ManageWords{
  constructor(env){
    super()
    switch(env){
      case "prod" : 
        this.env = this.publish;
        break;
      case "dev" : 
        this.env = this.dev;
        break;
      default :
        break;
    }
  }

  /*
  * Input 대상 값들 갖고오기.
  */
  get targetWords(){
      const wordsCnt = this.configSheet.getRange("D2").getValue()
      if(!wordsCnt) throw new Error("값을 입력하세요.")
      return this.workingSheet.getRange(2,1,wordsCnt,5).getValues();
  }

  /*
  * 유효성 검사 Procedures
  */
  valid_procedure(targetWords){
      let words;

      this.valid.check_omitted_words(targetWords); // 빠진 부분 있니
      [words, this.ranKeyCount] = this.valid.change_key_format(targetWords, this.ranKeyCount,"PUBLISH") // key들 알맞게 바꿔주자
      this.valid.check_duplicated_keys(words, this.env.publishedKeyList) // 중복된 거 있니
     
      words.reduce((acc,val) => {
        this.valid.check_value_valid(val)
      },"")
      console.log(words)
      this.configSheet.getRange("B4").setValue(this.ranKeyCount);
      
      return words
  }

  /*
  * published 시트에 insert
  * 날짜 입력.
  * 최초 작성자 입력.
  */
  insert_words_to_published_sheet(targetWords){
    const datetime = new Date()
    const userEmail = this.userEmail
    targetWords = targetWords.reduce((acc,val) => {
      acc.push([
        val[0],val[1],val[2],val[4],datetime,userEmail,
        val[3],datetime,userEmail
      ])
      return acc
    },[])


    this.env.wordSheet.getRange(
      this.env.wordCount+1,1,
      targetWords.length,9
    ).setValues(targetWords)

    SlackInsert.post({
      user : userEmail,
      updatedAt : datetime
    })
  }

  /*
  * Working 시트 클리어
  */
  clear_working_sheet(){
    this.workingSheet.getRange("A2:E").clearContent()
  }

}