class Global {
  constructor(){
    this.sa = SpreadsheetApp.getActiveSpreadsheet();
    this.currSheet = this.sa.getActiveSheet()

    this.calendarSheet = this.getSheetById(1227794305)
    this.calendarSheetName = this.calendarSheet.getName()

    this.todoSheet = this.getSheetById(2111659800)
    this.todoSheetName = this.todoSheet.getName()
    
    this.configSheet = this.getSheetById(0)
    this.configSheetName = this.configSheet.getName()

  }

  /* 
  * 시트의 고유 아이디 (../gid=:gid) 로 시트 정보 가져오기.
  * 기존의 google script API 중 getSheetByName API가 충돌 이슈가 존재하여 본 커스텀 메소드로 대체함.
  */
  getSheetById(id) {
    return this.sa.getSheets().filter((s) => s.getSheetId() === id)[0];
  }

}

