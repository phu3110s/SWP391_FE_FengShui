import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../header/Header'

export default function Home() {
    return (
        <div>
            <Header />
            <div>
                <Link to={'./Login'}>Login ở đây nhoa</Link>
            </div>
        </div>
    )
}
