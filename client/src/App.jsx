import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import VideoPage from "./Pages/VideoPage";
import Modal from "./Pages/Modal";
import VideoRepository from "./Pages/VideoRepository";
import ShareVideoModal from "./Pages/ShareVideoModal";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/video" element={<VideoPage />} />
        <Route exact path="/modal" element={<ShareVideoModal />} />
        <Route exact path="/modal" element={<Modal />} />
        <Route exact path="/repo" element={<VideoRepository />} />
      </Routes>
    </Router>
  );
}

export default App;
