import { Route, Router, Routes } from "react-router-dom";
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
import AdminRoute from "./AdminFunction/AdminRoute/AdminRoute";
import Calculate from "./calculate/Calculate";
function App() {
  // const [user, setUser] = useState({})

  // const handleCredentialResponse = (response) => {
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   var decoded = jwtDecode(response.credential);
  //   console.log(decoded);
  //   setUser(decoded);
  //   document.getElementById('buttonDiv').hidden = true;
  // }
  // const handleLogOut = (e) => {
  //   setUser({});
  //   document.getElementById('buttonDiv').hidden = false;
  // }
  // useEffect(() => {
  // /* global google*/
  //   window.onload = function () {
  //     google.accounts.id.initialize({
  //       client_id: "445671209507-ttfcqdr2jogd8laupl5dg38d6h8fe3a2.apps.googleusercontent.com",
  //       callback: handleCredentialResponse
  //     });

  //     google.accounts.id.renderButton(
  //       document.getElementById("buttonDiv"),
  //       { theme: "outline", size: "large" }
  //     );
  //     google.accounts.id.prompt();
  //   }
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/Advise" element={<Advise />} />
        <Route path="/Calculate" element={<Calculate />}></Route>
        <Route path="/blogs" element={<BlogList />} />{" "}
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/blog-posting" element={<BlogPosting />} />
        <Route path="/MyBlog" element={<MyBlog />} />
        <Route path="/News" element={<News />} />
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;