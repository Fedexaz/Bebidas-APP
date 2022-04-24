import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import Drink from '../../components/home/Drink';
import { getDrinksByLetterRandom } from '../../services/drinks.services';
import Jumbotron from '../../components/home/Jumbotron';
import Loader from '../../components/Loader';

export default function Home() {
  const [drinks, setDrinks] = useState([]);
  const [loadingDrinks, setLoadingDrinks] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setDrinks(await getDrinksByLetterRandom());
      setLoadingDrinks(false);
    } catch (error) {
      console.log("Error al cargar bebidas");
    }
  };

  return (
    <>
      <Jumbotron />
      <NavBar setDrinks={setDrinks} />
      <div className='container'>
        <div className={`drink-container ${!loadingDrinks ? 'animar' : null}`}>
          {
            !loadingDrinks ?
              drinks.length ?
                drinks.map(drink => <Drink key={drink.idDrink} data={drink} />)
                :
                null
              :
              <Loader />
          }
        </div>
      </div>
    </>
  )
}
