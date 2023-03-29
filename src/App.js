import React from 'react'
import { Routes, Route } from "react-router-dom";

import CustomLayout from './components/CustomLayout';
import Mainpage from './components/Mainpage';
import Credits from './components/Credits';

import { HashRouter as Router } from "react-router-dom"


import { routes } from './routes';


import './main.less';


const App = () => {
  

  return (
    <>
        

            <Router>
                <Routes>
                    <Route path="" element={
                       <CustomLayout items={<Mainpage />}/>
                    }/>

                    <Route path="/credits" element={
                      <CustomLayout items={<Credits />}/>
                    }/>

                    {routes.map((obj, i) => {
                        return (
                          <Route key={i} path={obj.link} element={
                            <CustomLayout items={obj.component} />
                          }/>
                        )
                        
                    })}
                </Routes>
            </Router>
      </>
  )
}

export default App