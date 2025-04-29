// import logo from './logo.svg';
// import './App.css';
// import SignIn from '../src/component/SignIn/SignIn';
// import Login from './component/Login/Login';
// // import { Auth0Provider } from '@auth0/auth0-react';

// function App() {
//   return (
//     <>
// {/* <Auth0Provider> */}
// {/* <SignIn/> */}

// <Login/>
// {/* </Auth0Provider> */}
//     {/* <SignIn/> */}
//     {/* <BrowserRouter >
//     <Routes>
//       <Route path />
//     </Routes>
    
//     </BrowserRouter> */}
//     </>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
// import Login from './component/Login/Login';
import Login from './component/LearningAuth/Login';
import Main from './component/main/Main';
import SignIn from '../src/component/SignIn/SignIn';
import Users from './component/UsersPage';
import Crudpage from './component/crud/Crudpage';
import ReuseableSideDrawer from './component/side-drawer/ReuseableSideDrawer';
import Home from './component/Home';
import BalanceChecker from './component/contracts/BalanceChecker';

// import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  const DashboardLayout = () => (
    <>
      <ReuseableSideDrawer showSidebar={true} style={{ overflowX: "hidden" }}>
        <Outlet />
      </ReuseableSideDrawer>
    </>
  );
  return (
    <Router> 
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<Home/>} />
      {/* <Route path="/" element={<BalanceChecker/>} /> */}
        {/* <Route path="/" element={<ReuseableSideDrawer/>} /> */}
        <Route path='/crud-app' element={<Crudpage/>} />
        <Route path='/drawer' element={<ReuseableSideDrawer/>} />
        <Route path="/login" element={<Login />} /> 
        <Route path='/main' element={<Main/>} />
        <Route path="/signin" element={<SignIn/>} /> 
      </Routes>
    </Router>
  );
}

export default App;