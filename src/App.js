import React, { useState, useEffect } from 'react'
import { Modal, Layout, Breadcrumb } from 'antd';
import { Routes, Navigate, Route } from "react-router-dom";

import {  CustomLayout, Mainpage, HavelHakimi, EEA, Matching, RelationalesProdukt, Groups, Kombinatorik, DPLL , TruthTable} from "./components"
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
                    <Route path="EEA" element={
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
                    
                    <Route path="matching" element={
                        <CustomLayout>
                          <Matching/>
                        </CustomLayout>
                    }/>
                  

                </Routes>
            </Router>
      </>
  )
}

export default App