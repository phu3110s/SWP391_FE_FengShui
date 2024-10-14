import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Login from "./login/Login";
import Home from "./home/Home";
import SignUp from "./signup/SignUp";
import Policy from "./policy/Policy";
// import Calculate from './calculate/Calculate'
import BlogList from "./Blog/BlogList/BlogList";
import BlogDetail from "./Blog/BlogDetail/BlogDetail";
import Product from "./Product/Product";
import BlogPosting from "./Blog/BlogPosting/BlogPosting";
import MyBlog from "./Blog/MyBlog/MyBlog";
import News from "./News/News";
import Advise from "./advise/Advise";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import BlogApprove from "./AdminFunction/BlogManagement/BlogApprove/BlogApprove";
import UserManagement from "./AdminFunction/UserManagement/UserManagement";
import SellingBlogManagement from "./AdminFunction/SellingBlogManagement/SellingBlogManagement";
// import { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
import AdminRoute from "./AdminFunction/AdminRoute/AdminRoute";
import Calculate from "./calculate/Calculate";
import UserProfile from "./User/UserComponent/UserProfile/MyProfile/UserProfile";
import PondAdding from "./AdminFunction/PondManagement/PondAdding/PondAdding";
import FishAdding from "./AdminFunction/FishManagement/FishAdding/FishAdding";
import FishViewing from "./AdminFunction/FishManagement/FishViewing/FishViewing";
import PondViewing from "./AdminFunction/PondManagement/PondViewing/PondViewing";
import OtherUserProfile from "./User/OtherUser/OtherUserProfile";
import AdvertisingPosting from "./advertising/AdvertisingPosting/AdvertisingPosting";
import DashboardChart from "./AdminFunction/DashboardChart/DashboardChart";

function App() {
  // const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  // const handleCredentialResponse = (response) => {
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   var decoded = jwtDecode(response.credential);
  //   console.log(decoded);
  //   setUser(decoded);
  //   document.getElementById('buttonDiv').hidden = true;
  //   navigate('/');
  // };

  // const handleLogOut = (e) => {
  //   setUser(null);
  //   document.getElementById('buttonDiv').hidden = false;
  //   navigate('/');
  // };

  // useEffect(() => {
  //   /* global google */
  //   window.onload = function () {
  //     google.accounts.id.initialize({
  //       client_id: "423770878382-akbp1pkmgfgfjr2dmk70hh3l61l2131g.apps.googleusercontent.com",
  //       callback: handleCredentialResponse
  //     });

  //     google.accounts.id.renderButton(
  //       document.getElementById("buttonDiv"),
  //       { theme: "outline", size: "large" }
  //     );
  //     google.accounts.id.prompt();
  //   };
  // }, []);

  return (
    <div className="App">
      {/* <div id="buttonDiv"></div>
      {user && (
        <div style={{ alignItems: 'right', textAlign: 'right', marginRight: '50px' }}>
          <img
            src={user.picture}
            alt="User Avatar"
            style={{ width: '50px', borderRadius: '50%' }}
          />
          <h6 style={{ padding: '0', marginBottom: '5px', margin: '0' }}>
            {user.name}
          </h6>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      )} */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-profile/:userId" element={<OtherUserProfile />} />
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/Advise" element={<Advise />} />
        <Route path="/Calculate" element={<Calculate />}></Route>
        <Route path="/blogs" element={<BlogList />} />{" "}
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/blog-posting" element={<BlogPosting />} />
        <Route path="/MyBlog" element={<MyBlog />} />
        <Route path="/News" element={<News />} />
        <Route path="/AdvertisingPosting" element={<AdvertisingPosting />} />
        <Route
          path="/AdminDashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route path="ApprovePost" element={<BlogApprove />} />
          <Route path="UserManagement" element={<UserManagement />} />
          <Route path="ApproveSell" element={<SellingBlogManagement />} />
          <Route path="PondGenerating" element={<PondAdding />} />
          <Route path="FishGenerating" element={<FishAdding />} />
          <Route path="FishManagement" element={<FishViewing />} />
          <Route path="PondManagement" element={<PondViewing />} />
          <Route path="AdminChart" element={<DashboardChart/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
