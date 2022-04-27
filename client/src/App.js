import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DrinkDetail from './pages/DrinkDetail';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route exact path='/login' element={<Login />}/>
      <Route exact path='/register' element={<Register />}/>
      <Route exact path='/drink/:id' element={<DrinkDetail />}/>
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default App;