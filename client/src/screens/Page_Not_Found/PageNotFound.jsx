import React, { useEffect } from 'react';
import './PageNotFound.css'

function PageNotFound(props) {

    useEffect(() => {
      setTimeout(()=> {
        return props.history.push('/')
      }, 2000)
    }, [])

    return (
        <div className='not-found-page'>
            <div className='not-found-page-main'>
                {/* <h1>404 Error</h1>
                <h1>Page Not Found</h1> */}
            </div>
        </div>
    )
}

export default PageNotFound;