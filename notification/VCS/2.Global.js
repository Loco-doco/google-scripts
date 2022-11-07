class Global extends CoreGlobal{
  constructor(){
    super()
    this.sa = SpreadsheetApp.getActiveSpreadsheet();
    this.currSheet = this.sa.getActiveSheet();
    
    this.mapSheet = this.getSheetById(this.sa, 1492987292);
    this.mapSheetName = this.mapSheet.getName();

    this.configSheet = this.getSheetById(this.sa, 364808352);
    this.configSheetName = this.configSheet.getName();

    this.keyCount = this.configSheet.getRange("G2").getValue();

  }
  /* 
  * 시트의 고유 아이디 (../gid=:gid) 로 시트 정보 가져오기.
  * 기존의 google script API 중 getSheetByName API가 충돌 이슈가 존재하여 본 커스텀 메소드로 대체함.
  */
  getSheetById(sheet, id) {
    return sheet.getSheets().filter((s) => s.getSheetId() === id)[0];
  }

  /*
  * 2D array에서 1D Array 를 indexOf 하는 Custom 함수
  */
  index_of_2d_array(array2d, targetVal) {
    const index = [].concat.apply([], ([].concat.apply([], array2d))).indexOf(targetVal);
                
    // 아이템 없을 시 false
    if (index === -1) { return false; }
    
    // row 길이 (array[0])
    const numColumns = array2d[0].length;

    const row = parseInt(index / numColumns);    
    const col = index % numColumns;
    
    return [row, col]; 
  } 
}
