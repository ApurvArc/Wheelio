import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import NewsLetters from '../components/NewsLetters'

const Home = () => {
  return (
    // SYNC: Added a wrapper div with dark mode background and text colors.
    <div className='bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 transition-colors duration-300'>
      <Hero />
      <FeaturedSection/>
      <Banner />
      <Testimonial />
      <NewsLetters />
    </div>
  )
}

export default Home