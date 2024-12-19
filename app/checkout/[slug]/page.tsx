'use client'

import LoadingState from '@/components/loading-state'
import api from '@/lib/api'
import NumberToIdr from '@/lib/currency'
import { DateIdparser, DatePayload } from '@/lib/date-formatter'
import { objectToText } from '@/lib/object-to-text'
import { AuthContex } from '@/provides/auth-provider'
import { useAuthStore } from '@/store/use-auth-store'
import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/button'
import Image from 'next/image'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Select from 'react-select';

const CheckoutPage = () => {

  const param = useParams()
  const query = useSearchParams()
  const {slug} = param

  const {authState}:any = useContext(AuthContex)
  const {_auth, _is_auth}:any = authState

  const {isLogin, user}:any = useAuthStore()
  const router = useRouter()

  const start = query.get('start_date')
  const end   = query.get('end_date')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [room, setRoom]           = useState<any>({})   
  const [img, setImg]             = useState<string>('/assets/img/room.png')
  const [loadingCo, setLoadingCo]  =  useState<boolean>(false)
  const [paymentMethod, setPaymentMethod] = useState<any>({
    value: "cash",
    label: "Cash"
  })
 
  useEffect(() => {
    handleCheckAva()
    handleDetailRoom()
  }, [slug])

  const handleCheckAva = async () => {
    try {
      const payload = {
        'slug' : slug,
        'start_booking' : DatePayload(start),
        'end_booking' : DatePayload(end)
      }

      const res = await api.post('/room-check-ava', payload)
      if (!res.status){
        toast.error(res.data.message)
        router.back()
      }

      console.log(payload)
    } catch (error:any) {
      router.back()
      toast.error(objectToText(error?.data?.message))
    }
  }

  const handleDetailRoom = async () => {
    try {
      setIsLoading(true)
      const res = await api.get(`/rooms/${slug}`)
      setRoom(res.data)
      setImg(res.data?.room_galeries[0]?.image_url)
      setIsLoading(false)
    } catch (error) {
      toast.error('Terjadi kesalahan')
      setIsLoading(false)
    }
  }

  const getDiff = (start: any, end: any) => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
  }

  const handleCheckout = async () => {
    if (!isLogin || !Object.keys(user).length  || !_auth || !_is_auth) {
      toast.error('Silahkan login terlebih dahulu')
      return
    }

    if (!Object.keys(room).length || !start || !end) {
      toast.error('Terjadi kesalahan')
      return
    }

    if (!Object.keys(paymentMethod).length){
      toast.error('harus memilih metode pembayaran')
      return
    }

    setLoadingCo(true)
    try {

      const payload = {
        'room_id' : room?.id,
        'start_booking' : DatePayload(start),
        'end_booking'   : DatePayload(end),
        'payment_method' : paymentMethod.value
      }

      console.log(payload)
      const res = await api.post('/customer/order', payload)
      setLoadingCo(false)
      toast.success("Berhasil membuat pesanan")
      router.replace('/success')
    } catch (error:any) {
      setLoadingCo(false)
      toast.error(objectToText(error?.data?.message))
    }
  }


  return (
    <div>
      <section className="bg-gray-100">
        <div className="container m-auto py-8">
          <div className="mb-6">
            <p className="text-burem-500 font-bold">Checkout</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-white p-6 rounded-lg flex flex-col md:flex-row gap-4 md:w-8/12">
              <Image height={300} width={300} alt="" src={img} className="md:w-32 md:h-32 object-cover object-center rounded-lg" />
              <div>
                <h2 className="text-gray-700 font-semibold">{room?.name}</h2>
                <p className="text-primary text-sm py-3">{DateIdparser(start!)} -  {DateIdparser(end!)} </p>
                
                <p className="text-sm font-semibold text-gray-500 mb-1">Harga / Kamar /Malam</p>
                <div className="flex items-center gap-3">
                  <p className="text-primary font-bold text-xl">{NumberToIdr(room?.price)}</p>
                  <p className="text-warning font-semibold">/ 1 malam</p>
                </div>
              </div>
            </div>

            <div className="hidden md:block md:w-4/12 bg-white p-6 rounded-lg">
              <div className="mb-4 pb-4 border-b border-gray-300">
                <p className="font-semibold text-lg text-gray-700">Total bayar</p>
              </div>
              <div className="pb-4 mb-3 border-b border-gray-300">
                <p className="text-gray-500 mb-1">{room?.name}</p>
                <p className="text-primary font-bold text-xl mb-2">{NumberToIdr(room?.price * getDiff(new Date(start!), new Date(end!)))}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm mb-2">Pilih metode pembayaran</p>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  name="payment_method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e)}
                  options={[
                    {
                      value: "cash",
                      label: "Cash"
                    },
                    {
                      value: "transfer",
                      label: "Transfer"
                    }
                  ]}
                />
              </div>
              <div>
                <Button isLoading={loadingCo} onClick={() => handleCheckout()} color="primary" className="mt-4"  size='lg' fullWidth endContent={<Icon icon="solar:card-bold-duotone"/>}>Buat Pesanan Sekarang</Button>
              </div>
            </div>
          </div>
        </div>

      </section>
      <LoadingState isLoading={isLoading} />
    </div>
  )
}

export default CheckoutPage