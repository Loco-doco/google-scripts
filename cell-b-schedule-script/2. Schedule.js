/**
 * 스케줄 시트 뿌려주는 main 함수
 * @param {L3:3} dateArray 조회 시작일부터 종료일까지 일별로 나뉜 date들 array
 * @param {F6:I} scheduleArray 각 업무별로 정해놓은 착수 예정, 시작일, 출시 예정, 시작일에 대한 array
 * @customFunction
 */
function update_schedule_sheet(dateArray, scheduleArray, holidays) {
  // dateArray 가공
  dateArray = get_fixed_date_array(dateArray)

  // scheduleArray 가공
  scheduleArray = get_fixed_schedule_array(scheduleArray)

  // 가공된 dateArray, scheduleArray로 실제 시트에 뿌려줄 일자별 스케줄 현황 계산
  const result = get_schedule_process_per_date(dateArray, scheduleArray, holidays)
  
  return result
}

/**
 * dateArray 가공 함수
 */
function get_fixed_date_array(dateArray){
  const result = dateArray[0].reduce((acc,date) => {
    if(date) {acc.push(change_datetime_to_time(date))}
    return acc
  },[])

  return result
}

/**
 * scheduleArray 가공 함수
 */
function get_fixed_schedule_array(scheduleArray){
  const result = scheduleArray.reduce((acc,row) => {
    if(row[0]) {acc.push(row)}
    return acc
  },[])

  return result
}

/**
 * dateArray, scheduleArray 기반으로 각 스케줄 row당 현황 파악 계산
 */
function get_schedule_process_per_date(dateArray, scheduleArray, holidays){
  // scheduleArray의 각 row별로, 이미 정해진 dateArray에 따라 착수인지 출시인지 어쩐지 여부를 판단.
  holidays = get_holiday_list(holidays)

  const result = scheduleArray.reduce((acc,scheduleDateArr) => {
    
    const startDateExp = change_datetime_to_time(scheduleDateArr[0]) // 착수 예정일
    const startDate = change_datetime_to_time(scheduleDateArr[1]) // 실제 착수일
    const dueDateExp = change_datetime_to_time(scheduleDateArr[2]) // 출시 예정일
    const dueDate = change_datetime_to_time(scheduleDateArr[3]) // 실제 출시일

    const workProgress = set_working_progress_per_day(
      scheduleDateArr[1]
       ?scheduleDateArr[1]
       :scheduleDateArr[0],
      scheduleDateArr[3]
        ?scheduleDateArr[3]
        :scheduleDateArr[2],
      holidays
    )

    // 예정 및 실제 착수일, 예정 및 실제 출시일의 최솟값 및 최댓값 구하기 (특정 날짜가 그 업무의 작업스케줄에 포함되는 날짜인지 아닌지 여부 판단하기 위함)
    // const [maxDate, minDate] = get_max_min_value(
    //   [startDateExp, startDate, dueDateExp, dueDate]
    // )
    
    acc.push(
      get_schedule_row({
        dateArray,
        startDateExp,
        startDate,
        dueDateExp,
        dueDate,
        // maxDate,
        // minDate,
        workProgress
      })
    )

    return acc
  },[])
  
  return result
}

/**
 * dateArray 일자 하나씩 돌아가면서 검증 후, 각 업무들의 date별 현황(출시, 예정 등) row를 생성한다.
 * 일자랑 실제 출시일이 같을 경우 => "출시"
 * 일자랑 출시 예정일이 같을 경우 => "출시(예정)"
 * 일자랑 실제 착수일이 같을 경우 => "착수"
 * 일자랑 착수 예정일이 같을 경우 => "착수(예정)"
 * 일자가 착수랑 출시 사이에 있을 경우 => n일차
 */
function get_schedule_row(values){
  const {
    dateArray,
    startDateExp,
    startDate,
    dueDateExp,
    dueDate,
    // maxDate,
    // minDate,
    workProgress
  } = values;

  let i=0;
  const row = dateArray.reduce((acc,date)=>{

    if(date === dueDate){acc.push("출시")}
    else if(date === dueDateExp){
      i++
      acc.push("출시(예정)")
    }
    else if(date === startDate){acc.push("착수")}
    else if(date === startDateExp){acc.push("착수(예정)")}
    else if(startDate > 0 && date >= startDate && (date <= dueDateExp || date <= dueDate)){
      if(workProgress) {
        acc.push(workProgress[date])
      }
      if(!workProgress){
        acc.push(0)
      }
      i++
    }
    else if(date >= startDateExp && date < dueDateExp){ //n일차 표기
      acc.push("미착수")
    }
    else {acc.push(0)}

    return acc
  },[])

  return row
}

