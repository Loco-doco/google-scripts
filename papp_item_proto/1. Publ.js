class Publ extends Global{
  constructor(publ_distinct_id){
    super()
    this.publ_distinct_id = publ_distinct_id
    ? publ_distinct_id
    : this.create_distinct_id('PUBL')
  }

  static get_distinct_id(){
    const publ = new Publ();
    return publ.publ_distinct_id
  }

  /**
   * 캐시 발행 트랜잭션
   */ 
  static issue_cash_transaction(userId,channelId,cash_product_id,issuedAmount, history){
    const publ = new Publ();

    // 캐시 발행 히스토리 정보 생성
    const cashIssueHistoryRow = history.get_history_row_to_create({
      relChannelId : channelId,
      relUser : userId,
      targetProductId : cash_product_id,
      action : "캐시 충전",
      amount : issuedAmount
    })
    
    // 캐시 히스토리 업데이트 rowRange, colRange, values
    history.create_history({
      rowRange : cashIssueHistoryRow.length,
      colRange : cashIssueHistoryRow[0].length,
      values : cashIssueHistoryRow
    })

    // 업데이트할 row랑 정보 확인. 
    const [rowNumber, rowInfo] = publ.get_publ_account_info_by_channel_id(channelId) 

    const updateRow = publ.get_publ_row_to_update(rowInfo, "캐시 충전", issuedAmount)
    publ.set_row_bulk({
      sheet : publ.publCashAccountSheet,
      startRow : rowNumber,
      startCol : 1,
      rowRange : updateRow.length,
      colRange : updateRow[0].length,
      values : updateRow
    })
  }

  /**
  * 새로 생성한 publ account 정보를 row 형태로 반환
  * input : nickname, balance
  * output : row(2darray)
  */
  get_publ_row_to_create(channelId, issuedAmount){
    return [
      [
        this.publ_distinct_id,
        channelId,
        issuedAmount,
        new Date(),
        new Date()
      ]
    ]
  }

  /**
  * publ 구좌 정보 update
  * type : 발행 || 유통 || 회수
  */
  get_publ_row_to_update(rowInfo, type, amount){
    switch(type){
      case "캐시 충전":
        rowInfo[2] = rowInfo[2] + amount
        rowInfo[4] = new Date();
        break;
      case "아이템 구매" : 
        rowInfo[2] = rowInfo[2] - amount
        rowInfo[4] = new Date();
        break;
      default : 
        break;
    }
    return [rowInfo]
  }

  get_publ_account_info_by_channel_id(channelId){
    const targetValue = this.get_sheet_values({
      sheet : this.publCashAccountSheet,
      startRow : 1,
      startCol : 1,
      rowRange : this.pCASheetLastRow,
      colRange : this.pCASheetLastCol
    })

    return this.find_row_number_info(targetValue, 2, channelId)
  }
  


}


