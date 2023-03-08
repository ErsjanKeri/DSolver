import React, { useState, useEffect } from 'react'
import { Modal, Layout, Breadcrumb } from 'antd';
import { Routes, Navigate, Route } from "react-router-dom";

import {  CustomLayout, Mainpage, HavelHakimi, EEA, RelationalesProdukt, Groups, Kombinatorik  } from "./components"

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
                    <Route path="kombinatorik" element={
                      <CustomLayout>
                          <Kombinatorik/>
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

                    <Route path="groups" element={
                        <CustomLayout>
                          <Groups/>
                        </CustomLayout>
                    }/>
                  

                </Routes>
            </Router>
      </>
  )
}

export default App