
/*
ArtWolf

Slack interactive message in the Google Apps Script
Since the interactive message of Slack was realized in the Google Apps Script (GAS), notes for yourself.

Setting
GAS
Create a project file, published as a Web app → URL acquisition

Slack
Create an App from SlackAPI, the Interactive Components URL of, set the end point of the GAS

Google Apps Script
SendMessage()
With this function, you can send a message button and a list is attached to Slack. 
*/

//=================================

//sendMsgWithButton()

//=================================

function sendMsgWithButton() {
  //slack channel url (where to send the message)
  var slackUrl = "https://hooks.slack.com/services/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";
  //message text  
  var messageData = {
    "text": "Here's your interactive buttons message.",
    "attachments": [
      {
        "text": "Can you click the button?",
        "fallback": "Sorry, no support for buttons.",
        "callback_id": "ButtonResponse",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
          {
            "name": "button",
            "text": "OK",
            "style": "primary",
            "type": "button",
            "value": "ok"
          },
          {
            "name": "button",
            "text": "NO",
            "style": "danger",
            "type": "button",
            "value": "no"
          }
        ]
      },
      {
        "text":"Can you select one from the list?",
        "callback_id": "ptNotificationButtonResponse2",
        "color":"warning",
        "actions":[
          {
            "name": "select",
            "text": "Select test",
            "style": "primary",
            "type": "select",
            "options": [
              {
                text:"A",
                value:"a"
              },
              {
                text:"B",
                value:"b"
              },
              {
                text:"C",
                value:"c"
              }
            ]
          }
        ]
      }
    ]      
  }
  //format for Slack
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    //Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(messageData)
  };    

  //post to Slack
  UrlFetchApp.fetch(slackUrl, options);
}

//DoPost(e)
//Receive HTTP Post fly Pressing the Button, set to indicate the different reactions by choice.

function doPost(e) {
  //exploit JSON from payload
  //var data = contents.substr(8);//[payload={JSON}]
  var parameter=e.parameter;
  var data = parameter.payload;
  var json = JSON.parse(decodeURIComponent(data));
  //check answer
  //button
  if (json.actions[0].name == "button"){
    var text = "You clicked " + json.actions[0].value;
  //select
  } else if (json.actions[0].name == "select") {
    var text = "You selected " +  json.actions[0].selected_options[0].value;
  }
  //modify message
  var replyMessage = {
    "replace_original": true,
    "response_type": "in_channel",
    "text": "I see you clicked the button.\n" + text
  };

  return ContentService.createTextOutput(JSON.stringify(replyMessage)).setMimeType(ContentService.MimeType.JSON);     
}