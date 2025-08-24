import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import NewsLetters from '../components/NewsLetters'

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedSection/>
      <Banner />
      <Testimonial />
      <NewsLetters />
    </div>
  )
}

export default Home
