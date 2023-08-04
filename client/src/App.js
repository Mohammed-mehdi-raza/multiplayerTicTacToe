import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import Auth from './Pages/Auth/Auth.jsx';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/" exact element={<Auth/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
