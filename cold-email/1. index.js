/**
 * Mail 벌크 보내기 메인 함수
 */
function sendMailBulk(){
  const operator = Session.getActiveUser().getEmail();
  if(!isValidOperator(operator)){
    Browser.msgBox("썩 돌아가거라")
    return;
  }

  const ui = SpreadsheetApp.getUi();
  const global = new Global();
  const sheet = global.candidateSheet
  const param = {global, sheet}

  const [ingredients,raw] = getIngredientsAndRaw(param);
  
  const sureYouWantToSendEmail = isOkayToSend(ui)
  // const sureYouWantToSendEmail = true

  if(sureYouWantToSendEmail){
    const emailComponentInfos = getEmailComponentInfos(param, ingredients)
    sendEmail(emailComponentInfos)
  } else {
    return;
  }

  const sentRecords = createSentRecord(raw);
  
  afterWork(global,sentRecords)
}

/**
 * 
 * @returns 
 */
function sendMailBulkInAdvance(){
  const ui = SpreadsheetApp.getUi();
  const global = new Global();
  const sheet = global.candidateSheet
  const param = {global, sheet}
  
  const [ingredients,raw] = getIngredientsAndRaw(param);
  
  const [isTest, testEmail] = wannaCheckInAdvance(ui);
  let emailComponentInfos;

  if(isTest){
    emailComponentInfos = getEmailComponentInfos(param, ingredients, testEmail)
    sendEmail(emailComponentInfos)
  } else {
    return;
  }

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

function createSentRecord(records){
  const sentRecords = records.reduce((acc,record,i) => {
    const row = [];
    row.push(
      record[0], //idx
      record[1], //회사명
      record[2], //카테고리
      record[3], //카테고리 상세
      record[4], //Email
      new Date()
    )

    acc.push(row)
    return acc
  },[])

  return sentRecords
}

function isValidOperator(email){
  allowedEmails = [
    "legokim6857@cclss.net",
    "op@publ.biz",
    "obju@cclss.net",
    "ykpark@cclss.net",
    "contact@publ.biz"
  ]
  if(allowedEmails.includes(email)){
    return true
  } else {
    return false
  }
}