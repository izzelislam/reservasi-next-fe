'use client'
import LoadingState from '@/components/loading-state'
import api from '@/lib/api'
import NumberToIdr from '@/lib/currency'
import { DateIdparser } from '@/lib/date-formatter'
import { objectToText } from '@/lib/object-to-text'
import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import React from 'react'
import toast from 'react-hot-toast'
import QRCode from 'react-qr-code'

const CekPesanan = () => {

  const [loading, setLoading] = React.useState(false)
  const [room, setRoom] = React.useState<any>()
  const [code, setCode] = React.useState('')

  const handleGetRoom = async () => {
    if (!code) {
      toast.error('Silahkan masukan kode booking anda')
      return
    }
    setLoading(true)
    try {
      const res = await api.post('/check/order', {
        code : code
      })
      setRoom(res.data)
      setLoading(false)
    } catch (error:any) { 
      setLoading(false)
      toast.error(objectToText(error?.data?.message))
    }
  }

  return (
    <div className='py-6'>
      <div className='container m-auto'>
        <div className='flex items-end justify-center gap-8 mb-6'>
          <Input
            label="Maukan kode booking untuk cek pesanan"
            type="email"
            placeholder='Silahkan masukan kode booking anda'
            labelPlacement="outside"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button onClick={() => handleGetRoom()} color='primary' startContent={<Icon icon="solar:magnifer-bold-duotone" fontSize={30}/>}>Cek Pesanan</Button>
        </div>
        {
          room ?
          <div className='border-1 border-gray-300 rounded-lg p-4'>
            <p className='mb-4'>Informasi Pesanan</p>
            <div className='w-full md:w-1/2 mb-6'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-600'>Status</span>
                <span className='text-sm bg-warning px-2 py-1 rounded-full text-white'>Menunggu Konfirmasi</span>
              </div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-600'>Pemesan</span>
                <span className='text-gray-700'>{room?.user?.name}</span>
              </div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-600'>Kode Booking</span>
                <span className='text-gray-700'>{room?.trx}</span>
              </div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-600'>Tangga Pemesanan</span>
                <span className='text-gray-700'>{DateIdparser(room?.created_at)}</span>
              </div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-600'>Total bayar</span>
                <span className='text-gray-700'>{NumberToIdr(room?.total_price)}</span>
              </div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-600'>Waktu Check In/out</span>
                <span className='text-gray-700'>{DateIdparser(room?.start_booking)} - {DateIdparser(room?.end_booking)}</span>
              </div>
            </div>
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
          </div>
          : <div className='h-96 flex justify-center items-center'>
              <div className='text-gray-600'>
                Order tidak ditemukan ....
              </div>
            </div>
        }
      </div>
      <LoadingState isLoading={loading} />
    </div>
  )
}

export default CekPesanan