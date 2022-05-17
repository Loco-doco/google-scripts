// Custom 메뉴 구현
function onOpen(e) {
  SpreadsheetApp.getUi()
  .createMenu('갖고와버리기')
  .addItem('JS(React, React-Native)', 'get_words_js')
  .addItem('Swift(iOS Native)', 'get_words_ios')
  .addItem('JAVA(Android Native)', 'get_words_aos')
  .addToUi();

  SpreadsheetApp.getUi()
  .createMenu('Refresh')
  .addItem('Refresh','published_words_interval_refresh')
  .addToUi();

}

// JS 갖고오기
function get_words_js(){
  published_words_interval_refresh()
  const a = new PublishKeys();
  a.insert_words_to_published_sheet("JS");
}

// AOS 갖고오기
function get_words_aos(){
  Browser.msgBox("준비중입니다.")
}

// IOS 갖고오기
function get_words_ios(){
  Browser.msgBox("준비중입니다.")
}

function test(){
  const global = new Global();
  const data = global.configSheet.getRange("C3:C4").getValues();
  console.log(data)
}