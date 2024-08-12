import React from 'react';

const ResultBoxTarget = ({title,category,address, lat, lng, onClick}) => {
    const onClickBox = () => {
        onClick({lat, lng})
    }


    return (<div>
            <input type='button' id={"box"+title} onClick={onClickBox} hidden/>
            <label htmlFor={"box"+title} className='ResultBoxTarget'>
                <div className='Top'>
                    <span className='title'>{title}</span>
                    <span className='category'>{category}</span>
                </div>
                <div className='Bottom'>
                    <span className='address'>{address}</span>
                </div>
            </label>
        </div>
    );
};

export default ResultBoxTarget;