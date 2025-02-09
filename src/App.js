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

import Login from './component/Login/Login';
import Main from './component/main/Main';
import SignIn from '../src/component/SignIn/SignIn';
// import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path='/main' element={<Main/>} />
        <Route path="/signin" element={<SignIn/>} /> 
      </Routes>
    </Router>
  );
}

export default App;