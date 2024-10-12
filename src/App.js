import logo from './logo.svg';
import { Routes,Route,Component } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/Login';
import SignupPage from './Pages/SignupPage/SignupPages';
import Main from './Pages/MainPage/Main';
import Params from './Pages/setParameters/params';
import ForcePay from './Pages/component/component';
import Option from './Pages/option/Option';
function App() {
  return (
    <Routes>
      <Route path='/login' Component={LoginPage}/>
      <Route path='/signup' Component={SignupPage}/>
      <Route path='/' Component={Main}/>
      <Route path='/params' Component={Params}/>
      <Route path='/forcepaid' Component={ForcePay}/>
      <Route path='/options' Component={Option}/>
    </Routes>
  );
}

export default App;
