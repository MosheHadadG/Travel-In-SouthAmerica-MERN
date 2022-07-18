import React, { useEffect, useState } from 'react'
import { getAttractions } from '../../APIs/ServerAPI/attractions.server';
import { Link } from "react-router-dom"
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner'
import './AttractionsPage.css'
import './AttractionsPageResponsive.css'

function AttractionsPage() {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const allAttractions = async () => {
      const attractions = await getAttractions();
      setAttractions(attractions);
    }
    allAttractions();
  }, []);


  const renderCards = () => {
    const renderedCards = attractions.map((attraction) => {
      return (
        <Link key={attraction.id} to={`/attractions/${attraction._id}`}>
          <Card 
            imgSrc={attraction.images[0]}
            title={attraction.name.charAt(0).toUpperCase() + attraction.name.slice(1) + `, ${attraction.country}`} />
        </Link>
      )
    })
    return renderedCards;
  }

  return (
    <div className='attractions-page'>
      <div className='attractions-page-main'>
        <div className='cards'>
          {attractions.length > 0 ? renderCards() : <Spinner />}
        </div>
      </div>
    </div>
  )
}

export default AttractionsPage;