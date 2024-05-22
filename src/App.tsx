import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Header from './component/Header';
import { pageName } from './component/PageName';
import Test1Page from './pages/Test1Page';
import Test2Page from './pages/Test2Page';
import MainPage from './pages/MainPage';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path={pageName.home} element={<MainPage/>}/>
        <Route path={pageName.test1} element={<Test1Page/>}/>
        <Route path={pageName.test2} element={<Test2Page/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
