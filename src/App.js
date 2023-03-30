import React from 'react'
import { Routes, Route } from "react-router-dom";

import CustomLayout from './components/CustomLayout';
import Mainpage from './components/Mainpage';
import Credits from './components/Credits';

import { HashRouter as Router } from "react-router-dom"

import i18next from "i18next"
import { initReactI18next } from 'react-i18next';
import translation from  "./translation.json"

import { routes } from './routes';


import './main.less';


i18next.use(initReactI18next).init(translation)

let language = "de"
if(localStorage.getItem("lang") !== null){
  language = localStorage.getItem("lang")
}

i18next.changeLanguage(language)




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