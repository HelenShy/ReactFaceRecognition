import React from 'react';


const Rank = ({name, entries}) => {
    return(
      <div className=" w-100 ">
      <div className="white f3 tc">
        <p>{`${name}, your current rank is ...`}</p>
      </div>
      <div className="white f2 tc">
        <p>{entries}</p>
      </div>
      </div>
    )
}

export default Rank;
