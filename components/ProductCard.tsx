import NumberToIdr from '@/lib/currency';
import Link from 'next/link'
import React from 'react'

const ProductCard = ({room, start_date, end_date}:any) => {
  const query = start_date && end_date ? `?start_date=${start_date}&end_date=${end_date}` : ''
  // console.log(room);
  return (
    <div>
      <div>
        <Link href={`/explore/${room?.slug}${query}`}>
          <div className="rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div
              className="h-[200px] w-full bg-cover bg-center bg-no-repeat rounded-lg "
              style={{ backgroundImage: `url(${room?.room_galeries?.[0]?.image_url})` }}
            >
            </div>
            <div className="p-4">
              <div className='flex justify-between items-center mb-3'>
                <p className="text-primary text-sm mb-2">Kapasitas : {room?.capacity} orang </p>
                <span className='text-xs font-semibold bg-yellow-400 p-1 rounded-full'>cari jadwal</span>
              </div>
              <p className="text-gray-600 line-clamp-2 mb-2">{room?.name}</p>

              <p className="text-gray-600 font-semibold text-lg">{NumberToIdr(room?.price)} <span className='text-xs text-danger'>/malam</span></p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard