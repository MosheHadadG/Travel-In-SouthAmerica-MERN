import React, { useEffect } from 'react'
import { useState } from 'react'
import { getAttractionById } from '../../APIs/ServerAPI/attractions.server';
import SliderImages from '../../components/Slider/SliderImages';
import Spinner from '../../components/Spinner/Spinner';
// import Box from './Box/Box';
import './AttractionPage.css'
import './AttractionPageResponsive.css'

function AttractionPage(props) {
  const [attraction, setAttraction] = useState([]);


  useEffect(() => {
    const getAttraction = async () => {
      const attraction = await getAttractionById(props.match.params.attrId);
      setAttraction(attraction);
    }
    getAttraction();

  }, []);

  return (
    <div className='attraction-page'>
      {Object.keys(attraction).length > 0 ?
        <div className='attraction-page-main'>
          <div className='attraction-slider'>
            <SliderImages images={attraction.images} />
          </div>
          <div className='attraction-bottom'>
            <div className="attraction-name">
              <h1>{attraction.name.charAt(0).toUpperCase() + attraction.name.slice(1)}</h1>
            </div>

            <div className='attraction-description ui segment'>
              <p>{attraction.description}</p>
            </div>
            <div className='attraction-like-to-know-title'>
              <h2>
                {`Best Times to Visit ${attraction.name.charAt(0).toUpperCase() + attraction.name.slice(1)}`}
              </h2>
              <div className='attraction-description ui segment'>
              <p>{attraction.whenToVisit}</p>
            </div>
            </div>
            {/* 
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
          </div> */}

          </div>
        </div>
        : <Spinner />
      }

    </div >
  )
}

export default AttractionPage;