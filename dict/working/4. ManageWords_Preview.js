class Preview extends BulkInsertion {
  constructor(env) {
    super();
    switch (env) {
      case "prod":
        this.env = this.publish;
        break;
      case "dev":
        this.env = this.dev;
        break;
      default:
        break;
    }
  }

  /*
   * 유효성 검사 Procedures - for Preview
   */
  valid_procedure_for_preview(targetWords) {
    let words;

    this.valid.checkForOmittedWords(targetWords); // 빠진 부분 있니
    [words, this.ranKeyCount] = this.valid.formatKeys(
      targetWords,
      this.ranKeyCount,
      "PREVIEW"
    ); // key들 알맞게 바꿔주자
    this.valid.checkForDuplicateKeys(words, this.env.publishedKeyList); // 중복된 거 있니

    words.reduce((acc, val) => {
      this.valid.checkWordValidity(val);
    }, "");
    this.configSheet.getRange("B4").setValue(this.ranKeyCount);

    return words;
  }

  insert_words_to_working_sheet(targetWords) {
    console.log(targetWords);
    const keyList = targetWords.reduce((acc, val) => {
      acc.push([val[0]]);
      return acc;
    }, []);
    console.log(keyList.length);

    this.workingSheet.getRange(2, 1, keyList.length, 1).setValues(keyList);
  }
}
