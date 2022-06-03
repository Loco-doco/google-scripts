Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function change_datetime_to_time(datetime){
  if(!datetime) return ''
  const year = datetime.getFullYear()
  const month = datetime.getMonth()
  const date = datetime.getDate()
  
  const getTime = new Date(year,month,date)
  return getTime.getTime()
}

function get_max_min_value(values){
  values = values.filter(e => e !== '')
  const max = Math.max.apply(null,values)
  const min = Math.min.apply(null,values)

  return [max,min]
}