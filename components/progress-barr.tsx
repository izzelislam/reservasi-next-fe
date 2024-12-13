'use client'

import React from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressbarC = () => {
  return (
    <div>
      <ProgressBar
          height="4px"
          color="#006FEE"
          options={{ showSpinner: false }}
          shallowRouting
        />
    </div>
  )
}

export default ProgressbarC