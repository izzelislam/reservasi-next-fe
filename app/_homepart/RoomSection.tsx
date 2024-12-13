'use client'

import ProductCard from '@/components/ProductCard'
import api from '@/lib/api'
import { Icon } from '@iconify/react'
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

const RoomSection = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [rooms, setRooms] = React.useState([])

  useEffect(() => {
    getAllRoom()
  }, [])

  const getAllRoom = async () => {
    setIsLoading(true)
    try { 
      const res = await api.get('/rooms')
      setRooms(res.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error('Terjadi kesalahan')
    }
  }

  return (
  <section className="bg-[#F4F7FE]">
      <div className="container m-auto py-24">
        <div className="flex flex-wrap gap-4 items-center mb-12">
          <div className="bg-primary rounded-full w-12 h-12 flex justify-center items-center">
            <Icon icon="solar:bed-bold-duotone" className="w-7 h-7 text-white " />
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Tidur nyenyak di  sini </p>
            <p className="text-sm text-gray-400">Wujudin staycation impianmu di vila dan penginapan dengan view terbaik.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {
            
            isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
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
              rooms.length > 0 ? (
                rooms.map((room, i) => (
                  <ProductCard key={i} room={room} />
                ))
              ): (
                <div className="">
                  <p>Tidak kamar</p>
                </div>
              )
            )
            // <ProductCard key={i} />
          }
        </div>

      </div>
    </section>
  )
}

export default RoomSection