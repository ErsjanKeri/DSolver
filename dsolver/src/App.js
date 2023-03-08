import React, { useState, useEffect } from 'react'
import { Modal, Layout, Breadcrumb } from 'antd';
import { Routes, Navigate, Route } from "react-router-dom";

import {  CustomLayout, Mainpage, HavelHakimi, EEA, RelationalesProdukt, Groups, Kombinatorik, DPLL } from "./components"

import { HashRouter as Router } from "react-router-dom"

import './main.less';
import TruthTable from './components/TruthTable/TruthTable';


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

                    <Route path="dpll" element={
                        <CustomLayout>
                          <DPLL/>
                        </CustomLayout>
                    }/>

                    <Route path="groups" element={
                        <CustomLayout>
                          <Groups/>
                        </CustomLayout>
                    }/>
                  

                    <Route path="truthtable" element={
                        <CustomLayout>
                          <TruthTable/>
                        </CustomLayout>
                    }/>
                  

                </Routes>
            </Router>
      </>
  )
}

export default App