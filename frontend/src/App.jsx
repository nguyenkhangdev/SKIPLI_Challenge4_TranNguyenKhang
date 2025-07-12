import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ManagerSignin from "./pages/ManagerSignin";
import ManagerVerify from "./pages/ManagerVerify";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manager/signin" element={<ManagerSignin />} />
        <Route path="/manager/signin/verify" element={<ManagerVerify />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
