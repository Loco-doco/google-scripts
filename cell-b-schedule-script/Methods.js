/**
 * date 객체에 days 만큼의 일자를 더해주는 함수
 * @param {2} days 더할 일자
 */
Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

/**
 * datetime을 숫자로 변환하는 함수. (날짜들 비교계산용)
 * @param {2022-05-01T00:02:001Z} datetime
 */
function change_datetime_to_time(datetime){
  if(!datetime) return ''
  const year = datetime.getFullYear()
  const month = datetime.getMonth()
  const date = datetime.getDate()
  
  const getTime = new Date(year,month,date)
  return getTime.getTime()
}

/**
 * input으로 들어온 array에서 최대, 최솟값을 리턴해주는 함수.
 * @param {[1,2,3,4]} values 
 */
function get_max_min_value(values){
  values = values.filter(e => e !== '')
  const max = Math.max.apply(null,values)
  const min = Math.min.apply(null,values)

  return [max,min]
}

/**
 * WorkingDay 계산하는 함수
 * @param {2022-05-01} startDate 계산 시작일
 * @param {2022-05-03} endDate 계산 종료일
 */
function get_working_days(startDate, endDate) {
    let count = 0;
    startDate = new Date(startDate.getTime());
    while (startDate <= endDate) {
        const dayOfWeek = startDate.getDay();
        if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
        startDate.setDate(startDate.getDate() + 1);
    }
    return count-2;
}

/**
 * WorkingDay를 일별로 끊어서 n일차로 표시하는 array 생성 함수
 * @param {2022-05-01} startDate WorkingDay 시작일
 * @param {2022-05-05} endDate WorkingDay 종료일
 */
function set_working_progress_per_day(startDate,endDate){
  const range = get_working_days(startDate,endDate)
  if(range<=0) return null
  const arr = new Array(get_working_days(startDate,endDate))
  for(let i=0;i<range;i++){
    arr[i] = `${i+1}일차`
  }
  return arr
  
}

/**
 * input으로 넣은 일자가 오늘 일자랑 같은지 판별하는 함수
 */
function is_today(date){
  const today = new Date()
  // console.log(`date = ${date}, today = ${today}`)
  if(
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) {
    return true
  } else {
    return false
  }
}

/**
 * 시트 상의 공휴일 목록을 불러와 빈 값을 뺀 리스트 반영
 */
function get_holiday_list(holidays){
  const result = holidays.reduce((acc,holiday) => {
    if(holiday[0]) acc.push(new Date(holiday[0]))
    return acc
  },[])
  return result
}

/**
 * 특정 date가 holiday 목록에 있는지 판별
 */
function is_holiday(date, holidays){
  let result = false;
  holidays.reduce((acc,holiday) => {
    if(
      date.getFullYear() === holiday.getFullYear() &&
      date.getMonth() === holiday.getMonth() &&
      date.getDate() === holiday.getDate()
    ){
      result = true
    }
  },'')
  return result
}