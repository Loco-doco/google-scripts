/**
 * 보내야 될 타겟 데이터들 갖고오기
 * 
 * @param {object} param global, 전송 대상 시트 정보 객체
 * @returns 
 * [
 *  {
 *    "email" 발송할 이메일 주소
 *    "data" 이메일 html 구성에 필요한 변수 객체
 *  }
 * ]
 */
function getIngredientsAndRaw(param){
  const {global, sheet} = param;
  // idx, 타겟구분, 플랫폼, 카테고리, 채널명, email
  const raw = sheet.getRange(2,1,global.candidateCount,7).getValues();

  const ingredients = raw.reduce((acc,val,i) => {
    const obj = {};
    obj["email"]=val[4] // email
    // obj["email"]="legokim6857@cclss.net" // email
    obj["data"] = {}
    obj["data"]["companyName"] = val[1]
    obj["data"]["category"] = val[2]
    obj["data"]["categoryDetail"] = val[3]
    obj["data"]["callCount"] = val[5]
    obj["data"]["feat"] = {}
    obj["data"]["feat"]["targetName"] = val[6]
    acc.push(obj)
    return acc
  },[])

  return [ingredients, raw]
}

 /**
  * 이메일 발송을 위한 세부 데이터 갖고 오기
  * 
  * @param {object} param global, 전송 대상 시트 정보 객체
  * @param {object} ingredients 이메일 html 구성에 필요한 변수 객체
  * @param {string} testEmail 테스트 대상 메일 주소
  * @returns 이메일 발송에 필요한 객체 
  * [
  *  {to, subject, body, options:{htmlBody, cc}},
  *  ...
  * ]
  */
function getEmailComponentInfos(param, ingredients, testEmail){
  const {global, sheet} = param;
  
  const emailComponentInfos = ingredients.reduce((acc,val,i) => {
    const obj = {};
    obj["to"] = testEmail
      ?testEmail
      :val.email
    obj["subject"] = `[publ] ${val.data.companyName}의 콘텐츠를 활용한 온라인 비즈니스 구축을 제안드립니다.`
    obj["body"] = ''
    obj["options"] = {};
    // obj["options"]["from"] = FROM // 추후 입력
    obj["options"]["htmlBody"] = getEmailHtml(val.data);
    obj["options"]["charset"] = 'UTF-8';
    obj["options"]["cc"] = testEmail
      ?''
      // :"legokim6857@cclss.net,obju@cclss.net,ykpark@cclss.net"
      :'legokim6857@cclss.net,obju@cclss.net'

    acc.push(obj)
    return acc
  },[])

  return emailComponentInfos
}

function sendEmail(components) {
  components.map((component) => {
    const {to, subject, body, options} = component
    console.log(`options=${JSON.stringify(options)}`)
    GmailApp.sendEmail(
      to,
      subject,
      body,
      options
    )
    console.log(`to=${to}에게 메일ㅈ ㅓㄴ송 완료`)
  })
}



