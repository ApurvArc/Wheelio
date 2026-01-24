import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'
import { motion } from 'motion/react'

const Testimonial = () => {
  const testimonials = [
    {
      name: "Sushil Choudhary",
      address: "Kota, Rajasthan",
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial: "I've rented luxury vehicles from various companies, but the experience with Wheelio was exceptional. The process was seamless."
    },
    {
      name: "Tejaswi Sinha", 
      address: "Ranchi, Jharkhand", 
      image: assets.testimonial_image_2, 
      rating: 5, 
      testimonial: "The vehicle was in excellent condition and the service was top-notch. Finding a high-end car for my business trip was never easier." 
    },
    { 
      name: "Abhishek Kumar", 
      address: "Jamshedpur, Jharkhand", 
      image: assets.testimonial_image_3, 
      rating: 5, 
      testimonial: "The service was excellent and the vehicle was in pristine condition. I couldn't have asked for a better experience for my vacation!" 
    }
  ]

  return (
    <div className='py-28 px-6 md:px-16 lg:px-24 xl:px-44'>
      <Title 
        title="What Our Customers Say" 
        subTitle="Discover why discerning travelers choose Wheelio for their luxury vehicle rentals around the world." 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{opacity: 0, y: 40}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: index*0.2, ease: 'easeOut'}}
            viewport={{once: true, amount: 0.3}}
            key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
            <div
             className="flex items-center gap-3">
              <img className="w-12 h-12 rounded-full object-cover" src={testimonial.image} alt={testimonial.name} />
              <div>
                <p className="text-xl font-medium">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-4">
              {Array.from({ length: testimonial.rating }, (_, i) => (
                <img key={i} src={assets.star_icon} alt="star" className="w-4 h-4" />
              ))}
            </div>

            <p className="text-gray-500 mt-4 font-light italic">"{testimonial.testimonial}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial