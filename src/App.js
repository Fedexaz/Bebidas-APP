import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';
import Favorites from './pages/favs/Favorites';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route exact path='/detail/:id' element={<Detail />}/>
      <Route exact path='/favoritos' element={<Favorites />}/>
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default App;