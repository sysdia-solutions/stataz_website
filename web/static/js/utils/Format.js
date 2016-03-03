import dateFormatter from 'dateformat-light'

export const defaultDateFormat = 'dddd, dS mmmm, yyyy "at" HH:MM'

export function formatDate(dateString, dateFormat) {
  var dateTimeElements = dateString.split(" ")
  if (dateTimeElements.length !== 2) return dateString

  var dateElements = dateTimeElements[0].split("-")
  var timeElements = dateTimeElements[1].split(":")

  if (dateElements.length !== 3 || timeElements.length !== 3) return dateString

  var makeDate = new Date(dateElements[0], (dateElements[1] - 1), dateElements[2],
                          timeElements[0], timeElements[1], timeElements[2], 0)
  return dateFormatter(makeDate, dateFormat)
}
