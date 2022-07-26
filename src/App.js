import './App.css';
import {Home} from './home/Home';
import {Openblog} from "./openblogpost/Openblog"
import { Routes, Route, useParams } from 'react-router-dom';


function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/open-a-blog/:id" element={<Openblog />} />
      </Routes>
    </div>
  );
}

export default App;
