class UpdateWord extends ManageWords {
  constructor() {
    super();
    this.ui = SpreadsheetApp.getUi();
  }

  updatePublishedWords(isIncludeProdPublish, user) {
    const key = this.inquireStrKey();
    const col = this.inquireColNumber();
    const newValue = this.inquireNewValue();

    this.updateWords(key, col, newValue, this.dev, user, "Dev");

    if (isIncludeProdPublish) {
      this.updateWords(key, col, newValue, this.publish, user, "Prod");
    }
  }

  /**
   * 환경별로 업데이트 조지는 함수
   */
  updateWords(key, col, newValue, env, user, envDisplayName) {
    const [strKey, rowNum] = this.getKeyRowInfo(key, env);
    const [colNum, changeColNum, colName] = this.getColInfo(col, env);
    const oldValue = env.wordSheet.getRange(rowNum, colNum).getValue();

    this.updateCell(env, rowNum, colNum, newValue);
    this.updateChangeLog(env, rowNum, changeColNum, [new Date(), user]);

    SlackUpdate.post({
      user,
      strKey,
      colName,
      oldValue,
      newValue,
      env: envDisplayName,
      updatedAt: new Date(),
    });
  }

  updateCell(env, rowNum, colNum, newValue) {
    env.wordSheet.getRange(rowNum, colNum).setValue(newValue);
  }

  updateChangeLog(env, rowNum, changeColNum, changeLog) {
    env.wordSheet.getRange(rowNum, changeColNum, 1, 2).setValues([changeLog]);
  }

  /**
   * 변경할 스트링 키 받기
   */
  inquireStrKey() {
    const response = this.ui.prompt("변경하려는 스트링 키를 입력하세요.\n\n");
    const keyToFind = response.getResponseText();
    if (!keyToFind) throw new Error(`입력 취소`);
    return keyToFind;
  }

  /**
   * 받은 스트링 키로 해당 키의 rowNum 찾기
   */
  getKeyRowInfo(key, env) {
    const rowNum = this.index_of_2d_array(env.publishedKeyList, key)[0] + 2;
    if (!rowNum) throw new Error("해당 키를 찾을 수 없습니다.");

    return [key, rowNum];
  }

  /**
   * 변경할 컬럼 받기 [value 컬럼 넘버(ex : 3), 변경일 컬럼 넘버(ex : 5), 컬럼명(ex : value_kr)]
   */
  inquireColNumber() {
    const response = this.ui.prompt(`
      변경하려는 데이터에 해당하는 숫자를 입력해주세요.

      1 : KR_value 
      2 : EN_value 
      3 : JP_value
      4 : ES_value
      5 : zh_ZH_value
      6 : zh_TW_value
      
    `);
    const colToUpdate = response.getResponseText();
    if (!colToUpdate) throw new Error(`입력 취소`);

    return colToUpdate;
  }

  getColInfo(col, env) {
    const colCodeEnum = {
      1: [
        env.colObj.value_kr,
        env.colObj.kr_updated_at,
        env.colObj.value_kr_name,
      ],
      2: [
        env.colObj.value_en,
        env.colObj.en_updated_at,
        env.colObj.value_en_name,
      ],
      3: [
        env.colObj.value_jp,
        env.colObj.jp_updated_at,
        env.colObj.value_jp_name,
      ],
      4: [
        env.colObj.value_es,
        env.colObj.es_updated_at,
        env.colObj.value_es_name,
      ],
      5: [
        env.colObj.value_zh_ZH,
        env.colObj.zh_ZH_updated_at,
        env.colObj.value_zh_ZH_name,
      ],
      6: [
        env.colObj.value_zh_TW,
        env.colObj.zh_TW_updated_at,
        env.colObj.value_zh_TW_name,
      ],
    };

    if (!Object.keys(colCodeEnum).includes(col))
      throw new Error("올바르지 않은 값입니다.");
    return colCodeEnum[col];
  }

  inquireNewValue() {
    const response = this.ui.prompt(
      "변경할 값을 입력해주세요.\n\n\
    1. 공백으로 시작하면 안됩니다.\n\
    2. 쌍따옴표 입력 시 반드시 백슬래시(\\)를 앞에 사용해야 합니다.\n\n"
    );
    const newValue = response.getResponseText();
    if (!newValue) throw new Error(`입력 취소`);
    if (newValue === " ") throw new Error("입력은 해주셔야죠");
    try {
      this.valid.check_value_valid_single(newValue);
    } catch (e) {
      Browser.msgBox(e);
    }

    return newValue;
  }

  // // type_num이 1인 키를 4로 바꿈.
  // update_type_num(){
  //   const [strKey,rowNum] = this.inquire_str_key();
  //   const colNum = 2
  //   const changeColNum = 5
  //   const colName = "type_num"
  //   const result = this.env.wordSheet.getRange(
  //     rowNum, colNum
  //   ).getValue();
  //   if(result !== 1) throw new Error (`type_num이 1인 키만 변경할 수 있습니다.`)

  //   const oldValue = 1
  //   const newValue = 4
  //   const changeLog = [new Date(), this.userEmail]

  //   this.env.wordSheet.getRange(
  //     rowNum, colNum
  //   ).setValue(newValue)

  //   this.env.wordSheet.getRange(rowNum, changeColNum, 1, 2).setValues([changeLog])
  //   SlackUpdate.post({
  //     user: this.userEmail,
  //     strKey,
  //     colName,
  //     oldValue,
  //     newValue,
  //     updatedAt: new Date()
  //   })
  // }
}
