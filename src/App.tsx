import React from 'react';
import './App.css';
import {MainHeader} from "./common/header/MainHeader";
import {Footer} from "./common/footer/Footer";
import {NavLinks} from "./common/navigation/NavLinks";
import {Route, Routes} from "react-router-dom";
import {Products} from "./products/pages/Products";

function App() {
  return (
      <>
          <MainHeader/>
          <main>
                <Routes>
                    <Route path="/" element={<NavLinks/>}/>
                    <Route path="/product" element={<Products/>}/>
                </Routes>
          </main>
          <Footer/>

      </>
  );
}

export default App;
