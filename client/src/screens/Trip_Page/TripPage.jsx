import React, { useContext, useEffect, useState } from 'react'
import { deleteMyPlanning, getPlanningById } from '../../APIs/ServerAPI/planning.server'
import { appContext } from '../../context/appContext'
import Spinner from '../../components/Spinner/Spinner'
import Box from '../../components/Box/Box'

import './TripPage.css'
import './TripPageResponsive.css'
import BoardTrip from './Board_Trip/BoardTrip'
import { Link } from 'react-router-dom'

function TripPage(props) {
  const { token, userLoggedIn, setUserLoggedIn } = useContext(appContext)
  const [planning, setPlanning] = useState({});

  useEffect(() => {
    const fetchPlannnig = async () => {
      const planning = await getPlanningById(token, props.match.params.id)
      if (planning.response && planning.response.status === 404) return props.history.push('/404');
      setPlanning(planning);

    }
    fetchPlannnig();

  }, [])

  function withoutTime(dateTime) {
    const date = new Date(dateTime);
    const dateWithoutTime = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    return dateWithoutTime;
  }

  const handleDeletePlanning = async () => {
    const userAfterRemovePlanning = await deleteMyPlanning(token);

    setUserLoggedIn(userAfterRemovePlanning.user);
    
    const userLocalStorage = localStorage.getItem('user');
    const user = JSON.parse(userLocalStorage)
    user.user = userAfterRemovePlanning.user
    localStorage.setItem('user', JSON.stringify(user));
    props.history.push('/planning')
  }


  

  return (
    <div className='trip-page-main'>
      {Object.keys(planning).length === 0 ? <Spinner /> :
        <>
          <div className="trip-page-board">
            <h1>Details of {planning.ownerName} trip</h1>
            <BoardTrip countriesPlan={planning.planning?.countriesPlan} />
          </div>
          <div className='trip-page-boxes-info'>
            <Box
              srcIcon={<i className="fa-solid fa-plane fa-2xl"></i>}
              title="Departure Date"
              desc={withoutTime(planning.planning.departureDate)}
            />
            <Box
              srcIcon={<i className="fa-solid fa-house-chimney fa-2xl"></i>}
              title="Return Date"
              desc={withoutTime(planning.planning.returnDate)}
            />
            <Box
              srcIcon={<i className="fa-solid fa-dollar-sign fa-2xl"></i>}
              title="Budget"
              desc={`${planning.planning.budget}$`}
            />
          </div>
          <div className='trip-buttons'>
            {userLoggedIn._id === planning.ownerId ? 
            <button onClick={handleDeletePlanning} className='ui secondary button'>
              <i className="fa-solid fa-trash"></i> Delete Trip
              </button>
            :
            <Link to={`/profile/${planning.ownerId}`}>
              <button className='ui secondary button'> 
              {`Back To ${planning.ownerName} profile`}
                </button>
              </Link>
            
          }

          </div>
        </>

      }
    </div>
  )
}

export default TripPage