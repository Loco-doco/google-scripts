// Custom 메뉴 구현
function onOpen(e) {
  const user = Session.getActiveUser().getEmail();
  console.log(user);
  try {
    SpreadsheetApp.getUi()
      .createMenu("단어 관리")
      .addItem("Preview", "do_preview")
      .addItem("Update", "do_update")
      // .addItem('Update Type', 'do_update_type_num')
      // .addItem(`Test`, 'test')
      .addToUi();

    SpreadsheetApp.getUi()
      .createMenu("Refresh")
      .addItem("Refresh", "published_words_interval_refresh")
      .addToUi();

    SpreadsheetApp.getUi()
      .createMenu("Publish")
      .addItem("Publish", "do_insert")
      .addToUi();
  } catch (e) {
    console.log(e);
  }
}
/**
 * insert 메인 함수
 */
function do_insert() {
  const user = Session.getActiveUser().getEmail();
  console.log(`${user}가 배포 시도`);

  const isAuthorized = isAuthorizedToPublish(user);
  if (!isAuthorized) return;

  const isIncludeProdPublish = is_include_prod_publish();
  const a = new BulkInsert();

  try {
    a.insert_procedure(isIncludeProdPublish)
  } catch (e) {
    console.log(e);
    Browser.msgBox(e);
    const e_message = e.replace(/\\n/g, "\n");
    SlackInsert.insert_failed_post({
      user,
      updatedAt: new Date(),
      e: e_message,
    });
  }
}

/**
 * insert - 스트링 키 배포 권한이 있는 사람인지 체크
 */
function isAuthorizedToPublish(user) {
  let isAuthorized;
  if (
    user !== "legokim6857@cclss.net" &&
    user !== "ykpark@cclss.net" &&
    user !== "hjin@cclss.net"
  ) {
    Browser.msgBox("접근ㄴㄴ");
    SlackInsert.unauthorized_user_post({
      user,
      updatedAt: new Date(),
    });
    isAuthorized = false;
  } else {
    isAuthorized = true;
  }

  return isAuthorized;
}


// preview 메인 함수
function do_preview() {
  const user = Session.getActiveUser().getEmail();
  console.log(`${user}가 Preview 진행`);
  const a = new Preview("dev");
  try {
    const targetWords = a.valid_procedure_for_preview(a.targetWords);
    a.insert_words_to_working_sheet(targetWords);
  } catch (e) {
    Browser.msgBox(e);
  }
}

/**
 * update 메인 함수
 */
function do_update() {
  const user = Session.getActiveUser().getEmail();
  const isIncludeProdPublish = is_include_prod_publish();
  try {
    const a = new UpdateWord();
    a.update_published_words(isIncludeProdPublish, user);
    const useRefresh = Browser.inputBox(
      `업데이트 완료.\\n
      마스터 시트를 최신화 하시겠습니까?\\n\\n
      1 : Yes / 0 : No`
    );
    if (useRefresh === "1") published_words_interval_refresh();
  } catch (e) {
    console.log(e);
    Browser.msgBox(e);
  }
}


// type 2, 3에 대한 바꾸기 함수
function change_key_format_ran_err(
  iteration,
  type,
  pattern,
  ranKeyCount,
  key,
  value
) {
  const [initLine, prefix] = type === 2 ? [4, "str_"] : [8, "str_err_"];
  if (key) {
    const ranNumPart = key.substring(initLine, key.length);
    if (ranNumPart.match(pattern)[0].length !== ranNumPart.length)
      throw new Error(
        `난수 키 중 잘못된 값이 존재합니다. \\n\\n<해당 스트링> \\n row: ${
          iteration + 2
        } \\n key : ${key} \\n value : ${value}`
      );
    if (ranNumPart.match(pattern)[0].length === ranNumPart.length) {
      key = key;
    } else {
      ranKeyCount += 1;
      key = prefix + ranKeyCount;
    }
  } else {
    ranKeyCount += 1;
    key = prefix + ranKeyCount;
  }

  return [ranKeyCount, key];
}

/**
 * 공용 - 스트링 키 배포 / 수정 시 prod까지 포함할 것인지 여부를 묻기
 */
function is_include_prod_publish() {
  const isIncludeProdPublish = Browser.inputBox(
    `Prod 환경까지 업데이트 하시겠습니까?\\n\\n
      1 : Yes(Dev && Prod) / 0 : No(Dev만)`
  );
  return isIncludeProdPublish === "1" ? true : false;
}
