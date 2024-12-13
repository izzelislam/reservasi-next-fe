
// fomated number to idr

const NumberToIdr = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(number)
}

export default NumberToIdr