class DevPublishedGlobal {
  constructor(){
    this.sa = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/19htI--DAUe8y-2j3ECmU0IQwc8Nr4mXjgZv9vzaxGTY/edit?usp=sharing')
    
    this.configSheet = this.getSheetById(this.sa,491417517)
    this.configSheetName = this.configSheet.getName()
    
    this.wordSheet = this.getSheetById(this.sa,0)
    this.wordSheetName = this.configSheet.getName()

    this.wordCount = this.configSheet.getRange("A2").getValue();

    this.protection = this.wordSheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);

  }
  /* 
  * 시트의 고유 아이디 (../gid=:gid) 로 시트 정보 가져오기.
  * 기존의 google script API 중 getSheetByName API가 충돌 이슈가 존재하여 본 커스텀 메소드로 대체함.
  */
  getSheetById(sheet, id) {
    return sheet.getSheets().filter((s) => s.getSheetId() === id)[0];
  }

  get publishedKeyList(){
    return this.wordSheet.getRange(2,1,this.wordCount-1,1).getValues();
  }

  get colObj(){
    return {
      "key" : 1,
      "value_kr_name" : "KR",
      "value_kr" : 3,
      "kr_updated_at" : 5,
      "kr_editor" : 6,
      "value_en_name" : "EN",
      "value_en" : 7,
      "en_updated_at" : 8,
      "en_editor" : 9,
      "value_jp_name" : "JP",
      "value_jp" : 10,
      "jp_updated_at" : 11,
      "jp_editor" : 12,
      "value_es_name" : "ES",
      "value_es" : 13,
      "es_updated_at" : 14,
      "es_editor" : 15,
      "value_zh_ZH_name" : "zh-ZH",
      "value_zh_ZH" : 16,
      "zh_ZH_updated_at" : 17,
      "zh_ZH_editor" : 18,
      "value_zh_TW_name" : "zh-TW",
      "value_zh_TW" : 19,
      "zh_TW_updated_at" : 20,
      "zh_TW_editor" : 21,
    }
  }

}
