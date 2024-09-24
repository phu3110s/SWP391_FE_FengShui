import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import Home from "./home/Home";
import SignUp from "./signup/SignUp";
import Policy from "./policy/Policy";
import BlogList from "./Blog/BlogList/BlogList";
import BlogDetail from "./Blog/BlogDetail/BlogDetail";
import Product from "./Product/Product";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/blogs" element={<BlogList />} />{" "}
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
