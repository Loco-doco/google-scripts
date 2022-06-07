/**
 * 조회 시작일부터 종료일까지 날짜들을 일별로 뽑아내는 main 함수
 * 
 * @param {date} startDate 조회 시작일
 * @param {date} endDate 조회 종료일
 * @param {array} 공휴일 리스트
 * @customFunction
 */
function get_arranged_date(startDate, endDate, holidays) {
  // input으로 들어온 startDate, endDate들을 Locale한 값으로 변환
  startDate = new Date(startDate);
  startDate.toLocaleDateString();

  endDate = new Date(endDate);
  endDate.toLocaleDateString();

  holidays = get_holiday_list(holidays)
  console.log(`holidays = ${holidays}`)

  // startDate 부터 endDate 까지 1일씩 추가 
  const dateArray = get_date_between_start_and_end(startDate, endDate)

  // 실제 시트에 뿌려주기
  // 토, 일요일 빼기 (getDay === 6 || 0)
  const result = get_fixed_date(dateArray, holidays);
  return result
}

/**
 * 조회 시작일 부터 종료일까지를 일별로 나눔
 * @param {date} startDate 조회 시작일
 * @param {date} endDate 조회 종료일
 */
function get_date_between_start_and_end(startDate, endDate) {
    const dateArray = new Array();
    let currentDate = startDate;
    while (currentDate <= endDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

/**
 * 일별로 나누어진 일자들 수정. 
 * 토, 일요일 빼기
 * Locale한 date에 +1씩 더해서 표시 시간으로 만들기.
 * (모종의 이유로, 셀에 적혀있는 일자를 갖고올 시 -1일로 인식되기에)
 * (ex : 셀에는 2022-05-02로 적혀있으나, 스크립트로 찍으면 2022-05-01로 찍힘.)
 * @param {array} dateArray Locale한 date들 Array
 */
function get_fixed_date(dateArray, holidays) {
  let rowDate = new Array();
  let rowViewDate = new Array();
  let viewDate = '';

  dateArray.reduce((acc,date) => {

    viewDate = date.addDays(1) // 표시용 date에는 Locale date의 일자 값 + 1
    const isHoliday = is_holiday(viewDate, holidays)
    if(viewDate.getDay() !== 6 && viewDate.getDay() !== 0 && !isHoliday){ // 토, 일요일 빼기, 공휴일 빼기
      rowDate.push( date );
      is_today(viewDate)
      ? rowViewDate.push(`${viewDate.getMonth()+1}.${viewDate.getDate()} (오늘)`)
      : rowViewDate.push(`${viewDate.getMonth()+1}.${viewDate.getDate()}`)
    }
  },'')

  return [
    rowDate,
    [],
    rowViewDate,
  ]
}