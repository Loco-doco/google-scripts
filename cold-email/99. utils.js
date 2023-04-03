// Custom 메뉴 구현
function onOpen(e) {
  const user = Session.getActiveUser().getEmail();
  console.log(user)
  // try{
    SpreadsheetApp.getUi()
    .createMenu('Test')
    .addItem('Sample', 'showHTMLCodeSample')
    .addItem(`Send Test`, `sendMailBulkInAdvance`)
    .addItem(`Send`, 'sendMailBulk')
    .addToUi();

  // } catch(e) {
  //   console.log(e)
  // }
}


function showHTMLCodeSample() {
  const data = {
    "targetName" : "9kiwoon",
    "hookText1" : "키클롭스에서 수행해주시는 모습을 보고"
  }
  const htmlTemplate = chooseMailTemplate("Economy", true);
  htmlTemplate.data = data
  var htmlOutput = htmlTemplate.evaluate();
  htmlOutput.setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle("Hello")
    .setWidth(1200)
    .setHeight(1000);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'My HTML Code')
}


function getEmailHtml(data){
  let htmlTemplate = chooseMailTemplate(data.category)
  htmlTemplate.data = data;
  const htmlBody = htmlTemplate.evaluate().getContent();
  return htmlBody
}

function chooseMailTemplate(category, isSample=false){
  const global = new Global();
  if(isSample) return HtmlService.createTemplateFromFile('51. TemplateSimple_Economy');
  switch(global.mapCategoryToEnum[category]){
    case "Economy":
      return HtmlService.createTemplateFromFile('51. TemplateSimple_Economy');
    default:
      break;
  }
}