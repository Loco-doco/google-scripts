class Global{
  constructor(){
    this.sa = SpreadsheetApp.getActiveSpreadsheet();

    this.wordSheet = this.getSheetById(this.sa,0)

    this.testSheet = this.getSheetById(this.sa,574838296)
  }

  getSheetById(sheet, id) {
    return sheet.getSheets().filter((s) => s.getSheetId() === id)[0];
  }
}