'use client'

import React from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

const ToastProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        stacked
      />
    </>
  )
}

export default ToastProvider