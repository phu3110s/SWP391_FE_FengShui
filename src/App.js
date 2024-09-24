import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import Home from './home/Home';
import SignUp from './signup/SignUp';
import Policy from './policy/Policy';
import { Button } from 'antd';
import Icon from '@ant-design/icons/lib/components/Icon';

function App() {

  const [user, setUser] = useState({})

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var decoded = jwtDecode(response.credential);
    console.log(decoded);
    setUser(decoded);
    document.getElementById('buttonDiv').hidden = true;
  }
  const handleLogOut = (e) => {
    setUser({});
    document.getElementById('buttonDiv').hidden = false;
  }
  useEffect(() => {
    /* global google*/
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: "445671209507-ttfcqdr2jogd8laupl5dg38d6h8fe3a2.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }
      );
      google.accounts.id.prompt();
    }
  }, []);


  return (
    <>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-end' }}>
        <div id='buttonDiv' style={{ width: '30%' }}></div>
        {Object.keys(user).length !== 0 &&
          <Button
            className='btn-logout'
            onClick={handleLogOut}>
            <Icon left>exit_to_app</Icon>Logout
          </Button>
        }
        {user &&
          <div style={{ width: '70%' }}>
            <h6 style={{ padding: '10px', marginBottom: '0' }}>
              {user.name ? <Icon left style={{ fontSize: '1cm' }}>account_circle</Icon> : ''} {user.name}
              {user.name ? <Button className='blog-btn'>
                <Icon left style={{ fontSize: '0.8cm' }}>add</Icon>
                <Link to='/Blog' className='blog-btn-name'>BLOG</Link>
              </Button> : ''}
            </h6>
          </div>
        }
      </div>

      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/policy' element={<Policy />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
