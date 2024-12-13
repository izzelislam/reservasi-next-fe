export const ScheduleDateParser = (param:string) => {
  const date = param
  const [day, month, year] = date.split("/")
  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

export const DatePayload = (param:any) => {
  const date = new Date(param).toLocaleDateString('id-ID',{
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const [day, month, year] = date.split("/")
  const formattedDate = `${day}-${month}-${year}`
  return formattedDate
}

// date full id from 2024-12-09
export const DateIdparser =(param:string) => {
  const date = new Date(param);
  const fullDate = date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return fullDate
}
