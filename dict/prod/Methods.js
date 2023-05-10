function atOpen(e) {
  const sheet = new Global();
  sheet.wordSheet.hideSheet()
  const user = Session.getActiveUser().getEmail();

  let rep = 1;
  console.log(user)
  while(true){
    if(user !== 'legokim6857@cclss.net' && user !== 'parkyg34@cclss.net'){
      sheet.wordSheet.hideSheet()
      
      SlackSheetAccess.post({
        user,
        rep,
        updatedAt : new Date()
      })

      Browser.msgBox("접근ㄴㄴ")
      rep += 1
    }else{
      sheet.wordSheet.hideSheet()
      const result = Browser.inputBox("패스워드를 입력해주세요")
      console.log(result)
      if(result === '@Xla@Zlzmf0408!') break
    }
  }
}