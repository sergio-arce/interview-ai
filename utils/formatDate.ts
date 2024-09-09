
export const formatDate = (isoString: string) => {
  const date = new Date(isoString)

  // get dates
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // monts => 0 a 11
  const year = date.getFullYear()

  // format local date
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  // format return "DD/MM/YYYY - HH:mmhr"
  return `${day}/${month}/${year} - ${hours}:${minutes}h`
}