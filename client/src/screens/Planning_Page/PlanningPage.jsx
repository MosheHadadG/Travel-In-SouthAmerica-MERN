import React, { useState, useContext, useEffect } from 'react'
import CountriesBox from './CountriesBox/CountriesBox';
import PlanningBoard from './PlanningBoard/PlanningBoard';
import PlanningForm from './PlanningForm/PlanningForm';
import Spinner from '../../components/Spinner/Spinner';
import { appContext } from '../../context/appContext';
import { updatePlanning } from '../../APIs/ServerAPI/planning.server';

import './PlanningPage.css'
import './PlanningPageResponsive.css'


function PlanningPage({ history }) {
  const [countriesPlan, setCountriesPlan] = useState([]);
  const { token, setUserLoggedIn, userLoggedIn } = useContext(appContext);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (userLoggedIn.planning) {
      history.push(`/planning/${userLoggedIn.planning._id}`)
    }
  
  }, [userLoggedIn])
  

  const handleClickedCountry = (country) => {
    if (countriesPlan.includes(country)) return;
    setCountriesPlan([...countriesPlan, country])
  }

  const handleRemovedCountryPlan = (countryRemoved) => {
    const updetedCountriesPlan = countriesPlan.filter((country) => country.name !== countryRemoved);
    setCountriesPlan(updetedCountriesPlan);
  }


  const updateUserPlanning = async (formPlanning) => {
    if (!formPlanning) return;
    if (countriesPlan.length <= 0) return;
    const { inputBudget, inputDeparture, inputReturn } = formPlanning;
    const planningBody = {
      countriesPlan,
      budget: inputBudget,
      departureDate: inputDeparture,
      returnDate: inputReturn
    }
    setSpinner(true)
    const updatedUser = await updatePlanning(token, planningBody);
    setSpinner(false)
    if (!updatedUser) return;
    setUserLoggedIn(updatedUser)
    const userLocalStorage = localStorage.getItem('user');
    const user = JSON.parse(userLocalStorage)
    user.user = updatedUser
    localStorage.setItem('user', JSON.stringify(user));
  }


  return (

    <div className='planning-trip-page-container'>

      {spinner ? <Spinner /> :
        <>
          {/* <h1>Planning Trip</h1> */}
          <div className='planning-boards'>
            <CountriesBox countriesPlan={countriesPlan} handleClickedCountry={handleClickedCountry} />
            <PlanningBoard handleRemovedCountryPlan={handleRemovedCountryPlan}
              countriesPlan={countriesPlan} />
          </div>
          <div className='planning-form'>
            <PlanningForm addNewPlanningClick={updateUserPlanning} />
          </div>
        </>
      }
    </div>

  )
}

export default PlanningPage;