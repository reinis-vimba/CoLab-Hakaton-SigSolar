import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ContactUs from './ContactUs';


function App() {

  return (
    <Router basename="/CoLab-Hakaton-SigSolar">
      <Routes>
        <Route
          path="/"
          element={
            // <>
            //   <div>
            //     <a href="https://vite.dev" target="_blank">
            //       <img src={viteLogo} className="logo" alt="Vite logo" />
            //     </a>
            //     <a href="https://react.dev" target="_blank">
            //       <img src={reactLogo} className="logo react" alt="React logo" />
            //     </a>
            //   </div>
            //   <h1>Vite + React</h1>
            //   <div className="card">
            //     <button onClick={() => setCount((count) => count + 1)}>
            //       count is {count}
            //     </button>
            //     <p>
            //       Edit <code>src/App.jsx</code> and save to test HMR
            //     </p>
            //   </div>
            //   <p className="read-the-docs">
            //     Click on the Vite and React logos to learn more
            //   </p>
            // </>
            <ContactUs />


            // <h1 className='text-red-700'>Welcome to CoLab Hakaton SigSolar</h1>

          }
        />
        {/* <Route path="/contact" element={<ContactUs />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
