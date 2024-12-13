'use client'

import { Icon } from '@iconify/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const SuccessPage = () => {

  const navigator = useRouter()

  return (
    <div className='bg-gray-100'>
      <div className='container m-auto py-6'>
        <div className='w-full md:w-1/3 mx-auto bg-white rounded-xl shadow-md p-4'>
          <div>
            <div className='text-center mb-4'>
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src={"/assets/lottie/success.json"}
                style={{ height: '200px', width: '200px' }}
              ></Player>
            </div>
            <p className='text-center text-gray-600 font-semibold mb-2'>Hore kamu Berhasil Melakukan pemesanan</p>
            <p className='text-center text-gray-600 text-sm mb-4'>Kami akan segera menghubungi kamu untuk memperbarui status pemesanan</p>


            <p className='text-sm text-gray-600 mb-4'>
              untuk metode pebayaran transfer bisa melakukan pembayaran melalui transfer, untuk pembayaran cash kamu perlu melakukan pembayaran di awal sebesar Rp. 100.000, setelah itu konfirmasi  melalui whatsapp ya agar admin bisa konfirmasi pesannamu ☺️, Happy staycation 
            </p>

            <div className='mb-4'>
              <p className='text-sm text-gray-700 font-semibold mb-2'>Silahkan melakukan transfer ke rekening dibawah ini :</p>
              <p className='font-mono text-sm mb-1 text-gray-600'>128391273861 BRI a.n. Yogyakarta</p>
              <p className='font-mono text-sm mb-1 text-gray-600'>123123123123 BCA a.n. Yogyakarta</p>
              <p className='font-mono text-sm mb-4 text-gray-600'>123123123123 BNI a.n. Yogyakarta</p>
              <p className='text-sm text-gray-700 font-semibold mb-2'>Konfirmasi Pembayaran melalui nomor di bawah ini :</p>
              <p className='text-gray-600 mb-2 text-sm'>123123123123</p>
              <p className='text-gray-600 text-sm'>187263871263</p>
            </div>
          </div>

          <div>
              <Button onClick={() => navigator.push('/dashboard/beranda')} fullWidth color='primary' startContent={<Icon icon="solar:home-angle-bold-duotone" />}>ke halaman dashboard</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage