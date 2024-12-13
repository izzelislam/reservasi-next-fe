'use client'

import SIdebarDashboard from '@/components/sidebar-dashboard'
import api from '@/lib/api'
import { AuthContex } from '@/provides/auth-provider'
import { Icon } from '@iconify/react'
import { Tab, Tabs } from '@nextui-org/tabs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, {useEffect } from 'react'
import toast from 'react-hot-toast'

const layout = ({children}:{children:React.ReactNode}) => {

  // const {authState}:any = useContext(AuthContex)
  // const {_auth, _is_auth}:any = authState

  const router = useRouter()

  const init = async () => {
    try {
      const res = await api.get('/customer/me')
    } catch (error) {
      router.push('/')
      toast.error('Silahkan login terlebih dahulu')
    }
  }

  useEffect(() => {
    init()
  }, [])

  const handleRoute = (param:any) => {
    switch (param) {
      case 'dashboard':
        router.push('/dashboard/beranda')
        break;

      case 'booking':
        router.push('/dashboard/booking')
        break;
      
      case 'profile':
        router.push('/dashboard/profile')
        break;
    
      default:
        break;
    }
  }

  return (
    <>
      <div className='bg-gray-100 py-6 min-h-screen'>
        <div className='container m-auto'>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="hidden md:block md:w-2/12 md:h-[400px] bg-white rounded-lg p-8">
              <SIdebarDashboard/>
            </div>
            <div className="md:w-10/12">
              
              {children}
              {/* <Ticket v-for="i in 5" :key="i" /> */}

            </div>
            <div className="flex md:hidden w-full flex-col fixed bottom-10 z-30">
              <Tabs aria-label="Options" color="primary" onSelectionChange={(val => handleRoute(val))}>
                <Tab
                  key="dashboard"
                  onClick={() => router.push('/dashboard')}
                  title={
                      <div className="flex items-center space-x-2">
                        <Icon icon="solar:home-angle-bold-duotone" fontSize={30} />
                        <span>Dashboard</span>
                      </div>
                  }
                />
                <Tab
                  key="booking"
                  onClick={() => router.push('/dashboard/booking')}
                  title={
                      <div className="flex items-center space-x-2">
                        <Icon icon="solar:box-bold-duotone" fontSize={30} />
                        <span>Booking</span>
                      </div>
                  }
                />
                <Tab
                  key="profile"
                  onClick={() => router.push('/dashboard/profile')}
                  title={
                      <div className="flex items-center space-x-2">
                        <Icon icon="solar:users-group-rounded-bold-duotone" fontSize={30} />
                        <span>Profile</span>
                      </div>
                  }
                />
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default layout