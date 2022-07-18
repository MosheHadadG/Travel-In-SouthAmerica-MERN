import React, { useEffect } from 'react'
import { useState } from 'react'
import { getDestinationByName } from '../../APIs/ServerAPI/destinations.server';
import SliderImages from '../../components/Slider/SliderImages';
import Spinner from '../../components/Spinner/Spinner';
import Box from '../../components/Box/Box';
import './DestinationPage.css'
import './DestinationPageResponsive.css'

function DestinationPage(props) {
  const [destination, setDestination] = useState([]);


  useEffect(() => {
    const getDestination = async () => {
      const destination = await getDestinationByName(props.match.params.destName);
      setDestination(destination);
    }
    getDestination();

  }, []);

  return (
    <div className='destination-page'>
      {Object.keys(destination).length > 0 ?
        <div className='destination-page-main'>
          <div className='destination-slider'>
            <SliderImages images={destination.images} />
          </div>
          <div className='destination-bottom'>
            <div className="destination-name">
              <h1>{destination.name.charAt(0).toUpperCase() + destination.name.slice(1)}</h1>
            </div>

            <div className='destination-description ui segment'>
              <p>{destination.description}</p>
            </div>
            <div className='destination-like-to-know-title'>
              <h2>Things you might like to know</h2>
            </div>

            <div className='destination-boxes-likes-to-know'>
              <Box
                srcIcon={<i className="fa-solid fa-landmark-flag fa-2xl"></i>}
                title="Capital"
                desc={destination.capital}
              />
              <Box
                srcIcon={<i className="fa-solid fa-people-group fa-2xl"></i>}
                title="Population"
                desc={destination.population}
              />
              <Box
                srcIcon={<i className="fa-solid fa-language fa-2xl"></i>}
                title="Language"
                desc={destination.language}
              />
              <Box
                srcIcon={<i className="fa-solid fa-map-location fa-2xl"></i>}
                title="Famous Place To Visit"
                desc={destination.famousPlaceToVisit.map((place, idx) => <p key={idx}>{place}</p>)}
              />
          </div>

        </div>
        </div>
        : <Spinner />
}

    </div >
  )
}

export default DestinationPage