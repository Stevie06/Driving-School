import React,{useEffect,useState} from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import TopBar from "../components/TopBar";

const Addreceipt = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/");
    };
}
export default Addreceipt;