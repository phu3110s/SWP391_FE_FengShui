import React from 'react'
// import { Link } from 'react-router-dom'
import Header from '../components/header/Header'
import Navigation from '../components/navbar/Navigation'
import Footer from '../components/footer/Footer'


export default function Home() {
    return (
        <div className='home'>
            <Header />
            <Navigation />
            <div></div>
            <Footer />
        </div>
    )
}
