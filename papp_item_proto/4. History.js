class History extends Global{
  constructor(){
    super()

    this.historyLastRow = this.cHSheetLastRow
  }

  /**
   * 히스토리 정보 생성
   *  relChannelId, relUser, targetProductId, action, amount
   */ 
  get_history_row_to_create(ingredients){
    const { relChannelId, relUser, targetProductId, action, amount } = ingredients
    return [[
      relChannelId,
      relUser,
      targetProductId,
      action,
      amount,
      new Date(),
      new Date()
    ]]
  }

  // rowRange, colRange, values
  create_history(ingredients){
    const {rowRange, colRange, values} = ingredients
    this.cashHistorySheet.getRange(this.historyLastRow + 1, 1, rowRange, colRange).setValues(values)
    this.historyLastRow += 1
  }
}