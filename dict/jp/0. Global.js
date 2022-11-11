class Global {
  constructor(){
    this.sa = SpreadsheetApp.getActiveSpreadsheet();
    this.currSheet = this.sa.getActiveSheet();
    
    this.configSheet = this.getSheetById(this.sa, 1261299434)
    this.configSheetName = this.configSheet.getName();

    this.workingSheet = this.getSheetById(this.sa, 1132103684);
    this.workingSheetName = this.workingSheet.getName();

    this.wordsRepSheet = this.getSheetById(this.sa, 0)
    this.wordsRepSheetName = this.wordsRepSheet.getName();

    this.termSheet = this.getSheetById(this.sa, 1954245865)
    this.termSheetName = this.termSheet.getName();
    this.termSheetDataCount = this.configSheet.getRange("B5").getValue()
    
    this.partial1Sheet = this.getSheetById(this.sa, 364716152)
    this.partial1SheetName = this.partial1Sheet.getName();
    this.partial1SheetDataCount = this.configSheet.getRange("B2").getValue()
    
    this.partial2Sheet = this.getSheetById(this.sa, 60010320)
    this.partial2SheetName = this.partial2Sheet.getName();
    this.partial2SheetDataCount = this.configSheet.getRange("B3").getValue()

    this.partial3Sheet = this.getSheetById(this.sa, 1953887280)
    this.partial3SheetName = this.partial3Sheet.getName();
    this.partial3SheetDataCount = this.configSheet.getRange("B4").getValue()

    this.userEmail = Session.getActiveUser().getEmail();
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
  static index_of_2d_array(array2d, targetVal) {
    
    const index = [].concat.apply([], ([].concat.apply([], array2d))).indexOf(targetVal);
    console.log(`targetVal = ${targetVal}, index = ${index}`)            
    // 아이템 없을 시 false
    if (index === -1) { 
      throw new Error(`
      다음 스트링이 존재하지 않습니다.\\n
      ${targetVal}
      `)
    }
    
    // row 길이 (array[0])
    const numColumns = array2d[0].length;
    const row = parseInt(index / numColumns);    
    const col = index % numColumns;
    
    return [row, col]; 
  } 

  /*
  * 2D array에서 특정 값이 있는지를 확인하는 Custom 함수. 
  */
  static exists(arr, search) {
    return arr.some(row => row.includes(search));
  }
}