'use client'

import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/button'
import { DatePicker } from '@nextui-org/date-picker'
import React from 'react'
import {getLocalTimeZone, today, DateFormatter, parseDate} from "@internationalized/date";
import { useRouter } from 'next/navigation'
import { ScheduleDateParser } from '@/lib/date-formatter'

const DateSection = () => {

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const ed = tomorrow.toLocaleDateString('id-ID',{
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const [startDate, setStartDate] = React.useState<any>(today(getLocalTimeZone()));
  const [endDate, setEndDate] = React.useState<any>(parseDate(ScheduleDateParser(ed)));
  const router = useRouter()

  const hendleSearch = () => {
    // start date to 27-10-2024
    const start_date = new Date(startDate).toLocaleDateString('id-ID',{
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const end_date = new Date(endDate).toLocaleDateString('id-ID',{
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    console.log(start_date, end_date)
    router.push(`/explore?start_date=${start_date}&end_date=${end_date}`)
  }

  return (
    <section 
      className="bg-cover bg-center bg-no-repeat h-[600px] flex flex-col justify-center items-center"
      style={{backgroundImage: 'url(/assets/img/main-bg.png)' }}
    >
      <div className="container ">
        <div className="flex justify-between items-center">
          <div className="hidden md:flex flex-col justify-center">
            <p className="text-4xl font-bold text-white">Booking home stay online <br/> dengan harga promo</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg w-[460px]">
            <p className="font-semibold text-gray-500 mb-8">Yuk cari tanggal yang sesuai  <br/> tempat paling nyaman buat kamu</p>

            <div className="w-full max-w-xl flex flex-row gap-4 mb-4">
              <DatePicker
                label="Tanggal Check-In"
                variant="bordered"
                value={startDate}
                showMonthAndYearPickers
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className="w-full max-w-xl flex flex-row gap-4">
              <DatePicker
                label="Tanggal Check-Out"
                variant="bordered"
                value={endDate}
                showMonthAndYearPickers
                onChange={(date) => setEndDate(date)}
              />
            </div>

        
            <div className="mt-4">
              <Button onClick={() => hendleSearch()} color="primary" fullWidth={true} variant="solid" endContent={<Icon icon="solar:rounded-magnifer-bold-duotone"/>}>
                Cari Kamar
              </Button>    
              {/* <Buton icon="i-solar-rounded-magnifer-bold-duotone" size="lg" block>Cari Ketersediaan</Buton> */}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default DateSection