function htmlTest(){
  var template = HtmlService.createTemplateFromFile('502. Simple_ColdEmail');
  template.foo = 'Hello World!';
  console.log("yes")
  console.log(template.evaluate().getContent())
}



// Custom 메뉴 구현
function onOpen(e) {
  const user = Session.getActiveUser().getEmail();
  console.log(user)
    SpreadsheetApp.getUi()
    .createMenu('Control Panel')
    .addItem(`테스트해보기`, `sendMailBulkInAdvance`)
    .addItem(`날려버리기`, 'sendMailBulk')
    .addToUi();
}


function showHTMLCodeSample() {
  const data = {
    "targetName" : "9kiwoon",
    "hookText1" : "키클롭스에서 수행해주시는 모습을 보고"
  }
  const htmlTemplate = chooseMailTemplate("Economy", true);
  htmlTemplate.data = data
  console.log(`htmlTemplate = ${htmlTemplate}`)
  var htmlOutput = htmlTemplate.evaluate();
  htmlOutput.setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle("Hello")
    .setWidth(1200)
    .setHeight(1000);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'My HTML Code')
}

/**
 * html 생성
 * 
 * @param {object} data html 구성을 위한 변수 객체
 * @returns 
 */
function getEmailHtml(data){
  let htmlTemplate = chooseMailTemplate(data.category);
  htmlTemplate.data = data;
  const htmlBody = htmlTemplate.evaluate().getContent();
  return htmlBody;
}

/**
 * 
 * @param {object} category 메일 템플릿 카테고리 작성
 * @param {boolean} isSample 샘플인지 여부 판별
 * @returns 
 */
function chooseMailTemplate(category, isSample=false){
  let htmlBody;
  // const global = new Global();
  // if(isSample) return HtmlService.createTemplateFromFile('52. Simple_ColdEmail');
  // switch(global.mapCategoryToEnum(category)){
  //   // case "Economy":
  //   // htmlBody = HtmlService.createTemplateFromFile('51. TemplateSimple_Economy');
  //   default :
  //     htmlBody = HtmlService.createTemplateFromFile('52. Simple_ColdEmail');
  //     break;
  // }
  htmlBody = HtmlService.createTemplateFromFile('502. Simple_ColdEmail');

  return htmlBody
}