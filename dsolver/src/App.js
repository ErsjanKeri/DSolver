import React, { useState, useEffect } from 'react'
import { Modal, Layout, Breadcrumb } from 'antd';
import { Routes, Navigate, Route } from "react-router-dom";

<<<<<<< HEAD
import {  CustomLayout, Mainpage, HavelHakimi, Kombinatorik  } from "./components"
=======
import {  CustomLayout, Mainpage, HavelHakimi, EEA, RelationalesProdukt  } from "./components"
>>>>>>> main

import { HashRouter as Router } from "react-router-dom"

import './main.less';


const App = () => {
  

  return (
    <>
            <Router>
                <Routes>
                    <Route path="" element={
                       <CustomLayout>
                          <Mainpage/>
                        </CustomLayout>
                       
                    }/>
                    <Route path="havelhakimi" element={
                        <CustomLayout>
                          <HavelHakimi/>
                        </CustomLayout>
                    }/>
<<<<<<< HEAD
                    <Route path="kombinatorik" element={
                      <CustomLayout>
                          <Kombinatorik/>
                      </CustomLayout>
                    }/>
=======
                    <Route path="eea" element={
                        <CustomLayout>
                          <EEA/>
                        </CustomLayout>
                    }/>

                    <Route path="relation" element={
                        <CustomLayout>
                          <RelationalesProdukt/>
                        </CustomLayout>
                    }/>
                  

>>>>>>> main
                </Routes>
            </Router>
      </>
  )
}

export default App