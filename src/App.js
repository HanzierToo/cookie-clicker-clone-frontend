import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Views/View";

const App =()=>{
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
