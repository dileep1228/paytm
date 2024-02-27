import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import {InputBoxComponent} from "../components/InputBoxComponent";
import {ButtonComponent} from "../components/ButtonComponent";
import {BottomWarningComponent} from "../components/BottomWarningComponent"
import { useState } from "react";


import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate  = useNavigate();


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 pb-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBoxComponent onChange={e =>{
          setFirstName(e.target.value);
        }} label = {"First Name"} placeholder={"John"}/>
        
        <InputBoxComponent onChange={e =>{
          setLastName(e.target.value);
        }} label = {"Last Name"} placeholder={"Snow"}/>
        
        <InputBoxComponent onChange={e =>{
          setuserName(e.target.value);
        }} label = {"Email"} placeholder={"LordCommander@gmail.com"}/>
       
        <InputBoxComponent onChange={e =>{
          setPassword(e.target.value);
        }} label = {"Password"} placeholder={"GOT@HBO"}/>
        
        <div className="pt-4">
          <ButtonComponent onClick={ async() =>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token",response.data.token); // storing token in localstorage
            navigate("/dashboard");
          }} label={"Sign up"}/>
        </div>
        <BottomWarningComponent label = {"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
       </div>
    </div>
  </div>
}