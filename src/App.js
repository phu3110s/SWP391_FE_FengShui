import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import Home from "./home/Home";
import Login from "./login/Login";
import Policy from "./policy/Policy";
import SignUp from "./signup/SignUp";
// import Calculate from './calculate/Calculate'
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import BlogApprove from "./AdminFunction/BlogManagement/BlogApprove/BlogApprove";
import UserManagement from "./AdminFunction/UserManagement/UserManagement";
import BlogDetail from "./Blog/BlogDetail/BlogDetail";
import BlogList from "./Blog/BlogList/BlogList";
import BlogPosting from "./Blog/BlogPosting/BlogPosting";
import MyBlog from "./Blog/MyBlog/MyBlog";
import News from "./News/News";
import Product from "./Product/Product";
import Advise from "./advise/Advise";
// import { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import AdminRoute from "./AdminFunction/AdminRoute/AdminRoute";
import AllAdvertising from "./AdminFunction/Advertising/AllAdvertising";
import AllBlog from "./AdminFunction/BlogManagement/AllBlog/AllBlog";
import PostingApprove from "./AdminFunction/BlogManagement/PostingApprove/PostingApprove";
import ConsultingAdding from "./AdminFunction/Consulting/ConsultingAdding/ConsultingAdding";
import DashboardChart from "./AdminFunction/DashboardChart/DashboardChart";
import FishAdding from "./AdminFunction/FishManagement/FishAdding/FishAdding";
import FishViewing from "./AdminFunction/FishManagement/FishViewing/FishViewing";
import HarmonyAdding from "./AdminFunction/Harmony/HarmonyInput/HarmonyAdding";
import HarmonyViewing from "./AdminFunction/Harmony/HarmonyView/HarmonyViewing";
import PaymentCreating from "./AdminFunction/Payment/PaymentCreating/PaymentCreating";
import PaymentViewing from "./AdminFunction/Payment/PaymentViewing/PaymentViewing";
import PondAdding from "./AdminFunction/PondManagement/PondAdding/PondAdding";
import PondViewing from "./AdminFunction/PondManagement/PondViewing/PondViewing";
import GetConsulting from "./Consulting/GetFishConsulting/GetConsulting";
import HarmonyRating from "./Harmony/HarmonyRating";
import OtherUserProfile from "./User/OtherUser/OtherUserProfile";
import UserProfile from "./User/UserComponent/UserProfile/MyProfile/UserProfile";
import AdvertisingDetail from "./advertising/AdvertisingDetail/AdvertisingDetail";
import AdvertisingList from "./advertising/AdvertisingList/AdvertisingList";
import AdvertisingPayment from "./advertising/AdvertisingPayment/AdvertisingPayment";
import AdvertisingPosting from "./advertising/AdvertisingPosting/AdvertisingPosting";
import MyAdvertising from "./advertising/MyAdvertising/MyAdvertising";
import Calculate from "./calculate/Calculate";
import AdvertisingFilter from "./advertising/AdvertisingFilter/AdvertisingFilter";

function App() {

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
        <Route path="/Harmony-Rating" element={<HarmonyRating />} />
        <Route path="/MyAdvertising" element={<MyAdvertising />} />
        <Route path="/AdvertisingList" element={<AdvertisingList />} />
        <Route path="/AdvertisingPayment" element={<AdvertisingPayment />} />
        <Route path="/AdvertisingDetail/:id" element={<AdvertisingDetail />} />
        <Route path="/Fish-Consulting" element={<GetConsulting />} />
        <Route path="/AdvertisingFilter" element={<AdvertisingFilter />} />
        <Route
          path="/AdminDashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route index element={<DashboardChart />} />
          <Route path="ApprovePost" element={<BlogApprove />} />
          <Route path="PostingApprove" element={<PostingApprove />} />
          <Route path="UserManagement" element={<UserManagement />} />
          <Route path="PondGenerating" element={<PondAdding />} />
          <Route path="FishGenerating" element={<FishAdding />} />
          <Route path="FishManagement" element={<FishViewing />} />
          <Route path="PondManagement" element={<PondViewing />} />
          <Route path="AdminChart" element={<DashboardChart />} />
          <Route path="Harmony-Adding" element={<HarmonyAdding />} />
          <Route path="Harmony-Viewing" element={<HarmonyViewing />} />
          <Route path="Consulting-Adding" element={<ConsultingAdding />} />
          <Route path="Payment-Adding" element={<PaymentCreating />} />
          <Route path="Payment-Plans" element={<PaymentViewing />} />
          <Route path="Blog-Management" element={<AllBlog />} />
          <Route path="Ad-Management" element={<AllAdvertising />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
