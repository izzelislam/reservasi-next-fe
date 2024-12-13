'use client'
import LoadingState from '@/components/loading-state'
import api from '@/lib/api'
import { DateIdparser } from '@/lib/date-formatter'
import { objectToText } from '@/lib/object-to-text'
import { Icon } from '@iconify/react'
import React from 'react'
import toast from 'react-hot-toast'
import QRCode from 'react-qr-code'

const DashboardPage = () => {

  const [isLoading, setIsLoading] = React.useState(true)
  const [room, setRoom] = React.useState<any>()

  const handleGetRoom = async () => {
    setIsLoading(true)
    try {
      const res = await api('/customer/order-single')
      setRoom(res.data)
      console.log(res.data)
    } catch (error:any) {
      toast.error(objectToText(error?.data?.message))
    }
    setIsLoading(false)
  }

  React.useEffect(() => {
    handleGetRoom()
  }, [])

  return (
    <div>
      <div className="text-gray-600 font-semibold pb-4 mb-4 border-b border-gray-300">
        <p>Selamat datang Dominic Solanske</p>
      </div>

      <div className='bg-primary-50 text-primary font-semibold p-4 rounded-lg mb-4'>
        Untuk melihat history booking / booking secara lengkap solahkan ke menu booking
      </div>
      <div className='bg-white rounded-lg p-6'>
        {
          room &&
          <div className='flex flex-col gap-1'>
            <div className='text-sm mb-2'>Detail pesanan</div>
            <div className='mb-4'>
              <div className='flex flex-row gap-4 items-center'>
                <span className='text-sm text-gray-600'>Kode Booking</span>
                <span className='font-semibold text-primary'>{room?.trx}</span>
              </div>
              <div className='flex flex-row gap-4 items-center mb-2'>
                <span className='text-sm text-gray-600'>Tanggal pemesanan</span>
                <span className='text-sm text-primary'>{DateIdparser(room?.created_at)}</span>
              </div>
              <div>
                <div className='hidden md:block'>
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "10%", width: "10%" }}
                    value={room?.trx}
                    viewBox={`0 0 256 256`}
                  />
                </div>
                <div className='md:hidden'>
                  <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "80%", width: "80%" }}
                      value={room?.trx}
                      viewBox={`0 0 256 256`}
                    />
                </div>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                <Icon icon="bxs:credit-card-alt" color='white' />
              </div>
              <div>
                <p className='text-gray-600 text-sm'>pesanan dibuat</p>
                <p className='text-xs text-gray-500'>pesanan dibuat pada,  {DateIdparser(room?.created_at)}</p>
              </div>
            </div>
            
            <div>
              <div className={`h-5 w-[2px] ml-4 rounded-lg ${ room?.status == 'pending' || room?.status == 'canceled' ? 'bg-gray-300' : 'bg-primary'}`}></div>
              <div className='flex items-center gap-4'>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ room?.status == 'pending' || room?.status == 'canceled' ? 'bg-gray-300' : 'bg-primary'}`}>
                  <Icon icon="bxs:credit-card-alt" color='white' />
                </div>
                <div>
                  <p className='text-gray-600 text-sm'>Status oembayaran : {room?.status}</p>
                  <p className='text-xs text-gray-500'>
                    {
                      room?.status == 'pending' ? 'belum dilakukan' : 'Pembayaran terkonfirmasi admin pada tanggal : '.concat(DateIdparser(room?.activity?.updated_at))
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`h-5 w-[2px] ml-4 rounded-lg ${ room?.activity?.check_in_at ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className='flex items-center gap-4'>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ room?.activity?.check_in_at ? 'bg-primary' : 'bg-gray-300'}`}>
                <Icon icon="bxs:archive-in" color='white' />
              </div>
              <div>
                <p className='text-gray-600 text-sm'>Check in </p>
                <p className='text-xs text-gray-500'>
                  {
                    room?.activity?.check_in_at ? 'Check in dilakukan pada tanggal : '.concat(DateIdparser(room?.activity?.check_in_at)) : 'belum dilakukan'
                  }
                </p>
              </div>
            </div>

            <div className={`h-5 w-[2px] ml-4 rounded-lg ${room?.activity?.check_out_at ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className='flex items-center gap-4'>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ room?.activity?.check_out_at ? 'bg-primary' : 'bg-gray-300'}`}>
                <Icon icon="bxs:archive-out" color='white' />
              </div>
              <div>
                <p className='text-gray-600 text-sm'>Check Out</p>
                <p className='text-xs text-gray-500'>
                  {
                    room?.activity?.check_out_at ? 'Check out dilakukan pada tanggal : '.concat(DateIdparser(room?.activity?.check_out_at)) : 'belum dilakukan'
                  }
                </p>
              </div>
            </div>

            <div className={`h-5 w-[2px] ml-4 rounded-lg ${room?.status == 'finished' ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className='flex items-center gap-4'>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${room?.status == 'finished' ? 'bg-primary' : 'bg-gray-300'}`}>
                <Icon icon="bxs:check-square" color='white' />
              </div>
              <div>
                <p className='text-gray-600 text-sm'>Booking Selesai</p>
                <p className='text-xs text-gray-500'>Bokking telah selesai</p>
              </div>
            </div>
          </div>
        }
      </div>

      <LoadingState isLoading={isLoading} />
    </div>
  )
}

export default DashboardPage