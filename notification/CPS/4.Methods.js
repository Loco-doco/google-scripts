// Custom 메뉴 구현
function onOpen(e) {
  const user = Session.getActiveUser().getEmail();
  console.log(user)
  try{
    SpreadsheetApp.getUi()
    .createMenu('이벤트 키 최신화')
    .addItem('Renewal', 'run')
    .addToUi();
  } catch(e) {
    console.log(e)
  }
}

function run() {
  const a = new EventKey();
  try{
    const keys = a.getEventKey()
    a.setEventKeyToCore(keys)
  } catch(e) {
    Browser.msgBox(e)
  }
  
}