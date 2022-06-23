/**
 * 엑셀의 각 Cell에서 스크립트에서 커스텀한 함수를 호출하여 동작하는 형태로 쓰이는게 아닌, 
 * 각 Cell의 호출 없이 스크립트가 직접 엑셀을 건드릴 때 쓰기 위함.
 */


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

