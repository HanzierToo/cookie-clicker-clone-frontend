import {useEffect, useState} from "react";
import './index.css';
import './components/navbar';
import Navbar from "./components/navbar";
import Game from "./components/game"

const View = () => {
    return (
        <div className="container">
            <Game />
        </div>
    );
}

export default View;