class Slack{
  constructor(){
    this.options = {
      "method" : "post",
      "contentType" : "application/json",
      "muteHttpExceptions" : true,
      "payload" : ""
    }
  }

  post_message(webhook, payload){
    try{
      this.options.payload = JSON.stringify(payload)
      UrlFetchApp.fetch(webhook,this.options)
    } catch(e) {
      console.log(e)
    }
  }

}

class SlackUpdate extends Slack{
  constructor(payload){
    super()
    this.webhook = "https://hooks.slack.com/services/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"
    this.post(payload)
  }
  
  post(payload){
    console.log("진짜 post emfdjdha")
    this.post_message(this.webhook, payload)
  }

  static create_payload(ingredients){
    const { user, strKey, colName, oldValue, newValue, updatedAt } = ingredients
    updatedAt.setHours(updatedAt.getHours()+9)
    return{
      "text" : `스트링 키 *Update 발생*`,
      "blocks": [
        {
          "type" : "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*Update 알림*`
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*User* : ${user} \n*Key* : ${strKey}(${colName})\n*From* : ${oldValue} \n*To* ${newValue}\n*updatedAt* : ${updatedAt.toISOString()}`
          }
        }
      ]
    }
  }

  static post(ingredients){
    console.log("Slack Post 들어옴")
    const payload = this.create_payload(ingredients)
    console.log(`payload = ${payload}`)
    return new SlackUpdate(payload)
  }
}

class SlackInsert extends Slack{
  constructor(payload){
    super()
    this.webhook = "https://hooks.slack.com/services/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"
    this.post(payload)
  }
  
  post(payload){
    this.post_message(this.webhook, payload)
  }

  static create_unauthorized_user_payload(ingredients){
    const {user, updatedAt} = ingredients
    updatedAt.setHours(updatedAt.getHours()+9)
    return{
      "text" : `Warning!! 권한 없는 자의 배포 시도!!`,
      "blocks":[
        {
          "type" : "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*:경고:권한 없는 자의 배포 시도(Warning):경고:*`
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `허용되지 않은 사용자 ${user} 가\n단어 배포를 시도하였습니다!!.@channel \n(${updatedAt.toISOString()})`
          }
        }
      ]
    }
  }

  static create_payload(ingredients){
    const { user, updatedAt } = ingredients
    updatedAt.setHours(updatedAt.getHours()+9)
    return{
      "text" : `스트링 키가 *배포*되었습니다. `,
      "blocks": [
        {
          "type" : "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*Publish 알림*`
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `${user} 가 입력된 단어를 배포하였습니다. \n(${updatedAt.toISOString()})`
          }
        }
      ]
    }
  }

  static create_insert_failed_payload(ingredients){
    const { user, updatedAt, e } = ingredients
    updatedAt.setHours(updatedAt.getHours()+9)
    return{
      "text" : `배포 실패ㅠㅠ `,
      "blocks": [
        {
          "type" : "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*배포 실패 알림*`
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `${user} 가 입력된 단어의 배포에 실패하였습니다. \n실패 사유 : ${e} \n (${updatedAt.toISOString()})`
          }
        }
      ]
    }
  }

  static test_post(){
    const payload = {
      "text": "Hi",
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "This is a header block",
            "emoji": true
          }
        }
      ]
    }

    return new SlackInsert(payload)
  }

  static unauthorized_user_post(ingredients){
    const payload = this.create_unauthorized_user_payload(ingredients)
    return new SlackInsert(payload)
  }

  static insert_failed_post(ingredients){
    const payload = this.create_insert_failed_payload(ingredients)
    return new SlackInsert(payload)
  }

  static post(ingredients){
    const payload = this.create_payload(ingredients)
    return new SlackInsert(payload)
  }
}


function test(){
  SlackInsert.test_post()
}
