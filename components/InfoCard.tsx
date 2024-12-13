import React from 'react'

const InfoCard = ({info}: any) => {
  return (
    <div>
      <div className="p-4 bg-white rounded-lg cursor-pointer hover:scale-105 transition-all">
        <img src={info?.image_url} className="w-full h-[150px] object-cover rounded-lg" />
        <div className="mt-3">
          <p className="text-gray-600 font-semibold mb-2 line-clamp-1">{info?.title}</p>
          <p className="text-gray-500 text-sm line-clamp-2">{info?.description} </p>
        </div>
      </div>
    </div>
  )
}

export default InfoCard