function atOpen(e) {
  const sheet = new Global();
  sheet.wordSheet.hideSheet();
  const user = Session.getActiveUser().getEmail();

  let rep = 1;
  console.log(user);
  while (true) {
    if (user !== "legokim6857@cclss.net" && user !== "parkyg34@cclss.net") {
      sheet.wordSheet.hideSheet();

      SlackSheetAccess.post({
        user,
        rep,
        updatedAt: new Date(),
      });

      Browser.msgBox("접근ㄴㄴ");
      rep += 1;
    } else {
      break;
    }
  }

  SpreadsheetApp.getUi()
    .createMenu("Publish")
    .addItem("Publish", "copyToProd")
    .addToUi();
}

/**
 * Dev 환경의 스트링키를 Prod 환경으로 복제하기.
 */
function copyToProd() {
  const user = Session.getActiveUser().getEmail();
  const dev = new Global();
  const prod = new PublishedGlobal();

  // dev 스트링 키 복제
  const devStrings = dev.wordSheet.getRange("A:Z").getValues();
  console.log(`dev 단어 수 = ${devStrings.length}`);
  console.log(`dev 컬럼 수 = ${devStrings[0].length}`);

  // // prod 스트링 키 싹 밀기
  prod.p_wordSheet.getRange("A:Z").clearContent();

  // // 복제한 값 붙여넣기
  try {
    prod.p_wordSheet
      .getRange(1, 1, devStrings.length, devStrings[0].length)
      .setValues(devStrings);

    SlackDevPublished.post({
      user,
      updatedAt: new Date(),
    });
  } catch (e) {
    console.log(e);
  }
}
