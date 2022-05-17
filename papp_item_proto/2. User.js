class User extends Publ{
  constructor(user_distinct_id,channel_distinct_id){
    super()
    
    this.user_distinct_id = user_distinct_id
    ? user_distinct_id
    : this.create_distinct_id('U')

    this.channel_distinct_id = channel_distinct_id
    ? channel_distinct_id
    : Channel.get_distinct_id()
    
  }

  // random한 distinct_id 생성
  static get_distinct_id(){
    const user = new User();
    return user.user_distinct_id
  }

  /**
   * 유저 Account의 row를 생성하는 트랜잭션
   */
  static create_user_transaction(nickname,channel_distinct_id){
    // 채널 distinct_id 가 있으면 validation, 없으면 새로 생성
    
    if(!channel_distinct_id){
      throw new Error(`없는 채널`)
    } else {
      Channel.valid_channel_id(channel_distinct_id)
    }

    // 유저 row 생성
    const user = new User(this.get_distinct_id(), channel_distinct_id)
    user.create_user_row(nickname)
  }

  /**
   * 이미 있는 유저를 이미 있는 채널에 구독(구좌 만들어주기)
   */
  static create_user_channel_rel(target_user_id, target_channel_id){
    // 채널 유효한지 검증
    Channel.valid_channel_id(target_channel_id)
    const user = new User(target_user_id, target_channel_id)
    // 유저 id 유효한지 검증
    user.valid_user();
    // 이미 구독했는지 검증
    const [rowNumber, rowInfo] = user.get_user_account_info_by_id_and_channel(user.user_distinct_id,user.channel_distinct_id)
    if(rowNumber) throw new Error(`이미 구독중입니다.`)
    user.create_user_row(user.get_nickname_by_id())
  }


  /**
  * 충전 트랜잭션
  */
  static charge_transaction(target_user_id,target_channel_id,cash_product_id){
    const user = new User(target_user_id,target_channel_id);
    user.valid_user_channel_rel();

    // history 현재 row 수 갖고 오기 (한 트랜잭션에서 여러개 넣어야 하니까)
    const history = new History();

    // 충전한 캐시상품 갖고오기
    const [cpRowNumber, cpRowInfo] = Product.get_cash_product_price_by_id(cash_product_id)
    const issuedAmount = cpRowInfo[4]

    // 충전할 유저 정보, 채널id 정보 갖고오기 by user_id, channel_id
    const [rowNumber, rowInfo] = user.get_user_account_info_by_id_and_channel(user.user_distinct_id, user.channel_distinct_id)
    if(!rowNumber) throw new Error(`값을 찾을 수 없습니다`)

    // 채널 id랑 user id 추출
    const channelId = rowInfo[1]
    const userId = rowInfo[0]

    // Publ의 캐시 발행 트랜잭션 실행 (히스토리 생성까지 포함)
    Publ.issue_cash_transaction(userId,channelId,cash_product_id,issuedAmount,history)

    // 유저 account 정보 업데이트 하기
    const updateRow = user.get_user_row_to_update(rowInfo, "캐시 충전", issuedAmount)
    user.set_row_bulk({
      sheet : user.userCashAccountSheet,
      startRow : rowNumber,
      startCol : 1,
      rowRange : updateRow.length,
      colRange : updateRow[0].length,
      values : updateRow
    })
  }

  /**
   * 유저가 존재하는지 여부 확인
   */
  valid_user(){
    const [rowNumber, rowInfo] = this.get_user_account_info_by_id(this.user_distinct_id)
    if(!rowNumber) throw new Error(`존재하지 않는 사용자`)
  }

  /**
   * 유저가 채널에 구독되어있는지 확인
   */
  valid_user_channel_rel(){
    const [rowNumber, rowInfo] = this.get_user_account_info_by_id_and_channel(this.user_distinct_id, this.channel_distinct_id)
    console.log(rowNumber)
    if(!rowNumber) throw new Error(`아직 구독하지 않은 사용자. 구독 먼저 하셈`)
  }

  /**
   * 유저 row 생성
   */
  create_user_row(nickname){
    // 생성할 유저 사이드 row 갖고 오기
    const userRow = this.get_user_row_to_create(nickname) 
    
    // 유저 Account 정보 생성
    this.set_row_bulk({
      sheet : this.userCashAccountSheet,
      startRow : this.uCASheetLastRow+1,
      startCol : 1,
      rowRange : userRow.length,
      colRange : userRow[0].length,
      values : userRow
    })
  }

  /**
   * 유저 id로 닉네임 찾기 (가장 최근)
   */
  get_nickname_by_id(){
    const targetSheet = this.get_sheet_values({
      sheet : this.userCashAccountSheet,
      startRow : 1,
      startCol : 1,
      rowRange : this.uCASheetLastRow,
      colRange : this.uCASheetLastCol
    })
    const [rowNumber, rowInfo] = this.find_row_number_info(targetSheet,1,this.user_distinct_id)
    return rowInfo[2]
  }

  /**
  * 새로 생성한 유저의 정보를 row 형태로 반환
  * input : nickname
  * output : row(2darray)
  */
  get_user_row_to_create(nickname){
    return [
      [
        this.user_distinct_id,
        this.channel_distinct_id,
        nickname,
        0,
        new Date(),
        new Date()
      ]
    ]
  }

  /**
  * 새로 업데이트할 유저의 정보를 row 형태로 반환
  * input : rowInfo(원래 row), type(업데이트 사유), amount(수정할 금액)
  * output : row(2darray)
  */
  get_user_row_to_update(rowInfo, type, amount){
    console.log(`prev rowInfo -= ${rowInfo}`)
    switch(type){
      case "캐시 충전":
        rowInfo[3] = rowInfo[3] + amount
        rowInfo[5] = new Date();
        break;
      case "아이템 구매" : 
        rowInfo[3] = rowInfo[3] - amount
        rowInfo[5] = new Date();
        break;
      default : 
        break;
    }
    console.log(`after rowInfo = ${rowInfo}`)
    return [rowInfo]
  }

  /**
  * 특정 userId와 channelID 를 가진 유저의 row 넘버와 row_info 갖고오기
  */
  get_user_account_info_by_id(userId){
    const targetSheet = this.get_sheet_values({
      sheet : this.userCashAccountSheet,
      startRow : 1,
      startCol : 1,
      rowRange : this.uCASheetLastRow,
      colRange : this.uCASheetLastCol
    })
    console.log(targetSheet)
    return this.find_row_number_info(targetSheet,1,userId)
  }


  /**
  * 특정 userId와 channelID 를 가진 유저의 row 넘버와 row_info 갖고오기
  */
  get_user_account_info_by_id_and_channel(userId,channelId){
    const targetSheet = this.get_sheet_values({
      sheet : this.userCashAccountSheet,
      startRow : 1,
      startCol : 1,
      rowRange : this.uCASheetLastRow,
      colRange : this.uCASheetLastCol
    })
    console.log(targetSheet)
    return this.find_row_number_info_by_double_values(targetSheet,1,userId,2,channelId)
  }

}