import React from 'react';
import error from '../materials/error-404.gif';

const NotFound = () => {
  return(
    <div className="carderror text-center shadow">
          <img src={error} alt="404-notfound" />
    </div>
    
  )
}

export default NotFound