import React from 'react'

const Container = ({children}:{children:React.ReactNode }) => {
  return (
    <>
      <div class="container mx-auto">{children}</div>
    </>
  )
}

export default Container