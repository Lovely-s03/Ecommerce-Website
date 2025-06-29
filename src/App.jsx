import React, { useEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'


import Navbar from './Components/Navbar'
import Product from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Footer from './Components/Footer'
import SingleProduct from './pages/SingleProduct'
import axios from 'axios'
import CatergoryProduct from './pages/CatergoryProduct'
import { useCart } from './Context/CartContext'
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => {
    const [location, setLocation] = useState()
      const [openDropdown, setOpenDropdown] = useState(false)
      const {cartItem , setCartItem} = useCart();
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
      // console.log(latitude, longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        setLocation(exactLocation)
        setOpenDropdown(false)
        // console.log(exactLocation);

      } catch (error) {
        console.log(error);

      }

    })
  }
    useEffect(() => {
    getLocation()
  }, [])

   useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if(storedCart){
      setCartItem(JSON.parse(storedCart))
    }
  }, []);
useEffect(()=>{
  localStorage.setItem('cartItem' , JSON.stringify(cartItem))
},[cartItem])
  return (
    <div>
      <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}/>
      <Routes>

        <Route path='/' element={<Home/>}>

        </Route>
         <Route path='/products' element={<Product/>}> </Route>
             <Route path='/products/:id' element={<SingleProduct/>}> </Route>
                 <Route path='/category/:category' element={<CatergoryProduct/>}> </Route>
          <Route path='/about' element={<About/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
                 <Route path='/cart' element={<ProtectedRoute>
          <Cart location={location} getLocation={getLocation} />
        </ProtectedRoute>}></Route>
               
      </Routes>
      <Footer/>
      </BrowserRouter>
    
    </div>
  )
}

export default App