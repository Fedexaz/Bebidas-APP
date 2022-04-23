import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import Drink from '../../components/home/Drink';
import { getDrinksByLetterRandom } from '../../services/drinks.services';

export default function Home() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setDrinks(await getDrinksByLetterRandom());
    } catch (error) {
      console.log("Error al cargar bebidas");
    }
  };

  return (
    <>
      <NavBar />
      <div className='container'>
        <h1>
          Bebidas
        </h1>
        <div className='drink-container'>
          {
            drinks.length ?
              drinks.map(drink => <Drink key={drink.idDrink} data={drink} />)
              :
              null
          }
        </div>
      </div>
    </>
  )
}
