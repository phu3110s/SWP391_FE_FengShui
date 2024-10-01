import React from 'react'
import './Advise.css'
import Navigation from '../components/navbar/Navigation'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

export default function Advise() {


    const ListKoi = [
        {
            id: 1,
            name: 'Menkaburi-Kohaku',
            type: 'Kohaku',
            element: 'water element',
            isSpecial: true,
            image: 'https://i.pinimg.com/564x/ed/7e/a6/ed7ea6a56dc8400fe68e8d772fc30cc8.jpg',
            color: 'White',
            origin: 'Japan',
            video: 'https://www.youtube.com/embed/ROfhetJTcNw?si=SD54E-FBo75lZ3CA',
            description: 'Loài phổ biến nhất, đa dạng về chủng loài.'
        }
    ]

    const ListUser = [
        {
            id: 1,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSgjs2sCO0xh0Ve1Sf8mDtBt2UhO9GRZImDw&s',
            name: 'Hello',
            gender: 'male',
            element: 'water element',
            birthYear: 2004,
            description: '....loading'
        }
    ]

    return (

        <div className='advise'>

            <Header />
            <Navigation />

            <div className='advise-form'>
                <div className='user-form'>
                    {ListUser.map((index) => (
                        <div className='user-information'>
                            <img src={index.image} alt={index.name} className='koi-img'></img>
                            <h6>Name: {index.name}</h6>
                            <h6>Element: {index.element}</h6>
                            <h6>Gender: {index.gender}</h6>
                            <h6>Birth Year: {index.birthYear}</h6>
                            <h6>Description: {index.description}</h6>
                        </div>
                    ))}
                </div>

                <div className='koi-form'>
                    {ListKoi.map((item) => (
                        <div className='koi-information'>
                            <img src={item.image} alt={item.name} className='koi-img'></img>
                            <h6>Name: {item.name}</h6>
                            <h6>Type: {item.type}</h6>
                            <h6>Element: {item.element}</h6>
                            <h6>Color: {item.color}</h6>
                            <h6>Origin: {item.origin}</h6>
                            <h6>Description: {item.description}</h6>
                        </div>

                    ))}
                </div>
            </div>
            <Footer />

        </div>
    )
}
