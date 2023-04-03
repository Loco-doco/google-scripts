function sendMailBulk(){
  // const ui = SpreadsheetApp.getUi();
  const global = new Global();
  const sheet = global.emailSendSheet
  const param = {global, sheet}

  /**
   * 보내야 될 타겟 데이터들 갖고 오기.
   * getTargetData return
   * [
   *  {
   *    "email" : EMAIL,
   *    "data" : {
   *      "category" : CATEGORY
   *      "targetName" : TARGET_NAME,
   *      "hookText1" : HOOK_TEXT_1
   *    }
   *  },
   * ...
   * ]
   */
  const [targetData,raw] = getTargetDataAndRaw(param);
  /**
  * getEmailComponentInfos return
  * [
  *  {to, subject, body, options : {from, htmlBody}}
  * ]
  * email 보내기 위한 데이터들 갖고 오기.
  * to = "legokim6857@cclss.net";
  * subject = "Custom From Email Test";
  * body = "Hello, world!";
  * options.from = "obju@cclss.net";
  * options.htmlBody = getEmailHtml(data)
  */
  // const sureYouWantToSendEmail = isOkayToSend(ui)

  // if(sureYouWantToSendEmail){
  //   const emailComponentInfos = getEmailComponentInfos(param, targetData)
  //   sendEmail(emailComponentInfos)
  // } else {
  //   return;
  // }
  afterWork(global,sentRecord)
}

function sendMailBulkInAdvance(){
  const ui = SpreadsheetApp.getUi();
  const global = new Global();
  const sheet = global.emailSendSheet
  const param = {global, sheet}

  /**
   * 보내야 될 타겟 데이터들 갖고 오기.
   * getTargetData return
   * [
   *  {
   *    "email" : EMAIL,
   *    "data" : {
   *      "category" : CATEGORY
   *      "targetName" : TARGET_NAME,
   *      "hookText1" : HOOK_TEXT_1
   *    }
   *  },
   * ...
   * ]
   */
  const targetData = getTargetData(param);
  /**
  * getEmailComponentInfos return
  * [
  *  {to, subject, body, options : {from, htmlBody}}
  * ]
  * email 보내기 위한 데이터들 갖고 오기.
  * to = "legokim6857@cclss.net";
  * subject = "Custom From Email Test";
  * body = "Hello, world!";
  * options.from = "obju@cclss.net";
  * options.htmlBody = getEmailHtml(data)
  */
  const [isTest, testEmail] = wannaCheckInAdvance(ui);
  let emailComponentInfos;

  if(isTest){
    emailComponentInfos = getEmailComponentInfos(param, targetData, testEmail)
    sendEmail(emailComponentInfos)
  } else {
    return;
  }

  afterwork(global,)
}


function wannaCheckInAdvance(ui){
  const result = ui.prompt(
    'Check',
    '사전에 나에게 먼저 메일을 보내시겠습니까?\n이메일 주소를 작성해주세요.',
    ui.ButtonSet.YES_NO
  )

  const button = result.getSelectedButton();
  const text = result.getResponseText();
  
  switch (button){
    case ui.Button.YES:
      return [true, text];
    case ui.Button.NO:
      return [false, text]
  }
}

function isOkayToSend(ui){
  const button = ui.alert(`주의!!`,`이 행위는 되돌릴 수 없습니다.\n정말 보내시겠습니까? 신중히 선택하세요`, ui.ButtonSet.YES_NO)

  switch (button){
    case ui.Button.YES:
      return true
    case ui.Button.No:
      return false
  }
}

