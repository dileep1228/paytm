import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Signup } from "./pages/Signup";
import {Signin} from "./pages/Signin";
import {Appbar} from "../src/components/Appbar"
import {BalanceComponent} from "../src/components/BalanceComponent"
import { Dashboard } from "./pages/Dashboard";
import { SendMoneyComponent } from "./pages/SendMoneyComponent";

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path ="/signup" element={<Signup/>} />
            <Route path ="/signin" element={<Signin/>} />
            <Route path = "/appbar" element = {<Appbar/>} />
            <Route path = "/bal" element = {<BalanceComponent value = {"1000"}/>} />
            <Route path ="/dashboard" element={<Dashboard/>} />
            <Route path ="/send" element={<SendMoneyComponent/>} />
          </Routes>
        </BrowserRouter> 
    </div>
  )
}

export default App
