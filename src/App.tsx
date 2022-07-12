import React from 'react';
import './App.css';
import {MainHeader} from "./common/components/Header/MainHeader";
import {Footer} from "./common/components/Footer/Footer";
import {NavLinks} from "./common/components/Navigation/NavLinks";
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
