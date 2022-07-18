import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getUsers } from '../../APIs/ServerAPI/users.server';
import Spinner from '../../components/Spinner/Spinner';
import { appContext } from '../../context/appContext';
import PartnerCard from './PartnerCard/PartnerCard';
import PartnersFilter from './PartnersFilter/PartnersFilter';

import './PartnersPage.css'
import './PartnerPageResponsive.css'

function PartnersPage() {
  const { token } = useContext(appContext)
  const [users, setUsers] = useState([]);
  const [ usersFiltered, setUsersFiltered ] = useState([]);
  const [ termFilter, setTermFilter ] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers(token);
      setUsers(users);
      setUsersFiltered(users)
    }
    fetchUsers();
  }, []);

  const filterByAge = () => {
    if (termFilter.ages !== 'All') {
      const ageStartNum = parseInt(termFilter.ages.substring(0, 2));
      const ageEndNum = parseInt(termFilter.ages.substring(3, 5));
      const filtered = users.filter((user) => {
        return user.age > ageStartNum && user.age < ageEndNum;
      })
      setUsersFiltered(filtered);
      return;
    }
    setUsersFiltered(users);
  }

  const filterPartnerWithPlan = () => {
    if (termFilter.partnerWithPlan) {
      
      setUsersFiltered((prevUsersFiltered) => {
        const filterd = prevUsersFiltered.filter((user) => {
          return user.planning
        })
        return filterd
      })
    }
  }

  useEffect(() => {
    if(!termFilter) return;
    filterByAge();
    filterPartnerWithPlan();

  }, [termFilter])


  const renderCards = () => {
    const renderedCards = usersFiltered.map((user) => {
      return <Link key={user._id} to={`/profile/${user._id}`}><PartnerCard user={user} /></Link>
    })

    return renderedCards;
  }

  return (
    <div className='partners-page'>
      <PartnersFilter setTermFilter={setTermFilter} />
    <div className='partners-page-main'>
      <div className='partners-cards'>
        {users.length > 0 ? renderCards() : <Spinner />}
      </div>
    </div>
  </div>
  )
}

export default PartnersPage