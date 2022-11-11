class PartialSetting extends Translate {
  constructor(){
    super()
    this.publish = new PublishedGlobal();
  }

  // 어느 Partial인지 물어보고, 시트 정보 저장
  get_partial_sheet_info(){
    const sheetEnum = {
      "1" : {
        "sheet" : this.partial1Sheet, 
        "sheetName" : this.partial1SheetName, 
        "rowColInfo" : this.sheetRowColInfo.Partial1
        },
      "2" : {
        "sheet" : this.partial2Sheet, 
        "sheetName" : this.partial2SheetName, 
        "rowColInfo" : this.sheetRowColInfo.Partial2
        },
      "3" : {
        "sheet" : this.partial3Sheet, 
        "sheetName" : this.partial3SheetName, 
        "rowColInfo" : this.sheetRowColInfo.Partial3
        },
    }

    const response = this.ui.prompt(
      `
      세팅할 시트를 선택해주세요.

      1 : Partial1
      2 : Partial2
      3 : Partial3
      
      `
    )
    const sheet = response.getResponseText();
    if(!sheet) throw new Error(`입력 취소`)
    if(!Object.keys(sheetEnum).includes(sheet)) throw new Error ("올바르지 않은 값입니다.")

    return sheetEnum[sheet]
  }

  // 번역하기로 지정한 녀석들 뿌려준다.
  set_target_info(targetSheet){
    const useRefresh = Browser.inputBox(
      `번역 대상 키에 대한 정보 세팅에 앞서,\\n
      마스터 시트를 최신화한 후 진행하시겠습니까?\\n\\n
      1 : Yes / 0 : No`
    )
    if(useRefresh === "1") published_words_interval_refresh()

    const { sheet, sheetName, rowColInfo } = targetSheet;
    const selectedKeys = this.get_prev_selected_keys(sheet, rowColInfo)
    const targetKeys = this.publish.publishedKeyList
    console.log(`selectedKeys = ${selectedKeys}`)

    // selectedKeys가 targetKeys에서 몇번 row인지 저장하고
    const targetRows = selectedKeys.reduce((acc,val)=>{
      console.log(`val=${val}`)
      const [row, col] = Global.index_of_2d_array(targetKeys,val[0])
      acc.push(row+2)
      return acc
    },[])

    
    // 검색 대상 col들 뽑아오고
    const targetCols = {
      "key" : this.publish.colObj.key,
      "value": this.publish.colObj.value_kr,
      "memo": this.publish.colObj.memo,
      "prev": this.publish.colObj.value_jp
    }

    // row, col으로 value들을 저장하고
    const targetValues = targetRows.reduce((acc,val)=>{
      acc.push([
        this.wordsRepSheet.getRange(val,targetCols.key).getValue(),
        this.wordsRepSheet.getRange(val,targetCols.value).getValue(),
        this.wordsRepSheet.getRange(val,targetCols.memo).getValue(),
        this.wordsRepSheet.getRange(val,targetCols.prev).getValue(),
      ])
      return acc
    },[])

    // 이미 입력된 것들 지워주고
    sheet.getRange(rowColInfo.targetInfoRange).clearContent();
    // 뿌려준다.
    if(targetValues[0]) {
      sheet.getRange(rowColInfo.targetInfoStartRow, rowColInfo.targetInfoStartCol,targetValues.length,targetValues[0].length).setValues(targetValues)
    }
  }

}
