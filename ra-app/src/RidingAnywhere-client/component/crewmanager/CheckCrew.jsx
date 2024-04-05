import React from 'react';

const CheckCrew = (props) => {
    return (
        <div className='CheckCrew' style={props.showUp?{display:'flex'}:{display:'none'}}>
            <h1>⚠️가입된 크루가 없습니다⚠️</h1>
            <div className='BtnLine'>
                <div className='Create'>
                    <label htmlFor='create_crew'></label>
                    <input id='create_crew' type='button' style={{display:'none'}}/>
                </div>
                <div className='Join'>
                    <label htmlFor='join_crew'></label>
                    <input id='join_crew' type='button' style={{display:'none'}}/>
                </div>
            </div>
        </div>
    );
};

export default CheckCrew;