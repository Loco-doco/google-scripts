class Global {
  constructor(){
    this.sa = SpreadsheetApp.getActiveSpreadsheet();
    this.configSheet = this.getSheetById(this.sa, 598031230)
    
    this.userConsoleSheet = this.getSheetById(this.sa, 1584717489)

    this.userCashAccountSheet = this.getSheetById(this.sa, 1404105084)
    this.uCASheetLastRow = this.configSheet.getRange("B1").getValue();
    this.uCASheetLastCol = 6

    this.publCashAccountSheet = this.getSheetById(this.sa, 457988028)
    this.pCASheetLastRow = this.configSheet.getRange("B2").getValue();
    this.pCASheetLastCol = 5

    this.cashHistorySheet = this.getSheetById(this.sa,1865252717)
    this.cHSheetLastRow = this.configSheet.getRange("B3").getValue();
    this.cHSheetLastCol = 7

    this.cashProductSheet = this.getSheetById(this.sa,1838267057)
    this.cPSheetLastRow = this.configSheet.getRange("B4").getValue();
    this.cPSheetLastCol = 6

    this.userEmail = Session.getActiveUser().getEmail();
  }
  /**
  * 시트의 고유 아이디 (../gid=:gid) 로 시트 정보 가져오기.
  * 기존의 google script API 중 getSheetByName API가 충돌 이슈가 존재하여 본 커스텀 메소드로 대체함.
  */
  getSheetById(sheet, id) {
    return sheet.getSheets().filter((s) => s.getSheetId() === id)[0];
  }

  /**
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

  /**
  * array2d에서, 특정 col의 값이 targetValue인 row의
  * rowNumber랑 row 정보 산출
  */
  find_row_number_info(array2d, col, targetValue) {
    let rowNumber;
    const targetRow = array2d.reduce((acc, val, i) => {
      if(val[col-1] === targetValue){
        rowNumber = i
        acc = val
      }
      return acc
    },[])
    if(!rowNumber) console.log(`찾기 실패`)

    return [rowNumber? rowNumber+1:false, targetRow]
  } 


  /**
  * array2d에서, 특정 col의 값이 targetValue인, 동시에 특정 col2의 값이 targetValue2인 row의
  * rowNumber랑 row 정보 산출
  */
  find_row_number_info_by_double_values(array2d, col, targetValue, col2, targetValue2) {
    let rowNumber;
    const targetRow = array2d.reduce((acc, val, i) => {
      if(val[col-1] === targetValue && val[col2-1] === targetValue2){
        rowNumber = i
        acc = val
      }
      return acc
    },[])
    if(!rowNumber) console.log(`찾기 실패`)

    return [rowNumber? rowNumber+1:false, targetRow]
  } 

  /**
  * sheet, startRow, startCol, rowRange, colRange
  */
  get_sheet_values(ingredients){
    const { sheet, startRow, startCol, rowRange, colRange } = ingredients;
    return sheet.getRange(startRow,startCol,rowRange,colRange).getValues();
  }


  /**
   *  sheet, startRow, startCol, rowRange, colRange, values
   */
  set_row_bulk(ingredients){
    const { sheet, startRow, startCol, rowRange, colRange, values} = ingredients
    sheet.getRange(startRow,startCol,rowRange,colRange).setValues(values)
  }

  /*
  * distinct_id 생성 함수
  * input : prefix
  * output : distinct_id
  */
  create_distinct_id(prefix){
    return `${prefix}-${Math.random().toString(36).substr(2,11)}`
  }

  /*
  * channel_name 생성 함수
  */
  create_channel_name(prefix){
    return `${prefix}-${Math.random().toString(24).substr(2,7)}`
  }
}