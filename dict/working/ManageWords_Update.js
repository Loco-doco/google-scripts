class UpdateWord extends ManageWords{
  constructor(){
    super()
    this.ui = SpreadsheetApp.getUi();
  }

  update_published_words(){
    const [strKey, rowNum] = this.inquire_str_key();
    const [colNum, changeColNum, colName] = this.inquire_col_number();
    const newValue = this.inquire_new_value();
    const changeLog = [new Date(), this.userEmail]
    
    const oldValue = this.publish.p_wordSheet.getRange(rowNum,colNum).getValue()
    console.log(`old = ${oldValue}, new = ${newValue}`)

    this.publish.p_wordSheet.getRange(
      rowNum, colNum,
    ).setValue(newValue)

    this.publish.p_wordSheet.getRange(rowNum, changeColNum, 1, 2).setValues([changeLog])
    
    SlackUpdate.post({
      user: this.userEmail,
      strKey,
      colName,
      oldValue,
      newValue,
      updatedAt: new Date()
    })
  }

  // type_num이 1인 키를 4로 바꿈.
  update_type_num(){
    const [strKey,rowNum] = this.inquire_str_key();
    const colNum = 2
    const changeColNum = 5
    const colName = "type_num"
    const result = this.publish.p_wordSheet.getRange(
      rowNum, colNum
    ).getValue();
    if(result !== 1) throw new Error (`type_num이 1인 키만 변경할 수 있습니다.`)
    
    const oldValue = 1
    const newValue = 4
    const changeLog = [new Date(), this.userEmail]

    this.publish.p_wordSheet.getRange(
      rowNum, colNum
    ).setValue(newValue)

    this.publish.p_wordSheet.getRange(rowNum, changeColNum, 1, 2).setValues([changeLog])
    SlackUpdate.post({
      user: this.userEmail,
      strKey,
      colName,
      oldValue,
      newValue,
      updatedAt: new Date()
    })
  }

  //변경할 스트링 키 및 해당 키의 row 출력
  inquire_str_key(){
    const response = this.ui.prompt("변경하려는 스트링 키를 입력하세요.\n\n")
    const keyToFind = response.getResponseText()
    console.log(`keyToFind = ${keyToFind}`)
    if(!keyToFind) throw new Error(`입력 취소`)
    const rowNum = this.index_of_2d_array(this.publish.publishedKeyList,keyToFind)[0]+2
    if(!rowNum) throw new Error("해당 키를 찾을 수 없습니다.")
    
    return [keyToFind, rowNum]
  }

  // 변경할 컬럼 출력. [value 컬럼 넘버(ex : 3), 변경일 컬럼 넘버(ex : 5), 컬럼명(ex : value_kr)]
  inquire_col_number(){
    const colCodeEnum = {
      "1" : [this.publish.colObj.value_kr,this.publish.colObj.kr_updated_at,this.publish.colObj.value_kr_name],
      "2" : [this.publish.colObj.value_en,this.publish.colObj.en_updated_at,this.publish.colObj.value_en_name],
      "3" : [this.publish.colObj.value_jp,this.publish.colObj.jp_updated_at,this.publish.colObj.value_jp_name],
      "4" : [this.publish.colObj.value_es,this.publish.colObj.es_updated_at,this.publish.colObj.value_es_name],
      "5" : [this.publish.colObj.value_zh_ZH,this.publish.colObj.zh_ZH_updated_at,this.publish.colObj.value_zh_ZH_name],
      "6" : [this.publish.colObj.value_zh_TW,this.publish.colObj.zh_TW_updated_at,this.publish.colObj.value_zh_TW_name],
    }

    const response = this.ui.prompt(`
      변경하려는 데이터에 해당하는 숫자를 입력해주세요.

      1 : KR_value 
      2 : EN_value 
      3 : JP_value
      4 : ES_value
      5 : zh_ZH_value
      6 : zh_TW_value
      
    `)
    const colToUpdate = response.getResponseText();
    console.log(`colToUpdate=${colToUpdate}`)
    if(!colToUpdate) throw new Error(`입력 취소`)
    if(!Object.keys(colCodeEnum).includes(colToUpdate)) throw new Error("올바르지 않은 값입니다.")

    return colCodeEnum[colToUpdate]
  }

  inquire_new_value(){
    const response = this.ui.prompt("변경할 값을 입력해주세요.\n\n\
    1. 공백으로 시작하면 안됩니다.\n\
    2. 쌍따옴표 입력 시 반드시 백슬래시(\\)를 앞에 사용해야 합니다.\n\n")
    const newValue = response.getResponseText();
    console.log(`newValue=${newValue}`)
    if(!newValue) throw new Error(`입력 취소`)
    if(newValue === ' ') throw new Error('입력은 해주셔야죠')
    try{
      this.valid.check_value_valid_single(newValue)
    } catch(e){
      Browser.msgBox(e)
    }
    
    return newValue
  }

  inquire_new_type(){
    const newType = Browser.inputBox("변경할 타입을 선택해주세요.")
  }

}