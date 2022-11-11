// Custom 메뉴 구현
function atOpen(e) {
  const user = Session.getActiveUser().getEmail();
  console.log(`${user}님이 접근함`)
  SpreadsheetApp.getUi()
  .createMenu('Publish')
  .addItem('Publish', 'do_publish')
  .addItem("Partial Setting",'do_set_partial_info')
  .addToUi();

  SpreadsheetApp.getUi()
  .createMenu('Refresh')
  .addItem('Refresh','published_words_interval_refresh')
  .addToUi();
}


function do_publish(){
  try{
    const a = new Translate();
    const targetSheet = a.get_sheet_info()
    a.do_publish(targetSheet)
  } catch(e) {
    console.log(e)
    Browser.msgBox(e)
  }
}

function do_set_partial_info(){
  try{
    const a = new PartialSetting();

    const targetSheet = a.get_partial_sheet_info()
    
    a.set_target_info(targetSheet)
  } catch(e) {
    console.log(e)
    Browser.msgBox(e)
  }
  
}