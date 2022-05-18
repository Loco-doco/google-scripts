class Channel extends Publ{
  constructor(channel_distinct_id){
    super();

    this.channel_distinct_id = channel_distinct_id
    ? channel_distinct_id
    : this.create_distinct_id('C')
  }

  /**
   * random한 distinct_id 생성
   */ 
  static get_distinct_id(){
    const channel = new Channel();
    return channel.channel_distinct_id
  }

  /**
   * 새로운 Channel 생성
   * = Channel의 새 캐쉬 구좌 생성
   */
  static create_channel(){
    const channel = new Channel();
    const publ_distinct_id = Publ.get_distinct_id();
    channel.create_channel_row(publ_distinct_id)
  }

  /**
   * Channel Id가 유효한지 판별
   */
  static valid_channel_id(target_channel_id){
    const channel = new Channel();
    const targetSheet = channel.get_sheet_values({
      sheet : channel.publCashAccountSheet,
      startRow : 1,
      startCol : 1,
      rowRange : channel.pCASheetLastRow,
      colRange : channel.pCASheetLastCol
    })
    console.log(`target_channel_id = ${target_channel_id}`)
    const [rowNumber, rowInfo] = channel.find_row_number_info(targetSheet,2,target_channel_id)
    if(!rowNumber) throw new Error("해당하는 채널이 없습니다.")
  }

  /**
   * 채널에 새 Cash Product 추가
   * channel_id, product_name, amount
   */
  static create_cash_product_to_channel(channel_id, product_name, amount){
    //publ한테 만들어달라고 요청한다.
  }

  /**
  * 새로 생성할 채널 row 정보
  */
  get_channel_row_to_create(publ_distinct_id){
    return [
      [
        publ_distinct_id,
        this.channel_distinct_id,
        0,
        new Date(),
        new Date()
      ]
    ]
  }

  /**
   * 새 channel 캐쉬 구좌 생성
   */
  create_channel_row(publ_distinct_id){
    const channelRow = this.get_channel_row_to_create(publ_distinct_id) 
    
    // 채널 row 생성
    this.set_row_bulk({
      sheet : this.publCashAccountSheet,
      startRow : this.pCASheetLastRow+1,
      startCol : 1,
      rowRange : channelRow.length,
      colRange : channelRow[0].length,
      values : channelRow
    })
  }

  /*
  * 이미 생성한 채널 Account 정보 갖고 오기
  */
  get_channel_account_info_by_user_distinct_id(distinctId){
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