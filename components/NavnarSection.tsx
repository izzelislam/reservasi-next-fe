'use client'

import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter } from "@nextui-org/modal";
import { Input } from '@nextui-org/input'
import { Checkbox } from '@nextui-org/checkbox'
import {Link as LinkUi} from '@nextui-org/link'
import { Avatar } from '@nextui-org/avatar'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { useAuthStore } from '@/store/use-auth-store'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { objectToText } from '@/lib/object-to-text'
import Cookies from 'js-cookie'

const NavnarSection = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isOpenRegister, setIsOpenRegister] = React.useState(false);
  const [isLogOutModal, setIsLogOutModal] = React.useState(false);
  const [isOpenMenuMobile, setIsOpenMenuMobile] = React.useState(false);

  const {isLogin, user, setUser, setIsLogin}:any = useAuthStore()

  const [emailLogin, setEmailLogin] = React.useState("085158768844")
  const [passwordLogin, setPasswordLogin] = React.useState("")
  const [isLoadingLogin, setIsLoadingLogin] = React.useState<boolean>(false)

  const [nameReister, setNameReister] = React.useState("")
  const [emailRegister, setEmailRegister] = React.useState("")
  const [phoneRegister, setPhoneRegister] = React.useState("")
  const [passwordRegister, setPasswordRegister] = React.useState("")
  const [isLoadingRegister, setIsLoadingRegister] = React.useState<boolean>(false)

  const [isLoadingLogOut, setIsLoadingLogOut] = React.useState<boolean>(false)

  const handleLogin = async () => {
    if (!emailLogin || !passwordLogin ){
      toast.error('No telepon/email dan password wajib diisi')
      return
    }
    setIsLoadingLogin(true)
    try {
      
      api.defaults.headers.common["X-XSRF-TOKEN"] = Cookies.get('XSRF-TOKEN')

      const res = await api.post('/login', {
        email: emailLogin,
        password: passwordLogin
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
      
      setIsLogin(true)
      setUser(res.data.user)
      
      Cookies.set('_auth', res.data.token)
      Cookies.set('_is_auth', 'true')
      
      // set header api
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`


      setIsOpenModal(false)
      setIsLoadingLogin(false)
      toast.success('Login Berhasil')
    } catch (error:any) {
      setIsLoadingLogin(false)
      toast.error(objectToText(error?.data?.message))
    }
  }

  const handleRegister = async () => {
    if (!nameReister || !emailRegister || !phoneRegister || !passwordRegister ){
      toast.error('No telepon/email dan password wajib diisi')
      return
    }
    setIsLoadingRegister(true)
    try {
      const res = await api.post('/register', {
        name: nameReister,
        email: emailRegister,
        phone: phoneRegister,
        password: passwordRegister
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })

      const token  = res.data.token
      Cookies.set('_auth', token)
      Cookies.set('_is_auth', 'true')
      
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      const user = await api.get('/customer/me')
      setIsLogin(true)
      setUser(user.data)

      setIsOpenRegister(false)
      setIsLoadingRegister(false)
      toast.success('Register Berhasil')
    } catch (error:any) {
      setIsLoadingRegister(false)
      toast.error(objectToText(error?.data?.message))
    }
  }

  const handleLogout = async () => {
    setIsLoadingLogOut(true)
    try {
      await api.post('/logout')
      Cookies.remove('_auth')
      Cookies.remove('_is_auth')
      setIsLogin(false)
      setUser({})
      setIsLogOutModal(false)
      toast.success('Logout Berhasil')
    } catch (error:any) {
      toast.error(objectToText(error?.data?.message))
    }
    setIsLoadingLogOut(false)
  }


  return (
    <>
      {/* navbar menu */}
      <nav className="py-6 sticky top-0 bg-white z-20">
        <div className="container m-auto flex flex-row justify-between md:items-center">
          <div>
            <Image alt="" src="/assets/img/logo.png" width={150} height={60} />
          </div>
          <div className="hidden md:flex">
            <ul className="flex gap-6">
              <Link href="/">
                <li className=" font-semibold text-gray-600 flex gap-1 items-center cursor-pointer">
                    <Icon icon="solar:home-smile-bold-duotone" className="w-6 h-6 text-gray-400" />
                    <p>Home</p>
                </li>
              </Link>
              <Link href="/explore">
                <li className=" font-semibold text-gray-600 flex gap-1 items-center cursor-pointer">
                    <Icon icon="solar:compass-bold-duotone" className="w-6 h-6 text-gray-400" />
                    <p>Explore</p>
                </li>
              </Link>
              <Link href="/cek-pesanan">
                <li className=" font-semibold text-gray-600 flex gap-1 items-center cursor-pointer">
                    <Icon icon="solar:compass-bold-duotone" className="w-6 h-6 text-gray-400" />
                    <p>Cek Pesanan Anda</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className="hidden md:flex">
              {
                !isLogin && Object.keys(user).length === 0 ? (
                  <div className='flex gap-3 items-center'>
                    <Button onClick={() => setIsOpenRegister(true)} color="primary" variant="bordered" startContent={<Icon icon="solar:lock-keyhole-unlocked-bold-duotone"/>}>
                      Daftar
                    </Button>
                    <Button onClick={() => setIsOpenModal(true)} color="primary" startContent={<Icon icon="solar:login-2-bold-duotone"/>}>
                      Masuk
                    </Button>
                  </div>
                ) : (
                  <Dropdown>
                    <DropdownTrigger>
                      <div className='flex gap-2 items-center cursor-pointer'>
                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                      <p className='text-sm font-semibold text-gray-600'>{user?.name}</p>
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="new">
                        <Link href={'/dashboard/beranda'}>Dashboard</Link>
                      </DropdownItem>
                      <DropdownItem key="copy">
                        <Link href={'/dashboard/booking'}>
                          Booing
                        </Link>
                      </DropdownItem>
                      <DropdownItem key="edit">
                        <Link href={'/dashboard/profile'}>
                          Profile
                        </Link>
                      </DropdownItem>
                      <DropdownItem onClick={() => setIsLogOutModal(true)} key="delete" className="text-danger" color="danger">
                        Keluar
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )
              }
          </div>
          <div className="md:hidden">
            {
              !isOpenMenuMobile && (
                <Icon onClick={() => setIsOpenMenuMobile(true)}  icon="hugeicons:menu-01" className="w-7 h-7 text-gray-800 md:hidden cursor-pointer"/>
              )
            }
            {
              isOpenMenuMobile && (
                <Icon onClick={() => setIsOpenMenuMobile(false)}  icon="hugeicons:cancel-01" className="w-7 h-7 text-gray-800 md:hidden cursor-pointer"/>
              )
            }
          </div>
        </div>
      </nav>
      {/* end navbar menu */}


      {/* model login */}
      <Modal isOpen={isOpenModal} onOpenChange={setIsOpenModal} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Mausk akun anda</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <Icon icon="solar:user-bold-duotone" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email Aut No Whatsapp"
                  placeholder="Masukan email ata No Whatsapp"
                  variant="bordered"
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                />
                <Input
                  endContent={
                    <Icon icon="solar:lock-keyhole-unlocked-bold-duotone" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Masukan password"
                  type="password"
                  variant="bordered"
                  value={passwordLogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Ingat saya
                  </Checkbox>
                  <LinkUi color="primary" href="#" size="sm">
                    Lupa password?
                  </LinkUi>
                </div>
                <div className='my-3 text-sm text-gray-500'>
                  <span>
                      Belum punya akun? 
                      <span onClick={() => {
                        setIsOpenModal(false)
                        setIsOpenRegister(true)
                      }} className='font-bold text-primary hover:cursor-pointer ml-2'>
                        Daftar disini
                      </span>
                  </span>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="bordered" onPress={onClose}>
                  Tutup
                </Button>
                <Button disabled={isLoadingLogin} isLoading={isLoadingLogin} onPress={() => handleLogin()} color="primary">
                  Masuk
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* end model login */}

      {/* model logout */}
      <Modal isOpen={isLogOutModal} onOpenChange={setIsLogOutModal} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">keluar akun anda</ModalHeader>
              <ModalBody>
                <div>
                  <p className='text-gray-600'>Apakah anda yakin keluar akun anda ?</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button disabled={isLoadingLogOut} color="primary" variant="bordered" onPress={onClose}>
                  Tutup
                </Button>
                <Button isLoading={isLoadingLogOut} color="primary" onPress={() => handleLogout()}>
                  Keluar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* end model logout */}

      {/* model register */}
      <Modal isOpen={isOpenRegister} onOpenChange={setIsOpenRegister} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Daftar akun anda</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <Icon icon="solar:user-bold-duotone" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Nama Penguna"
                  placeholder="nama pengguna"
                  variant="bordered"
                  value={nameReister}
                  onChange={(e) => setNameReister(e.target.value)}
                />
                <Input
                  autoFocus
                  endContent={
                    <Icon icon="solar:mailbox-bold-duotone" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email "
                  placeholder="Email"
                  variant="bordered"
                  value={emailRegister}
                  onChange={(e) => setEmailRegister(e.target.value)}
                />
                <Input
                  autoFocus
                  endContent={
                    <Icon icon="solar:phone-bold-duotone" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="No Whatsapp (aktif)"
                  placeholder="Nomor Whatsapp"
                  variant="bordered"
                  value={phoneRegister}
                  onChange={(e) => setPhoneRegister(e.target.value)}
                />
                <Input
                  endContent={
                    <Icon icon="solar:lock-keyhole-unlocked-bold-duotone" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="password"
                  type="password"
                  variant="bordered"
                  value={passwordRegister}
                  onChange={(e) => setPasswordRegister(e.target.value)}
                />
                <div className='my-3 text-sm text-gray-500'>
                  <span>
                      Sudah punya akun? 
                      <span onClick={() => {
                        setIsOpenModal(true)
                        setIsOpenRegister(false)
                      }} className='font-bold text-primary hover:cursor-pointer ml-2'>
                        Masuk disini
                      </span>
                  </span>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button disabled={isLoadingRegister} color="primary" variant="bordered" onPress={onClose}>
                  Tutup
                </Button>
                <Button isLoading={isLoadingRegister} color="primary" onPress={() => handleRegister()}>
                  Daftar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* end model register */}

    </>
  )
}

export default NavnarSection