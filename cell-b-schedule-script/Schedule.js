function update_schedule_sheet(dateArray, scheduleArray) {
  dateArray = dateArray[0].reduce((acc,date) => {
    if(date) {acc.push(change_datetime_to_time(date))}
    return acc
  },[])

  scheduleArray = scheduleArray.reduce((acc,row) => {
    if(row[0]) {acc.push(row)}
    return acc
  },[])

  let returnArr = [];

  scheduleArray.reduce((acc,scheduleDateArr) => {
    const startDateExp = change_datetime_to_time(scheduleDateArr[0])
    const startDate = change_datetime_to_time(scheduleDateArr[1])
    const dueDateExp = change_datetime_to_time(scheduleDateArr[2])
    const dueDate = change_datetime_to_time(scheduleDateArr[3])

    const [maxDate, minDate] = get_max_min_value([startDateExp, startDate, dueDateExp, dueDate])
    
    acc.push(fill_data_to_row(dateArray,startDateExp,startDate,dueDateExp,dueDate,maxDate,minDate))
    return acc
  },returnArr)
  
  return returnArr
}

/**
 * calendar 일자 하나씩 돌아가면서 검증
 * 일자랑 실제 출시일이 같을 경우 => "출시"
 * 일자랑 실제 착수일이 같을 경우 => "착수"
 * 일자랑 출시 예정일이 같을 경우 => "출시(예정)"
 * 일자랑 착수 예정일이 같을 경우 => "착수(예정)"
 * 일자가 min과 max 사이에 있는 경우 => 1
 */
function fill_data_to_row(dateArray,startDateExp,startDate,dueDateExp,dueDate, maxDate, minDate){
  const row = dateArray.reduce((acc,date)=>{

    if(date === dueDate){acc.push("출시")}
    else if(date === startDate){acc.push("착수")}
    else if(date === dueDateExp){acc.push("출시(예정)")}
    else if(date === startDateExp){acc.push("착수(예정)")}
    else if(date >= minDate && date <= maxDate){acc.push(1)}
    else {acc.push(0)}
    return acc

  },[])
  return row
}

