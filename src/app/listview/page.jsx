import Navbar from '../../components/Header/Navbar'
import ListView from '../../components/Home/ListView'
import Footer from '../../components/Footer/Footer'
import React from 'react'

export default function page() {
  return (
    <>
   <div className=" ">
        <Navbar />
        <div className="mt-[65px] mb-10">
          <ListView/>
        </div>
          <Footer />
      </div>

    </>
  )
}
