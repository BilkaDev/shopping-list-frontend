import React from 'react';
import './App.css';
import {MainHeader} from "./common/components/Header/MainHeader";
import {Footer} from "./common/components/Footer/Footer";
import {NavLinks} from "./common/components/Navigation/NavLinks";
import {Route, Routes} from "react-router-dom";
import {Products} from "./products/pages/Products";
import {Lists} from "./lists/pages/Lists";
import {ItemsInList} from "./lists/pages/ItemsInList";

function App() {

  return (
      <>
          <MainHeader/>
          <main>
                <Routes>
                    <Route path="/" element={<NavLinks/>}/>
                    <Route path="/product" element={<Products/>}/>
                    <Route path="/list" element={<Lists/>}/>
                    <Route path="/list/:id/:name" element={<ItemsInList/>}/>
                </Routes>
          </main>
          <Footer/>

      </>
  );
}

export default App;
