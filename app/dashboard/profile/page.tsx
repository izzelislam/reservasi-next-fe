'use client'


import api from '@/lib/api'
import { DateIdparser } from '@/lib/date-formatter'
import { useAuthStore } from '@/store/use-auth-store'
import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import React from 'react'

const ProfilePageDS = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const {user}:any = useAuthStore()
  
  const [name, setName] = React.useState(user?.name);
  const [email, setEmail] = React.useState(user?.email);
  const [phone, setPhone] = React.useState(user?.phone);
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
    } catch (error) {
    }
    setLoading(false);
  };



  return (
    <div className='bg-white rounded-lg p-6'>
      <div className='mb-4'>
        Profile
      </div>
      <div className='w-full md:w-1/2'>
        <div className='flex justify-between gap-10 mb-3'>
          <div className='text-gray-500'>Nama pengguna</div>
          <div className='text-gray-600'>{user?.name}</div>
        </div>
        <div className='flex justify-between gap-10 mb-3'>
          <div className='text-gray-500'>Email</div>
          <div className='text-gray-600'>{user?.email}</div>
        </div>
        <div className='flex justify-between gap-10 mb-3'>
          <div className='text-gray-500'>No Whatsapp</div>
          <div className='text-gray-600'>{user?.phone}</div>
        </div>
        <div className='flex justify-between gap-10 mb-3'>
          <div className='text-gray-500'>Taggal bergabung</div>
          <div className='text-gray-600'>{DateIdparser(user?.created_at)}</div>
        </div>
        <div>
            {/* <Button onClick={() => setIsOpenModal(true)} color='primary'>Ubah informasi anda</Button>  */}
        </div>
      </div>

      {/* model register */}
      <Modal isOpen={isOpenModal} onOpenChange={setIsOpenModal} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ubah informasi anda</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <Icon icon="solar:user-bold-duotone" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Nama Penguna"
                  placeholder="nama pengguna"
                  variant="bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  autoFocus
                  endContent={
                    <Icon icon="solar:mailbox-bold-duotone" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email "
                  placeholder="Email"
                  variant="bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  autoFocus
                  endContent={
                    <Icon icon="solar:phone-bold-duotone" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="No Whatsapp (aktif)"
                  placeholder="Nomor Whatsapp"
                  variant="bordered"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  endContent={
                    <Icon icon="solar:lock-keyhole-unlocked-bold-duotone" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="password"
                  type="password"
                  variant="bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
       
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="bordered" onPress={onClose}>
                  Tutup
                </Button>
                <Button color="primary" onPress={onClose}>
                  Simpan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* end model register */}
    </div>
  )
}

export default ProfilePageDS