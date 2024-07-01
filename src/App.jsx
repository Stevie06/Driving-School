import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignUp, Login, DashboardInst,Masina, Studenti,Instructori,AboutUs,Profile,DashboardAdmin,DashboardStud,ChangePassword,Receipts,Sesiune_condus,Programari,Quiz,Receipts_Admin,Reports } from './pages';


const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  }, [token]);

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/dashboardinst" element={<DashboardInst token={token} />} />
        <Route path='/Studenti' element={<Studenti token={token} />} />
        <Route path='/DashboardAdmin' element={<DashboardAdmin token={token} />} />
        <Route path='/DashboardStud' element={<DashboardStud token={token} />} />
        <Route path='/ChangePassword' element={<ChangePassword token={token} />} />
        <Route path='/Receipts' element={<Receipts token={token} />} />
        <Route path='/Instructori' element={<Instructori token={token} />} />
        <Route path='/Sesiune_condus' element={<Sesiune_condus token={token} />} />
        <Route path='/Programari' element={<Programari token={token} />} />
        <Route path='/Profile' element={<Profile token={token} />} />
        <Route path='/Masina' element={<Masina token={token} />} />
        <Route path='/Quiz' element={<Quiz token={token} />} />
        <Route path='/AboutUs' element={<AboutUs token={token} />} />
        <Route path='/Reports' element={<Reports token={token} />} />
        <Route path='/Receipts_Admin' element={<Receipts_Admin token={token} />} />

      </Routes>

    </div>
  );
}

export default App;
