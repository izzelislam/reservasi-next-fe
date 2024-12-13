'use client'

import InfoCard from '@/components/InfoCard'
import api from '@/lib/api'
import { Icon } from '@iconify/react'
import { Skeleton } from '@nextui-org/skeleton'
import React from 'react'
import { toast } from 'react-toastify'

const InfoSection = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [infos, setInfos] = React.useState([])

  const getAllInfo = async () => {
    setIsLoading(true)
    try { 
      const res = await api.get('/infos')
      setInfos(res.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error('Terjadi kesalahan')
    }
  }

  React.useEffect(() => {
    getAllInfo()
  }, [])

  return (
    <section className="bg-[#F4F7FE]">
      <div className="container mx-auto py-24">
        <div className="flex flex-wrap gap-4 items-center mb-12">
          <div className="bg-primary rounded-full w-12 h-12 flex justify-center items-center">
            <Icon icon="solar:document-bold-duotone" className="w-7 h-7 text-white " />
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Informasi Buat kamu </p>
            <p className="text-sm text-gray-400">informasi buat bantu kamu saat liburan </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {
            
            isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div className="space-y-5 p-4 bg-white rounded-lg">
                  <Skeleton className="rounded-lg">
                    <div className="h-36 rounded-lg bg-default-300" />
                  </Skeleton>
                  <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                    </Skeleton>
                  </div>
                </div>
              ))
            ) : (
              infos.length > 0 ? (
                infos.map((info, i) => (
                  <InfoCard key={i} info={info}/>
                ))
              ): (
                <div className="">
                  <p>Tidak ada info</p>
                </div>
              )
            )
          }
          {/* <InfoCard key={i} /> */}
        </div>

      </div>
    </section>
  )
}

export default InfoSection