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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import SignIn from '../src/component/SignIn/SignIn';
import FirebaseConfig from './FirebaseConfig';
import Home from './component/main-for-redux/Home';
import Create from './component/main-for-redux/Create';
import Update from './component/main-for-redux/Update';
// import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    
    <Router> 
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/create" element={<Create/>} /> 
        <Route path="/edit/:id" element={<Update/>} />
      </Routes>
    </Router>
  );
}

export default App;