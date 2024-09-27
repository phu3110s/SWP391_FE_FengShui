import React from 'react'
import './Calculate.css'
import { useState } from 'react'
import Header from '../components/header/Header'
import Navigation from '../components/navbar/Navigation'
import Footer from '../components/footer/Footer'

export default function Calculate() {

    const [yearOfBirth, setYearOfBirth] = useState('');
    const [gender, setGender] = useState('');

    const handleCompareFengShui = () => {
        if (yearOfBirth && gender) {
            alert(`Calculated`);
        } else {
            alert('Please enter year of birth and select gender.');
        }
    };

    const handleFindSuitablePound = () => {
        if (yearOfBirth && gender) {
            alert(`Calculated`);
        } else {
            alert('Please enter year of birth and select gender.');
        }
    };

    const handleFindSuitableKoi = () => {
        if (yearOfBirth && gender) {
            alert(`Calculated`);
        } else {
            alert('Please enter year of birth and select gender.');
        }
    };

    return (
        <>
            <Header />
            <Navigation />
            <div className='calculate'>
                <img className='cal-background' src='./img/koi-background.jpg' alt=''></img>
                <h2 className='calculate-title'>Calculation System</h2>

                <div className='calculate-board'>
                    <h4 className='form-title'>Enter year of birth and select gender</h4>
                    <div className='form-input'>
                        <label htmlFor="year-of-birth" className='label'>
                            Year of Birth:
                        </label>
                        <input
                            type="number"
                            id="year-of-birth"
                            value={yearOfBirth}
                            onChange={(e) => setYearOfBirth(e.target.value)}
                            placeholder="Enter your year of birth"
                            className='label'
                            required
                        />
                    </div>

                    <div className='form-radio'>
                        <label className='label'>Gender:</label>
                        <label className='label'>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={() => setGender('male')}
                            />
                            Male
                        </label>
                        <label className='label'>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={() => setGender('female')}
                            />
                            Female
                        </label>
                    </div>

                    <button onClick={handleCompareFengShui} className='choose-button'>
                        Compare Feng-Shui with existing fish
                    </button>
                    <button onClick={handleFindSuitablePound} className='choose-button'>
                        Find the suitable Pound
                    </button>
                    <button onClick={handleFindSuitableKoi} className='choose-button'>
                        Find the suitable Koi
                    </button>

                </div>
            </div>

            <Footer />
        </>
    )
}
