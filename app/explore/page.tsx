'use client'

import ProductCard from '@/components/ProductCard'
import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/button'
import { DatePicker } from '@nextui-org/date-picker'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import {getLocalTimeZone, today, DateFormatter, parseDate} from "@internationalized/date";
import { DatePayload, ScheduleDateParser } from '@/lib/date-formatter'
import Image from 'next/image'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import LoadingState from '@/components/loading-state'


const page = () => {

  const query = useSearchParams()

  const st = query.get('start_date') ?? new Date().toLocaleDateString('id-ID',{
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const ed = query.get('end_date') ?? tomorrow.toLocaleDateString('id-ID',{
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateString = maxDate.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const [startDate, setStartDate] = useState<any>(parseDate(ScheduleDateParser(st)))
  const [ endDate, setEndDate]    = useState<any>(parseDate(ScheduleDateParser(ed)))
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rooms, setRooms]         = useState<any>([])


  const handleSearch = async () => {
    const startDateP = new Date(startDate);
    const endDateP  = new Date(endDate);

    if (endDateP <= startDateP) {
      toast.error('Tanggal akhir harus lebih besar dari tanggal awal')
      return
    }

    setIsLoading(true)
    // console.log('lolos')
    try {
      const url = `/rooms-search?start_booking=${DatePayload(startDate)}&end_booking=${DatePayload(endDate)}`
      const res = await api.get(url)
      console.log(res)
      setRooms(res.data)
      setIsLoading(false)
    } catch (error:any) {
      setIsLoading(false)
      toast.error(error?.data?.message)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [query])


  return (
      <div className='bg-[#F4F7FE] py-4'>
        <section className="mb-6 mt-12">
          <div className='container m-auto'>
            <p className="text-gray-600 font-bold">Sesuaiin lagi sama tanggal yang kamu mau ?</p>
          </div>
        </section>

        <section className="mb-8">
          <div className='container m-auto'>
            <div className="bg-white rounded-lg shadow-lg p-4  grid grid-cols-1 md:grid-cols-3 gap-8">
            
              <div id="wrapper" className="flex gap-3 items-center bg-form rounded-lg focus-within:border focus-within:border-primary">
                <DatePicker 
                  minValue={startDate} 
                  className="w-full" 
                  label="Tanggal Check-In" 
                  value={startDate} 
                  onChange={(val) => setStartDate(val)}
                  maxValue={parseDate(ScheduleDateParser(maxDateString))}
                />
              </div>

              <div id="wrapper" className="flex gap-3 items-center bg-form rounded-lg focus-within:border focus-within:border-primary">
                <DatePicker 
                  minValue={endDate} 
                  className="w-full" 
                  label="Tanggal Check-Out" 
                  value={endDate} 
                  onChange={(val) => setEndDate(val)} 
                  maxValue={parseDate(ScheduleDateParser(maxDateString))}
                />
              </div>
              
              <div className='flex flex-col items-center justify-center'>
                <Button isLoading={isLoading} onClick={() => handleSearch()} color="primary" size='lg' fullWidth={true} variant="solid" endContent={<Icon icon="solar:rounded-magnifer-bold-duotone"/>}>
                  Cari Ketersediaan Kamar
                </Button> 
              </div>
            </div>
          </div>
        </section>

        <section className="bg-form py-12">
          <div className='container m-auto'>
            {
              rooms.length > 0 ? (
                <div>
                  <div className="mb-6">
                    <p className="text-gray-700 font-bold">Hore  tanggal yang kamu pilih masih tersedia </p>
                    <p className="text-sm text-gray-500">Silahkan pilih kamar yang kamu suka</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {
                      rooms.map((item:any, index:number) => {
                        return (
                          <div key={index}>
                            <ProductCard key={index} room={item} start_date={startDate} end_date={endDate} />
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center'>
                  <Image src="/assets/img/search.png" width={350} height={350} alt="room" />
                  <div className='text-center font-semibold text-gray-500'>
                    <p>Pilih tanggalnya dan sesuaiin dengan yang kamu mau !</p>
                  </div>
                </div>
              )
            }

          </div>
        </section>
        
        <LoadingState isLoading={isLoading} />
      </div>
    // <Suspense>
    // </Suspense>
  )
}

export default page