import React from 'react';

const CrewJoiner = (props) => {
    let crewData = props.crewData;

    const clickBtn = () => {
        props.setCrewInfo(crewData);
    }


    return (
            <div className='CrewJoiner' onClick={clickBtn}>
                <div className='Data'>
                    <h2>크루 네임</h2>
                    <h2>크루 마스터</h2>
                </div>
                <div className='Data'>
                    <h2>{crewData.CrewName}</h2>
                    <h2>{crewData.CrewMaster}</h2>
                </div>
                <div className='Data'>
                    <h2>활동 지역</h2>
                    <h2>크루 인원</h2>
                </div>
                <div className='Data'>
                    <h2>{crewData.CrewCity} / {crewData.CrewTown}</h2>
                    <h2>😎 {crewData.CrewCount} 명</h2>
                </div>
            </div>
    );
};

export default CrewJoiner;