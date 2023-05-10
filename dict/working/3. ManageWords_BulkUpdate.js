class BulkUpdateWord extends ManageWords {
  constructor() {
    super();
  }

  /**
   *  입력한 str_key에 해당하는 모든 value들 갖고오는 메인 함수
   *
   */
  set_target_words_values() {
    const targetKeys = this.get_target_keys();
    const values = this.set_values(targetKeys);
  }

  /**
   * 업데이트 할 키들 갖고 오기
   */
  get_target_keys() {}

  /**
   * 갖고온 키 들의 value값들 반환
   * from Publish 시트
   */
  set_values() {}

  /**
   * ---------------------------------------------------
   */

  /**
   * 수정 완료된 키, values들 바꾸는 메인 함수
   */
  update_values() {}

  /**
   * 수정 완료된 키들 갖고 오기.
   */
  get_target_words() {}

  /**
   * 입력된 value들 valid
   */
  valid_words() {}

  /**
   * 업데이트 할 위치들 반환 (publish)
   */
  get_location_to_update_words() {}

  /**
   * 반환된 위치에 한 땀 한 땀 집어넣어버리기
   */
  set_updated_values() {}
}
