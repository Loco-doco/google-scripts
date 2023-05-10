
/**
 * 발송 후 해야할 일들.
 * 1. (sentRecord) 발송한 이력 레코드들이 callHistory에서 몇 번째 row에 해당하는지를 저장.
 * 2. 해당 row들의 상태 컬럼에 발송 완료 표시.
 * 
 * @param {object} global 글로벌 객체
 * @param {object} sentRecord 발송한 이력들.
 */
function afterWork(global,sentRecord){
  console.log(sentRecord)

  insertHistoryLog(global,sentRecord)
  deleteCandidateLog(global)
}


function insertHistoryLog(global, records){
  const recordRows = records.length;
  console.log(`recordRows = ${recordRows}`)
  const recordCols = records[0].length;
  console.log(`recordCols = ${recordCols}`)
  
  global.callHistory.getRange(
    global.callHistoryCount+2,1,
    recordRows, recordCols
  ).setValues(records)
  // global.callHistory.getRange()
}

function deleteCandidateLog(global){
  global.candidateSheet.getRange("A2:A").clearContent();
}