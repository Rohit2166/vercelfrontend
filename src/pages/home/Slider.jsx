import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';




const Home = () => {
  return (
    <div className="bg-gray-900 text-white h-full w-full">
        <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/image-wm.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/pickelball.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/badminton.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/basketball.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/tennis.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image-wm.png" />
        </SwiperSlide>
       
      </Swiper>
      


    </div>
  )
}

export default Home

