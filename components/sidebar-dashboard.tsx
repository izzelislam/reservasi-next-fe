'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

const SIdebarDashboard = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/dashboard/beranda" className="flex items-center gap-2 mb-5">
            <Icon icon="solar:home-smile-bold-duotone" className="w-6 h-6 text-primary" />
            <p className="text-gray-500 text-sm">Dashboard</p>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/booking" className="flex items-center gap-2 mb-5">
            <Icon icon="solar:compass-bold-duotone" className="w-6 h-6 text-primary" />
            <p className="text-gray-500 text-sm">Booking</p>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/profile" className="flex items-center gap-2 mb-5">
            <Icon icon="solar:user-bold-duotone" className="w-6 h-6 text-primary" />
            <p className="text-gray-500 text-sm">Profile</p>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default SIdebarDashboard