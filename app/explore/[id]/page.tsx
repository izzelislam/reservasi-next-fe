'use client'
import api from '@/lib/api'
import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/button'
import { Skeleton } from '@nextui-org/skeleton'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import FsLightbox from "fslightbox-react";
import LoadingState from '@/components/loading-state'
import NumberToIdr from '@/lib/currency'
import { DateIdparser } from '@/lib/date-formatter'
import { useAuthStore } from '@/store/use-auth-store'
import { AuthContex } from '@/provides/auth-provider'
import toast from 'react-hot-toast'

const icons = {
  'kamar' : 'solar:bed-bold-duotone',
  'kamar-mandi' : 'solar:bath-bold-duotone',
  'tv' : 'solar:tv-bold-duotone',
  'wifi' : 'solar:home-wifi-bold-duotone'
}

const ExplodeDetailPage = () => {
  const {id} = useParams()
  const router = useRouter()
  const query  = useSearchParams()
  const {isLogin, user}:any = useAuthStore()
 
  const {authState}:any = useContext(AuthContex)
  const {_auth, _is_auth}:any = authState

  const [isLoading, setIsLoading] = React.useState(true)
  const [room, setRoom] = React.useState<any>({})
  const [selectedImage, setSelectedImage] = React.useState('/assets/img/room.png')
  const [toggler, setToggler] = useState(false);
  const [gallery, setGallery] = useState<any>([]);

  const [selectStartDate, setSelectStartDate] = useState<any>(query.get('start_date'));
  const [selectEndDate, setSelectedDate] = useState<any>(query.get('end_date'));
  
  console.log(id);

  React.useEffect(() => {
    handleDetailRoom()
  }, [id])

  const handleDetailRoom = async () => {
    try {
      setIsLoading(true)
      const res = await api.get(`/rooms/${id}`)
      setRoom(res.data)
      setSelectedImage(res.data?.room_galeries[0]?.image_url)
      console.log(res.data?.room_galeries.map((item:any) => item.image_url))
      setGallery(res.data?.room_galeries.map((item:any) => {
        return <Image src={item.image_url} alt="image" width={700} height={500} /> 
      }))
      setIsLoading(false)
    } catch (error) {
      toast.error('Terjadi kesalahan')
      setIsLoading(false)
      router.push('/')
    }
  }

  const handleBooking = () => {
    if (!isLogin || Object.keys(user).length === 0 ) {
      toast.error('Silahkan login terlebih dahulu')
    }else{
      router.push(`/checkout/${id}?start_date=${selectStartDate}&end_date=${selectEndDate}`)
    }
  }
  

  return (
    <div>
      
      <section className="mb-4">
        <div className='container m-auto'>
          <div className="py-6 flex flex-col md:flex-row gap-8">
            <div className="w-12/12 md:w-11/12 h-[350px]">
              {
                isLoading ?
                (
                  <Skeleton className="w-full h-full" />
                )
                : ( <Image onClick={() => setToggler(true)} width={1000} height={700} quality={100} alt='' src={selectedImage} className="w-full h-full object-cover object-center rounded-lg" />)
              }
            </div>
            <div className="md:h-[350px] flex flex-row md:flex-col gap-4 overflow-auto">
              {
                isLoading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton className="w-36 h-36" />
                  ))
                )
                : (
                  room?.room_galeries && room?.room_galeries?.map((item:any, index:number) => {
                    return (
                      <div key={index} onClick={() => setSelectedImage(item.image_url)}>
                        <Image width={100} height={100} alt='' src={item.image_url} className="w-36 h-24 object-cover object-center rounded-lg cursor-pointer" />
                      </div>
                    )
                  })
                )
              }
            </div>
          </div>
        </div>
      </section>


      <section>
        <div className='container m-auto'>
          <div className="flex flex-col md:flex-row gap-4 md:justify-between border-b border-gray-300 pb-6">
            <div>
              <h2 className="text-gray-600 font-semibold text-xl mb-3">{room?.name}</h2>
              <div className="bg-red-100 p-4 rounded-lg flex gap-3">
                <div>
                  <Icon icon="solar:box-bold-duotone" className="w-8 h-8 text-primary" />
                </div>
                {
                  selectStartDate && selectEndDate ? (
                    <div>
                      <p className="text-gray-700 mb-1">Tanggal yang anda pilih tersedia</p>
                      <p className="text-gray-600 text-sm font-semibold">{DateIdparser(selectStartDate)} -  {DateIdparser(selectEndDate)} </p>
                    </div>
                  ) : (
                    <div className='flex flex-col justify-center'>
                      <p className='text-gray-600'>Anda belum memilih tanggal</p>
                      <Link href={"/"}>
                        <p className='text-gray-700 text-sm font-semibold'><i>pilih tanggal dulu</i></p>
                      </Link>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="hidden md:flex gap-2 flex-col items-end">
              <p className="text-sm font-semibold text-gray-700">Harga / Kamar /Malam</p>
              <div className="flex items-center gap-3">
               <p className="text-primary font-semibold text-xl">{NumberToIdr(room?.price)}</p>
              </div>
                <Button onClick={() => handleBooking()}  isDisabled={!selectEndDate && !selectStartDate} color='primary' className="text-center" startContent={<Icon icon="solar:box-bold-duotone" fontSize={20} />} size="md">Booking Sekarang</Button>
                {/* <Link href="/checkout">
                </Link> */}
            </div>
          </div>

          <div className="py-6 border-b border-gray-300">
            <h2 className="text-gray-600 font-semibold text-xl mb-4">Fasilitas</h2>
            <div className="flex flex-wrap gap-4">
              {
                room?.facilities && room?.facilities.map((item:any, index:any) => (
                  <div className="flex items-center gap-3">
                    <Icon icon={item.icon} className="w-8 h-8 text-gray-500" />
                    <p className="text-sm font-semibold text-gray-500">{item.name}</p>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="py-6 border-b border-gray-300">
            <h2 className="text-gray-600 font-semibold text-xl mb-4">Informasi</h2>
            <div className="text-gray-600 leading-6"
              dangerouslySetInnerHTML={{__html: room?.description}}
            >
              {/* {room?.description} */}
            </div>
          </div>

          <div className="py-6 border-b border-gray-300">
            <h2 className="text-gray-600 font-semibold text-xl mb-4">Kebijakan</h2>
            <div className="text-gray-600 leading-6"
              dangerouslySetInnerHTML={{__html: room?.info}}
            >
            </div>
          </div>
        </div>
      </section>

      {/* <!-- floating section on mobile --> */}
      <div className="fixed bottom-0 left-0 right-0 z-10 block md:hidden p-4 drop-shadow-[0_0px_22px_rgba(0,0,0,0.50)] bg-white rounded-t-lg">
        <div className="flex justify-between mb-4">
          <div className="w-1/2">
            <h2 className="text-burem-500 text-sm font-semibold">Kamar double bed fasilitas  lengkap</h2>
          </div>
          <div className="flex gap-2 flex-col items-end">
            <p className="text-xs font-semibold text-burem-500">Harga / Kamar /Malam</p>
            <p className="text-abang-500 font-semibold text-lg">RP 600.000.00</p>
          </div>
        </div>
        <Button className="text-center" color='primary' size="lg" fullWidth startContent={<Icon icon="solar:box-minimalistic-bold-duotone"/>}>Booking Sekarang</Button>
      </div>
      {/* <!-- end floating section on mobile --> */}
      
      <FsLightbox
        onClose={() => setToggler(false)}
				toggler={toggler}
				sources={gallery}
			/>

      <LoadingState isLoading={isLoading}/>

    </div>
  )
}

export default ExplodeDetailPage