import dateFormatter from 'dateformat-light'

export const defaultDateFormat = "dddd, dS mmmm, yyyy"

export function formatDate(dateString, dateFormat) {
  var makeDate = new Date(dateString)
  return dateFormatter(makeDate, dateFormat)
}
