/**
   * 보내야 될 타겟 데이터들 갖고 오기.
   * return
   * [
   *  {
   *    "email" : EMAIL,
   *    "data" : {
   *      "targetName" : TARGET_NAME,
   *      ....
   *      "hookText1" : HOOK_TEXT_1
   *    }
   *  },
   * ...
   * ]
   */
function getTargetDataAndRaw(param){
  const {global, sheet} = param;
  // idx, 타겟구분, 플랫폼, 카테고리, 채널명, email
  const raw = sheet.getRange(2,1,global.candidateCount-1,6).getValues();

  const targetData = raw.reduce((acc,val,i) => {
    const obj = {};
    obj["email"]=val[5] // email
    obj["data"] = {}
    obj["data"]["category"] = val[3] // 한글 => Enum 맵핑
    obj["data"]["platform"] = val[2]
    obj["data"]["type"] = val[1]
    obj["data"]["targetName"] = val[4] // 채널명
    obj["data"]["hookText1"] = `${val[4]}를 위한 멋진 멘트!!` // 후킹멘트
    acc.push(obj)
    return acc
  },[])

  return [targetData, raw]
}

/**
  * email 보내기 위한 구성요소 데이터들 갖고 오기.
  * to = "legokim6857@cclss.net";
  * subject = "Custom From Email Test";
  * body = "Hello, world!";
  * options.from = "obju@cclss.net";
  * options.htmlBody = getEmailHtml(data)
  */
function getEmailComponentInfos(param, targetData, testEmail){
  const {global, sheet} = param;
  /**
   * targetData = [
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
  const emailComponentInfos = targetData.reduce((acc,val,i) => {
    const obj = {};
    obj["to"] = testEmail
      ?testEmail
      :val.email
    obj["subject"] = `[publ]${val.data.targetName}님의 콘텐츠를 활용한 온라인 비즈니스 구축을 제안드립니다.`
    obj["body"] = ''
    obj["options"] = {};
    // obj["options"]["from"] = FROM // 추후 입력
    obj["options"]["htmlBody"] = getEmailHtml(val.data);
    obj["options"]["cc"] = testEmail
      ?''
      // :"legokim6857@cclss.net,obju@cclss.net,ykpark@cclss.net"
      :''

    acc.push(obj)
    return acc
  },[])

  return emailComponentInfos
}

function sendEmail(components) {
  components.map((component) => {
    const {to, subject, body, options} = component
    GmailApp.sendEmail(
      to,
      subject,
      body,
      options
    )
    console.log(`to=${to}에게 메일ㅈ ㅓㄴ송 완료`)
  })
}



