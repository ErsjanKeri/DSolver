import React, { useState, useEffect } from 'react'
import { Modal, Layout, Breadcrumb } from 'antd';
import { Routes, Navigate, Route } from "react-router-dom";

import {  CustomLayout, Mainpage, HavelHakimi, EEA, RelationalesProdukt, DPLL } from "./components"

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
                  

                    <Route path="dpll" element={
                        <CustomLayout>
                          <DPLL/>
                        </CustomLayout>
                    }/>
                </Routes>
            </Router>
      </>
  )
}

export default App