import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DrinkDetail from './pages/DrinkDetail';
import Favorites from './pages/Favorites';
import MyDrinks from './pages/MyDrinks';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route exact path='/login' element={<Login />}/>
      <Route exact path='/register' element={<Register />}/>
      <Route exact path='/drink/:id' element={<DrinkDetail />}/>
      <Route exact path='/mis-bebidas' element={<MyDrinks />}/>
      <Route exact path='/favoritos' element={<Favorites />}/>
      <Route exact path='/perfil' element={<Perfil />}/>
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default App;