import React from 'react'
import About from '../About'
import DonateBook from '../DonateBook'
import RentABook from '../First/RentABook'
import Blog from '../Blog'

function Home() {
  return (
    <div>
    <About />
    <RentABook />
    <DonateBook />
    <Blog />
    </div>
  )
}

export default Home