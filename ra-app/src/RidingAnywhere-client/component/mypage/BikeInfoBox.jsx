import React from 'react';

const BikeInfoBox = (props) => {
    let bike = props.data
    console.log(bike)
    return (
        <div className='InfoBox'>
            <div>
                <img className='Mypage_brandImg' src='/img/brand/benelli_logo.png'/>
                <div className='bikeDataLine'>
                    <h4>연식<br/>{bike.bike_year}</h4>
                    <h4>CC<br/>{bike.bike_cc}</h4>
                </div>
            </div>
            <div className='bikeNameLine'>
                <h4>{bike.model_name}</h4>
            </div>
        </div>
    );
};

export default BikeInfoBox;