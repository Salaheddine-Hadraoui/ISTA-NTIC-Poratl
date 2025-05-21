import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'

export default function Entrer() {
  return (
    <div className="min-h-screen flex flex-col  items-center  justify-stretch">
        <Navigation />
      {/* Main Container */}
      <section className='flex items-center justify-center px-12 pb-20 md:w-full relative'>
        <Outlet />
      </section>
    </div>
  )
}
