import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignUp, Login, DashboardInst, Studenti,Instructori, DashboardAdmin,DashboardStud,ChangePassword,Receipts,Sesiune_condus } from './pages';

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
      </Routes>

    </div>
  );
}

export default App;
