import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//import components
import TopMenue from '../src/Components/CommonComponents/TopMenue'
//import SideBar from '../src/Components/CommonComponents/SiderNav'

//import routes
import ClientEntry from '../src/Pages/ClientEntry'
import ProjectEntry from '../src/Pages/ProjectEntry'
import Task from '../src/Pages/Task'
import Finacial  from './Pages/Finacial';
import Login from './Pages/Login';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
    <TopMenue></TopMenue>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<App />} />
        </Route>
        <Route path="/cliententry" element={<ClientEntry />}/>
        <Route path="/projectentry" element={<ProjectEntry />}/>
        <Route path="/task" element={<Task />}/>
        <Route path="/finacial" element={<Finacial />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
  </BrowserRouter>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
