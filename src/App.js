import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import Layout from "./components/Layout"; // path to Layout
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import Home from './pages/Home';
import PaymentDeclined from './pages/PaymentDeclined';
import PaymentError from './pages/PaymentError';

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/product-page" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/payment-declined" element={<PaymentDeclined />} />
        <Route path="/payment-error" element={<PaymentError />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
