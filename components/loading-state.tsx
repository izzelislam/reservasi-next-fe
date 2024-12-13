import { Icon } from '@iconify/react'
import React from 'react'

const LoadingState = ({isLoading}: {isLoading:boolean}) => {
  return (
    <>
      {
        isLoading &&
        <div className='fixed bottom-0 right-0 top-0 left-0 z-30 bg-gray-900/50 flex justify-center items-center'>
            <div className='bg-white p-4 rounded-lg flex flex-col gap-4 items-center justify-center'>
                <Icon icon="svg-spinners:180-ring-with-bg" fontSize={40} color='#006FEE'/>
                <p className='text-gray-700 text-sm text-center'>
                  sabar ya
                </p>
            </div>
        </div>
      }
    </>
  )
}

export default LoadingState