function afterWork(global,sentRecord){
  console.log(sentRecord)

  const historyRecord = global.callHistory.getRange(2,1,global.callHistoryCount,6).getValues();
  console.log(historyRecord)

  const targetRow = getTargetRowInfoToBeUpdated(historyRecord, sentRecord)
}

function getTargetRowInfoToBeUpdated(target, data){
  const targetRowFull = data.reduce((acc,val,i)=>{
    const result = global.index_of_2d_array(target,val[0])
    console.log(`
      val = ${val},
      result = ${result}
      `)
  },[])

  const targetRow = '';

  return targetRow
}