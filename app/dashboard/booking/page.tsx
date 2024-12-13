'use client'
import LoadingState from '@/components/loading-state'
import api from '@/lib/api'
import NumberToIdr from '@/lib/currency'
import { DateIdparser } from '@/lib/date-formatter'
import { Icon } from '@iconify/react'
import { Accordion, AccordionItem } from '@nextui-org/accordion'
import { Avatar } from '@nextui-org/avatar'
import { Pagination } from '@nextui-org/pagination'
import React, { useEffect } from 'react'
import QRCode from 'react-qr-code'

const BookinPageDS = () => {

  const [loading, setLoading] = React.useState(false)
  const [rooms, setRooms] = React.useState<any>([])
  const [attr, setAttr] = React.useState<any>([])

  const getAllRoom = async () => {
    try {
      setLoading(true)
      const res = await api.get('/customer/order')
      setRooms(res.data.data)
      console.log(res.data.data)
      setAttr(res.data)
      setLoading(false)
    } catch (error: any) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllRoom()
  }, [])

  return (
    <div className='bg-white rounded-lg p-6'>
      <div className='mb-4'>Daftar booking</div>
      <Accordion selectedKeys={['0']} selectionMode="multiple">
        {
          rooms.length > 0 &&
          rooms.map((item: any, index:any) => 
            <AccordionItem
              key={index}
              aria-label="Chung Miller"
              
              startContent={
                <Avatar
                  // isBordered
                  color="primary"
                  radius="lg"
                  src={item?.room?.room_galeries[0]?.image_url}
                />
              }
              subtitle={NumberToIdr(item?.total_price)}
              title={item?.room?.name}
              
            >
              <div className='flex flex-col gap-1'>
                <div className='text-sm mb-2'>Detail pesanan</div>
                <div className='mb-4'>
                  <div className='flex flex-row gap-4 items-center'>
                    <span className='text-sm text-gray-600'>Kode Booking</span>
                    <span className='font-semibold text-primary'>{item?.trx}</span>
                  </div>
                  <div className='flex flex-row gap-4 items-center mb-2'>
                    <span className='text-sm text-gray-600'>Tanggal pemesanan</span>
                    <span className='text-sm text-primary'>{DateIdparser(item?.created_at)}</span>
                  </div>
                  <div>
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "15%", width: "15%" }}
                      value={item?.trx}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                    <Icon icon="bxs:credit-card-alt" color='white' />
                  </div>
                  <div>
                    <p className='text-gray-600 text-sm'>pesanan dibuat</p>
                    <p className='text-xs text-gray-500'>pesanan dibuat pada,  {DateIdparser(item?.created_at)}</p>
                  </div>
                </div>
                
                <div>
                  <div className={`h-5 w-[2px] ml-4 rounded-lg ${ item?.status == 'pending' || item?.status == 'canceled' ? 'bg-gray-300' : 'bg-primary'}`}></div>
                  <div className='flex items-center gap-4'>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ item?.status == 'pending' || item?.status == 'canceled' ? 'bg-gray-300' : 'bg-primary'}`}>
                      <Icon icon="bxs:credit-card-alt" color='white' />
                    </div>
                    <div>
                      <p className='text-gray-600 text-sm'>Status oembayaran : {item?.status}</p>
                      <p className='text-xs text-gray-500'>
                        {
                          item?.status == 'pending' ? 'belum dilakukan' : 'Pembayaran terkonfirmasi admin pada tanggal : '.concat(DateIdparser(item?.activity?.updated_at))
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`h-5 w-[2px] ml-4 rounded-lg ${ item?.activity?.check_in_at ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className='flex items-center gap-4'>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ item?.activity?.check_in_at ? 'bg-primary' : 'bg-gray-300'}`}>
                    <Icon icon="bxs:archive-in" color='white' />
                  </div>
                  <div>
                    <p className='text-gray-600 text-sm'>Check in </p>
                    <p className='text-xs text-gray-500'>
                      {
                        item?.activity?.check_in_at ? 'Check in dilakukan pada tanggal : '.concat(DateIdparser(item?.activity?.check_in_at)) : 'belum dilakukan'
                      }
                    </p>
                  </div>
                </div>

                <div className={`h-5 w-[2px] ml-4 rounded-lg ${item?.activity?.check_out_at ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className='flex items-center gap-4'>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ item?.activity?.check_out_at ? 'bg-primary' : 'bg-gray-300'}`}>
                    <Icon icon="bxs:archive-out" color='white' />
                  </div>
                  <div>
                    <p className='text-gray-600 text-sm'>Check Out</p>
                    <p className='text-xs text-gray-500'>
                      {
                        item?.activity?.check_out_at ? 'Check out dilakukan pada tanggal : '.concat(DateIdparser(item?.activity?.check_out_at)) : 'belum dilakukan'
                      }
                    </p>
                  </div>
                </div>

                <div className={`h-5 w-[2px] ml-4 rounded-lg ${item?.status == 'finished' ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className='flex items-center gap-4'>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item?.status == 'finished' ? 'bg-primary' : 'bg-gray-300'}`}>
                    <Icon icon="bxs:check-square" color='white' />
                  </div>
                  <div>
                    <p className='text-gray-600 text-sm'>Booking Selesai</p>
                    <p className='text-xs text-gray-500'>Bokking telah selesai</p>
                  </div>
                </div>
              </div>
            </AccordionItem>
          ) 
        } 
      </Accordion>

      <div>
        {/* <Pagination loop showControls color="primary" initialPage={1} total={5} /> */}
      </div>
      <LoadingState isLoading={loading} />
    </div>
  )
}

export default BookinPageDS