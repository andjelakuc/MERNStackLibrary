import React from 'react'
import About from '../About'
import DonateBook from '../DonateBook'
import RentABook from '../RentABook'
import Blog from '../Blog'
import Footer from '../Footer'

function Home() {
  return (
    <>
    <div className='bg-third p-1'>
    <About />
    <RentABook />
    <DonateBook />
    <Blog />
    </div>
    <Footer />
    </>
  )
}

export default Home