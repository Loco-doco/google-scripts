class BulkInsert extends ManageWords {
  constructor(env) {
    super();
  }

  /*
   * Input 대상 값들 갖고오기.
   */
  get targetWords() {
    const wordsCnt = this.configSheet.getRange("D2").getValue();
    if (!wordsCnt) throw new Error("값을 입력하세요.");
    return this.workingSheet.getRange(2, 1, wordsCnt, 5).getValues();
  }

  /**
   * Bulk Insert 메인 작동 함수
   */
  insert_procedure(isIncludeProdPublish) {
    const devTargetWords = this.valid_procedure(this.targetWords, this.dev);
    this.insert(devTargetWords, this.dev, "Dev");
    if (isIncludeProdPublish) {
      const prodTargetWords = this.valid_procedure(this.targetWords, this.publish);
      this.insert(prodTargetWords, this.publish, "Prod");
    }
    this.clear_working_sheet();
  }

  /*
   * 유효성 검사 Procedures
   */
  valid_procedure(targetWords, env) {
    let words;

    this.valid.check_omitted_words(targetWords); // 빠진 부분 있니
    [words, this.ranKeyCount] = this.valid.change_key_format(
      targetWords,
      this.ranKeyCount,
      "PUBLISH"
    ); // key들 알맞게 바꿔주자
    this.valid.check_duplicated_keys(words, env.publishedKeyList); // 중복된 거 있니

    words.reduce((acc, val) => {
      this.valid.check_value_valid(val);
    }, "");
    
    this.configSheet.getRange("B4").setValue(this.ranKeyCount);

    return words;
  }

  /**
   * 최종 insert 함수
   * @param {*} targetWords 단어들
   * @param {*} env 환경
   */
  insert(targetWords, env, envDisplayName) {
    const datetime = new Date();
    const userEmail = this.userEmail;
    targetWords = targetWords.reduce((acc, val) => {
      acc.push([
        val[0],
        val[1],
        val[2],
        val[4],
        datetime,
        userEmail,
        val[3],
        datetime,
        userEmail,
      ]);
      return acc;
    }, []);

    env.wordSheet
      .getRange(env.wordCount + 1, 1, targetWords.length, 9)
      .setValues(targetWords);

    SlackInsert.post({
      user: userEmail,
      env : envDisplayName,
      updatedAt: datetime,
    });
  }

  /*
   * Working 시트 클리어
   */
  clear_working_sheet() {
    this.workingSheet.getRange("A2:E").clearContent();
  }
}
