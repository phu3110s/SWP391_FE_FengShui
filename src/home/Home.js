import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../header/Header'

export default function Home() {
    return (
        <div>
            <div className='link_to_login'>
                <Link className='' to={'./Login'}>Login ở đây nha</Link>
            </div>
            <Header />
        </div>
    )
}
