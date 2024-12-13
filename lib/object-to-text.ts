
export const objectToText = (obj: any) => {

  if (typeof obj == 'object' ){
    let text = ''
    Object.keys(obj).forEach((key) => {
      text += `${key}: ${obj[key]}\n`
    })
    return text
  } else {
    return obj
  }
}