import "./App.css";
import DataProvider from "./contex/DataProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Account/Login";
import Home from "./Components/home/Home.jsx";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
