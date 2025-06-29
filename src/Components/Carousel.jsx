import React, { useContext, useEffect } from 'react'
import { DataContext} from '../Context/DataContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Category from './Catergory';

const Carousel = () => {
    const {data, fetchAllProducts} = useContext(DataContext)
   console.log(data);
   useEffect(()=>{

    fetchAllProducts()
   },[])

       
     const SamplePrevArrow = (props) => {
        const {className, style, onClick} = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} style={{zIndex:3}}>
                <AiOutlineArrowLeft className='arrows' style={{...style, display: "block", borderRadius:"50px", background:"#f53347" , color:"white" , position:"absolute", padding:"2px", left:"50px"}} />
            </div>
        )
    }
    const SampleNextArrow = (props) => {
        const {className, style, onClick} = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`}>
                <AiOutlineArrowRight className='arrows' style={{...style, display: "block", borderRadius:"50px", background:"#f53347" , color:"white" , position:"absolute", padding:"2px", right:"50px"}} />
            </div>
        )
    }

     var settings = {
    dots: false,
    autoplay:true,
    autoplayspeed:2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    pauseOnHover:false,
    slidesToScroll: 1,
    nextArrow:<SampleNextArrow to="next"/>,
    prevArrow:<SamplePrevArrow to="prev"/>,
  };
  
  return (
    <div className='overflow-x-hidden'>
         <Slider {...settings}>
            {
                data?.slice(0,7)?.map((item,index)=>{
                    return <div key={index} className='bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10'>
<div className='flex flex-col md:flex-row gap-10 justify-center h-[600px] my-20 md:my-0 items-center px-4'>
<div className='space-y-6'>
   <h3 className='text-red-500 font-semibold font-sans text-sm'>Powering Your World with the Best in Electronics</h3>
   <h1 className='text-xl md:text-4xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-white'>{item.title}</h1>
   <p className='md:w-[500px] line-clamp-3 text-gray-400 pr-7'>{item.description}</p>
  <button className='bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2'>Shop Now</button>
</div>
<div>
     <img src={item.image} alt={item.title} className='rounded-full w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-400'/>
</div>
</div>
                    </div>
                })
            }
     
    </Slider>
    <Category/>
    </div>
  )
}


export default Carousel