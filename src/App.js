import "./styles/Home.css";
import Header from "./components/Header";
import MyCertificatePage from "./pages/MyCertificatesPage";
import CreateCertificatePage from "./pages/CreateCertificatePage";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default function Home() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/mycertificates" element={<MyCertificatePage />} />
        <Route path="/createcertificate" element={<CreateCertificatePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}
