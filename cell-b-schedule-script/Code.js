function test(startDate, endDate) {
  const global = new Global();
  startDate = new Date(startDate);
  startDate.toLocaleDateString();

  endDate = new Date(endDate);
  endDate.toLocaleDateString();

  const dateArray = getDates(startDate, endDate)

  const result = returnArray(dateArray);
  return result
}


function getDates(startDate, stopDate) {
    const dateArray = new Array();
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function returnArray(dateArray) {
  let rowDate = new Array();
  let rowViewDate = new Array();
  let viewDate = '';

  dateArray.reduce((acc,val,i) => {
    viewDate = val.addDays(1)
    rowDate.push( val );
    rowViewDate.push(`${viewDate.getMonth()+1}.${viewDate.getDate()}`)
  },'')

  return [
    rowDate,
    [],
    rowViewDate,
  ]
}