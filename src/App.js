import './App.css';
import {Home} from './home/Home';
import {Openblog} from "./openblogpost/Openblog"
import { Forgotpwd1 } from './forgot-password-1/Forgotpwd1';
import { Forgotpwd2 } from './forgot-password-2/Forgotpwd2';
import { Forgotpwd3 } from './forgot-password-3/Forgotpwd3';
// import { Forgotpwd4 } from './forgot-password-4/Forgotpwd4';
import { Writeablog } from './write-a-blog/Writeablog';
import { Createaccount } from './create-account/Createaccount';
import { Login } from './login/Login';
import { Routes, Route } from 'react-router-dom';


function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/open-a-blog/:id" element={<Openblog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password-1' element={<Forgotpwd1 />} />
        <Route path='/forgot-password-2' element={<Forgotpwd2 />} />
        <Route path='/forgot-password-3' element={<Forgotpwd3 />} />
        {/* <Route path='/forgot-password-4' element={<Forgotpwd4 />} /> */}
        <Route path='/create-account' element={<Createaccount />} />
        <Route path='/write' element={<Writeablog />} />
      </Routes>
    </div>
  );
}

export default App;
