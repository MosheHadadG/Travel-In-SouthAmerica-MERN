import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { getDestinations } from '../../APIs/ServerAPI/destinations.server';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner'
import './DestinationsPage.css'
import './DestinationsPageResponsive.css'

function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const allDestinations = async () => {
      const destinations = await getDestinations();
      setDestinations(destinations);
    }
    allDestinations();
  }, []);


  const renderCards = () => {
    const renderedCards = destinations.map((destination) => {
      return (
      
        <Link key={destination.id} to={`/destinations/${destination.name}`}>
          <Card key={destination.id}
            imgSrc={destination.images[0]}
            title={destination.name.charAt(0).toUpperCase() + destination.name.slice(1)} />
        </Link>
        
      )
    })
    return renderedCards;
  }

  return (
    <div className='destinations-page'>
      <div className='destinations-page-main'>
        <div className='cards'>
          {destinations.length > 0 ? renderCards() : <Spinner />}
        </div>
      </div>
    </div>
  )
}

export default DestinationsPage;