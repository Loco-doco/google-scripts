class Product extends Global{
  constructor(){
    super()
  }

  static get_cash_product_price_by_id(id){
    const global = new Global();
    const targetSheet = global.get_sheet_values({
      sheet : global.cashProductSheet,
      startRow : 1,
      startCol : 1,
      rowRange : global.cPSheetLastRow,
      colRange : global.cPSheetLastCol
    })
    return global.find_row_number_info(targetSheet,1,id)
  }
}