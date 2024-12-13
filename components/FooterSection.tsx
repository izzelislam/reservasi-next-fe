'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react'

const FooterSection = () => {

  const router = usePathname();

  const isDashboardRoute = router.startsWith('/dashboard');

  return (
    <>
      {
        !isDashboardRoute && (
          <footer>
            <div className="container m-auto">
              <div className="py-12 gap-12 grid grid-cols-1 md:grid-cols-5">
                <div>
                  <Image alt="" src="/assets/img/logo.png" height={100} width={150} />
                  <div>
                    <p className="text-gray-500 text-sm my-3">Jl. Raya Cempaka No. 11, Cempaka Putih, Kaliangkrik Magelang jawatenggah </p>
                    <p className="text-gray-500 text-sm my-3">Copyright @ 2024. All rights reserved.</p>
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-600">Sosial Media</h2>
                  <ul>
                    <li className="text-gray-500 text-sm my-3 cursor-pointer">Facebook</li>
                    <li className="text-gray-500 text-sm my-3 cursor-pointer">Instagram</li>
                    <li className="text-gray-500 text-sm my-3 cursor-pointer">Tiktok</li>
                  </ul>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-600">Pintasan Menu</h2>
                  <ul>
                    <li className="text-gray-500 text-sm my-3 cursor-pointer">Home</li>
                    <li className="text-gray-500 text-sm my-3 cursor-pointer">Explore</li>
                    <li className="text-gray-500 text-sm my-3 cursor-pointer">Cek Pesanan Anda</li>
                    <li className="text-gray-500 text-sm my-3 cursor-pointer">Daftar</li>
                    <li className="text-gray-500 text-sm my-3 cursor-pointer">Masuk</li>
                  </ul>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-600">Support</h2>
                  <ul>
                    <li className="text-gray-500 text-sm my-3 cursor-pointer">Kontak Kami</li>
                    <li className="text-gray-500 text-sm my-3 cursor-pointer">Bantuan</li>
                    <li className="text-gray-500 text-sm my-3 cursor-pointer">FAQ</li>
                    <li className="text-gray-500 text-sm my-3 cursor-pointer">Cara Pemesanan</li>

                  </ul>
                </div>
                <div>
                  <h2 className="mb-3 font-semibold text-gray-600">Download</h2>
                  <Link href="#">
                    <Image alt="" src="/assets/img/gplay.png" width={120} height={100} />
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        )
      }
    </>
  )
}

export default FooterSection