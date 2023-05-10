function trans_capital_to_lower(target_key_value, blacklist) {
  // const global = new Global();
  // const targetSheet = global.getSheetById(global.sa, 1407766321);

  // target_key_value = targetSheet.getRange("A2:B13").getValues();
  // blacklist = targetSheet.getRange("D1").getValue().split(',')


  const returnArr = target_key_value.reduce((acc,val) => {
    const key = val[0]
    const value = val[1]
    let returnValue;

    const pattern = /{{[a-zA-Z]*}}|CP|CAP|UNTITLED|VOD|pApp|Go Back/g
    
    // 블랙리스트에 올라가있는 키인가?
    isListedOnBlacklist = blacklist.includes(key)? true : false

    if (isListedOnBlacklist) {
      returnValue = value
    } else if (value.match(pattern)) {
      returnValue = replace_upper_to_lower_except_pattern(value, pattern)
    } else {
      returnValue = value.toLowerCase()
    }
    acc.push(returnValue)
    return acc
  },[])
  return returnArr
}


function replace_upper_to_lower_except_pattern(string, pattern){

  const breakPoints = string.match(pattern)
  const targetParts = string.split(pattern)

  let returnString = "";
  for(i=0;i<targetParts.length;i++){
    let targetPartStr;
    let breakPointStr;

    if (!targetParts[i]){
      targetPartStr = ""
    } else {
      targetPartStr = targetParts[i].toLowerCase();
    }
    if (!breakPoints[i]){
      breakPointStr = ""
    } else {
      breakPointStr = breakPoints[i]
    }

    returnString += targetPartStr+breakPointStr
  }
  return returnString;
  
}
