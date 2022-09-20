class CoreGlobal {
  constructor(){
    this.c_sa = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1wzfmLTZWXxG3ulILsox12LiH2kajf88eZ5jOqKNKXG0/edit?usp=sharing')
    
    this.c_targetSheet = this.getSheetById(this.c_sa,1043494698)
    this.c_targetSheetName = this.c_targetSheet.getName()
    
    this.c_configSheet = this.getSheetById(this.c_sa,1663189258);
    this.c_configSheetName = this.c_configSheet.getName();

    this.c_colCount = this.c_configSheet.getRange("B1").getValue();

  }
  /* 
  * 시트의 고유 아이디 (../gid=:gid) 로 시트 정보 가져오기.
  * 기존의 google script API 중 getSheetByName API가 충돌 이슈가 존재하여 본 커스텀 메소드로 대체함.
  */
  getSheetById(sheet, id) {
    return sheet.getSheets().filter((s) => s.getSheetId() === id)[0];
  }


}