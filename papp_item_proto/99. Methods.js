/*
* 채널 만들기
*/
function create_channel(){
  Channel.create_channel()
}


/* 
* 신규 유저 채널 구독하기
*/
function create_user_account_and_subs_channel() {
  const global = new Global();
  const nickname = global.userConsoleSheet.getRange("B2").getValue();
  const channel_distinct_id = global.userConsoleSheet.getRange("B3").getValue();
  User.create_user_transaction(nickname, channel_distinct_id)
}


/*
* 이미 있는 채널에 이미 있는 유저 추가(구좌 만들기)
*/
function create_user_channel_rel(){
  const target_user_id = global.userConsoleSheet.getRange("B6").getValue()
  const target_channel_id = global.userConsoleSheet.getRange("B7").getValue()
  User.create_user_channel_rel(target_user_id,target_channel_id)
}


/* 
* 유저의 특정 채널에 캐시 충전
*/
function charge_cash_by_purchase_cash_product() {
  User.charge_transaction("U-5jhbwugck6","C-dr6b6k9vq84","CP-w1aden8t")
}

/*
*
*/
function userPurchaseItem(){

}