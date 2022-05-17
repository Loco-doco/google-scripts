/*
* Script ID : 19-VU6HaS-amABiGJTyQZIln8O4GLvrMap0Wu6TJG6FeEELejdmxQOufa
*/

function do_alert_morning(){
  const date = new Date();
  const day = date.getDay();
  const hrs = date.getHours();
  const min = date.getMinutes();
  SlackPreAlert.post({date, day, hrs, min, type: "아침 배포"})
}

function do_alert_afternoon(){
  const date = new Date();
  const day = date.getDay();
  const hrs = date.getHours();
  const min = date.getMinutes();
  SlackPreAlert.post({date, day, hrs, min, type: "점심 배포"})
}

function do_alert_evening(){
  const date = new Date();
  const day = date.getDay();
  const hrs = date.getHours();
  const min = date.getMinutes();
  SlackPreAlert.post({date, day, hrs, min, type: "저녁 배포"})
}


function setTrigger(){
  console.log(`${new Date()}에 트리거 실행 되었따잉?`)
  const currDate = new Date();
  switch(currDate.getDay()){
    case 6:
      console.log(`토요일이라 트리거 설정 안함 ㅋ`)
      break;
    case 0 :
      console.log(`일요일이라 트리거 설정 안함 ㅋ`)
      break;
    default : 
      set_publish_alert("do_alert_morning", 10, 30, true);
      set_publish_alert("do_alert_afternoon", 14, 00, true);
      set_publish_alert("do_alert_evening", 19, 00, true);
      break;
  }
}



function set_publish_alert(functionName, hour, minute, isToday = true) {
  const today = new Date();
  const nextDay = new Date();
  nextDay.setDate(today.getDate()+1)
  const targetYear = isToday? today.getFullYear() : nextDay.getFullYear();
  const targetMonth = isToday? today.getMonth() : nextDay.getMonth();
  const targetDate = isToday? today.getDate() : nextDay.getDate();
  const targetHour = hour
  const targetMinute = minute
  const pars = [targetYear, targetMonth, targetDate, targetHour, targetMinute]
  const targetDay = new Date(...pars)

  deleteTriggers(functionName);  
  scheduleTrigger(today, targetDay, functionName);

}

function scheduleTrigger(today, targetDay, functionName){
  const hours_remain = Math.abs(targetDay - today) / 36e5
  ScriptApp.newTrigger(functionName)
    .timeBased()
    .after(hours_remain * 60 * 60 * 1000)
    .create()
  // console.log("scheduled")
}


function deleteTriggers(functionName) {
  
  const triggers = ScriptApp.getProjectTriggers();
  if(triggers){
    triggers.reduce((acc,trigger,i) => {
      if(trigger.getHandlerFunction() === functionName) ScriptApp.deleteTrigger(trigger)
    },"")
  }
}
