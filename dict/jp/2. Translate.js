class Translate extends Global {
  constructor(){
    super()
    this.valid = new Validation();
    this.ui = SpreadsheetApp.getUi();
  }

  // 시트별 startRow, startCol, rowRange, colRange 
  get sheetRowColInfo(){
    return{
      // "Working":{
      //   "type" : "WORKING",
      //   "startRow" : 4,
      //   "startCol" : 1,
      //   "rowRange" : this.configSheet.getRange("B1").getValue(),
      //   "colRange" : 5,
      //   "valueRange" : "E4:E"
      // },
      "Terms":{
        "type" : "TERM",
        "startRow" : 2,
        "startCol" : 1,
        "rowRange" : this.configSheet.getRange("B5").getValue(),
        "colRange" : 5,
        "valueRange" : "E2:E"
      },
      "Partial1":{
        "type" : "PARTIAL_1",
        "startRow" : 2,
        "selectedKeyStartRow" : 2,
        "startCol" : 3,
        "selectedKeyStartCol" : 1,
        "rowRange" : this.configSheet.getRange("B2").getValue(),
        "selectedKeyRowRange": this.configSheet.getRange("D2").getValue(),
        "colRange" : 5,
        "valueRange" : "G2:G",
        "targetInfoRange": "C2:F",
        "targetInfoStartRow": 2,
        "targetInfoStartCol": 3,
      },
      "Partial2":{
        "type" : "PARTIAL_2",
        "startRow" : 2,
        "selectedKeyStartRow" : 2,
        "startCol" : 3,
        "selectedKeyStartCol" : 1,
        "rowRange" : this.configSheet.getRange("B3").getValue(),
        "selectedKeyRowRange": this.configSheet.getRange("D3").getValue(),
        "colRange" : 5,
        "valueRange" : "G2:G",
        "targetInfoRange": "C2:F",
        "targetInfoStartRow": 2,
        "targetInfoStartCol": 3,
      },
      "Partial3":{
        "type" : "PARTIAL_3",
        "startRow" : 2,
        "selectedKeyStartRow" : 2,
        "startCol" : 3,
        "selectedKeyStartCol" : 1,
        "rowRange" : this.configSheet.getRange("B4").getValue(),
        "selectedKeyRowRange": this.configSheet.getRange("D4").getValue(),
        "colRange" : 5,
        "valueRange" : "G2:G",
        "targetInfoRange": "C2:F",
        "targetInfoStartRow": 2,
        "targetInfoStartCol": 3,
      },
    }
  }
  
  // 시트 정보 대화상자로 물어보고 갖고 오기
  get_sheet_info(){

    const sheetEnum = {
      // "0" : {
      //   "sheet" : this.workingSheet, 
      //   "sheetName" : this.workingSheetName, 
      //   "rowColInfo" : this.sheetRowColInfo.Working
      //   },
      "4" : {
        "sheet" : this.termSheet, 
        "sheetName" : this.termSheetName,
        "rowColInfo" : this.sheetRowColInfo.Terms
        },
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
      배포할 시트를 선택해주세요.

      1 : Partial1
      2 : Partial2
      3 : Partial3
      4 : Terms
      
      `
    )
    const sheet = response.getResponseText();
    if(!sheet) throw new Error(`입력 취소`)
    if(!Object.keys(sheetEnum).includes(sheet)) throw new Error ("올바르지 않은 값입니다.")

    return sheetEnum[sheet]
  }

  // working, term publishing transaction
  do_publish(targetSheet){
    const user = Session.getActiveUser().getEmail();
    const targetWords = this.get_target_words(targetSheet);
    this.push_words_to_published_sheet(targetWords)

    switch(targetSheet.rowColInfo.type){
      // case this.sheetRowColInfo.Working.type: 
      //   this.working_term_transaction(targetSheet.sheet, targetSheet.rowColInfo)
      //   break;
      
      case this.sheetRowColInfo.Terms.type: 
        this.working_term_transaction(targetSheet.sheet, targetSheet.rowColInfo)
        break;

      case this.sheetRowColInfo.Partial1.type:
        this.working_partial_transaction(targetSheet,targetSheet.sheet,targetSheet.rowColInfo,targetWords)
        break;

      case this.sheetRowColInfo.Partial2.type:
        this.working_partial_transaction(targetSheet,targetSheet.sheet,targetSheet.rowColInfo,targetWords)
        break;

      case this.sheetRowColInfo.Partial3.type :
        this.working_partial_transaction(targetSheet,targetSheet.sheet,targetSheet.rowColInfo,targetWords)
        break;
        
      default:
        console.log("Noooo")
        break;
    }

    SlackTranslate.post({
      user,
      sheet : targetSheet.sheetName,
      updatedAt :  new Date()
    })
  }

  // 집어넣을 단어 전체 갖고 오기
  get_prev_values(sheet, rowColInfo){
    return sheet.getRange(
      rowColInfo.startRow, rowColInfo.startCol,
      rowColInfo.rowRange, rowColInfo.colRange
    ).getValues()
  }


  // 집어넣을 단어 중 입력된 것 갖고 오기
  get_target_words(targetSheet){
    const {sheet, sheetName, rowColInfo} = targetSheet
    const prevValues = this.get_prev_values(sheet, rowColInfo)
    
    const result = prevValues.filter((v) => v[4])
    result.reduce((acc,val) => {
      this.valid.check_value_valid(val)
    },"")
    return result
  }

  // Published 시트에 넣어버리기
  push_words_to_published_sheet(targetWords){
    const publish = new PublishedGlobal();
    
    let insertIdx;
    const insertRowArr = targetWords.reduce((acc,val) => {
      insertIdx = Global.index_of_2d_array(publish.publishedKeyList, val[0])[0]+1
      acc.push(insertIdx)
      return acc
    },[])

    if(insertRowArr.length === 0) throw new Error (`배포할 단어가 존재하지 않습니다.`)
    
    const datetime = new Date()

    insertRowArr.reduce((acc,val,i) => {
      publish.p_wordSheet.getRange(
        val+1,publish.p_col_lan_value,
        1,3
      ).setValues(
        [[targetWords[i][4], datetime, this.userEmail]]
      )

    },"");
  }


  //working, term 배포 후 처리 작업 목록
  working_term_transaction(sheet, rowColInfo){
    this.clear_translated_value(sheet, rowColInfo)
    const useRefresh = Browser.inputBox(
      `배포가 완료되었습니다.\\n
      마스터 시트를 최신화 하시겠습니까?\\n\\n
      1 : Yes / 0 : No`
    )
    if(useRefresh === "1") published_words_interval_refresh()
  }

  //partial 배포 후 처리 작업 목록
  working_partial_transaction(targetSheet,sheet,rowColInfo,targetWords){
    const partial = new PartialSetting()
    this.clear_translated_value(sheet, rowColInfo)
    this.reset_selected_keys(targetSheet, targetWords)
    partial.set_target_info(targetSheet)
  }

  // 번역한 거 지우기
  clear_translated_value(sheet, rowColInfo){
    sheet.getRange(rowColInfo.valueRange).clearContent()
  }

  // Partial의 경우, 드롭다운 키 리셋하기
  reset_selected_keys(targetSheet, targetWords){
    const {sheet, sheetName, rowColInfo} = targetSheet
    const prevSelectedKeys = this.get_prev_selected_keys(sheet, rowColInfo)
    const resetValues = this.get_remain_dropdown_keys(prevSelectedKeys, targetWords)
    sheet.getRange("A2:A").clearContent();
    console.log(resetValues)
    if(resetValues[0]) sheet.getRange(rowColInfo.selectedKeyStartRow,rowColInfo.selectedKeyStartCol,resetValues.length,1).setValues(resetValues)
  }

  get_prev_selected_keys(sheet, rowColInfo){
    const keyList = sheet.getRange(
      rowColInfo.selectedKeyStartRow, rowColInfo.selectedKeyStartCol,
      rowColInfo.selectedKeyRowRange, 1
    ).getValues()

    const result = keyList.filter((v)=> {
      if(v[0]) return v
    })

    return result
  }

  get_remain_dropdown_keys(prevSelectedKeys, targetWords){

    const resetValues = prevSelectedKeys.reduce((acc,val) => {
      if(!Global.exists(targetWords,val[0])) acc.push([val[0]])
      return acc
    }, [])

    return resetValues
  }

}
