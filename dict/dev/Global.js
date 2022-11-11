class Global {
  constructor(){
    this.sa = SpreadsheetApp.getActiveSpreadsheet();
    this.currSheet = this.sa.getActiveSheet();
    
    this.configSheet = this.getSheetById(this.sa, 650065758)
    this.configSheetName = this.configSheet.getName();

    this.wordSheet = this.getSheetById(this.sa, 774924636);
    this.wordSheetName = this.wordSheet.getName();

    this.wordsRepSheet = this.getSheetById(this.sa,637194365)

    this.prepSheet = this.getSheetById(this.sa, 1881773469)
    this.prepSheetName = this.prepSheet.getName();

    this.testSheet = this.getSheetById(this.sa,1086554271)

    this.userEmail = Session.getActiveUser().getEmail();
    this.wordCount = this.configSheet.getRange("B1").getValue();
  }
  /* 
  * 시트의 고유 아이디 (../gid=:gid) 로 시트 정보 가져오기.
  * 기존의 google script API 중 getSheetByName API가 충돌 이슈가 존재하여 본 커스텀 메소드로 대체함.
  */
  getSheetById(sheet, id) {
    return sheet.getSheets().filter((s) => s.getSheetId() === id)[0];
  }

  get keyList(){
    return this.prepSheet.getRange(2,1,this.wordCount,1).getValues();
  }
  
  // [KR, EN, JP, ES, ZH, TW, TL]
  // 언어 추가시 확인!!
  get valueList(){
    return this.prepSheet.getRange(2,2,this.wordCount,7).getValues();
  }
  
}

