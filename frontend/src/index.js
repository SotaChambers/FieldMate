import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Routerをインポート
import Recruit from "./Recruit";
import Games from "./Games";
import GameDetail from "./GameDetail";
import { Authenticator } from "@aws-amplify/ui-react"; // Authenticatorをインポート

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recruit" element={<Recruit />} />
                <Route path="/games" element={<Games />} />
                <Route path="/game_detail/:id" element={<GameDetail />} />
                <Route path="/login" element={<Authenticator />} />{" "}
                {/* ログインページ */}
            </Routes>
        </Router>
    </React.StrictMode>
);
