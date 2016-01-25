import dateFormatter from 'dateformat-light'

export const defaultDateFormat = 'dddd, dS mmmm, yyyy "at" HH:MM'

export function formatDate(dateString, dateFormat) {
  var makeDate = new Date(dateString)
  return dateFormatter(makeDate, dateFormat)
}
