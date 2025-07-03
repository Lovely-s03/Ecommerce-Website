import { MapPin } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaCaretDown } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useCart } from '../Context/CartContext'
import { CgClose } from 'react-icons/cg'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from './ResponsiveMenu'
import { FaXmark } from 'react-icons/fa6'

const Navbar = ({location,getLocation,  openDropdown, setOpenDropdown}) => {
const {cartItem} =useCart();

const [openNav , setOpenNav] = useState(false)
      const toggleDropdown = ()=>{
        setOpenDropdown(!openDropdown)
    }
  return (
  <div className='bg-white py-3 shadow-2xl px-4 lg:px-0 sticky top-0 left-0 z-50 '>
 <div className='max-w-6xl mx-auto flex justify-between items-center'>
     <div className='flex gap-7 items-center'>
                    <Link to={'/'}><h1 className='font-bold text-3xl'><span className='text-red-500 font-serif'>M</span>ockify</h1></Link>
                    <div className='lg:flex gap-1 cursor-pointer text-gray-700 items-center hidden'>
                        <MapPin className='text-red-500' />
                        <span className='font-semibold '>{location ? <div className='-space-y-2'>
                            <p>{location.county}</p>
                            <p className='flex items-center'>{location.state}</p>
                        </div> : "Add Address"}</span>
                        <FaCaretDown onClick={toggleDropdown}/>
                    </div>
                    {
                        openDropdown ? <div className='w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md'>
                         <h1 className='font-semibold mb-4 text-xl flex justify-between'>Change Location <span onClick={toggleDropdown}><CgClose/></span></h1>
                         <button onClick={getLocation} className='bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400'>Detect my location</button>
                        </div> : null
                    }
                </div>
 <nav className='flex gap-7 items-center'>
      <ul className='lg:flex gap-7 items-center text-xl font-semibold hidden'>
     
  <NavLink
    to="/"
    className={({ isActive }) =>
      `cursor-pointer transition-all ${
        isActive ? 'border-b-4 border-red-500 ' : 'text-black'
      }`
    }
  >
    <li>Home</li>

  </NavLink>
 <NavLink to="/products"  className={({ isActive }) =>
      `cursor-pointer transition-all ${
        isActive ? 'border-b-4 border-red-500 ' : 'text-black'
      }`
    }> <li>Products</li></NavLink>
        <NavLink to="/about"  className={({ isActive }) =>
      `cursor-pointer transition-all ${
        isActive ? 'border-b-4 border-red-500 ' : 'text-black'
      }`
    }><li>About</li></NavLink>
      <NavLink to="/contact"  className={({ isActive }) =>
      `cursor-pointer transition-all ${
        isActive ? 'border-b-4 border-red-500 ' : 'text-black'
      }`
    }>  <li>Contact</li></NavLink>
      </ul>
      <Link to="/cart" className='relative'>
        <IoCartOutline className='h-7 w-7' />
         <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>
  {cartItem.length}
         </span>
        </Link>
 <div className='hidden lg:block'>
    
      <SignedOut>
        <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"/>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
  
    </div>
    {
      openNav ? <FaXmark className='h-7 w-7  lg:hidden' onClick={()=>setOpenNav(false)}/>:<HiMenuAlt1  className='h-7 w-7  lg:hidden' onClick={()=>setOpenNav(true)}/>
    }
    </nav>
   
 </div>
 <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav}/>
  </div>
  )
}

export default Navbar