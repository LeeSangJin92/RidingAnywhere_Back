import React from 'react';
import "../../css/crewManager.css"

const CrewMember = (props) => {


    return (
        <div className='crewMemberBox'>
            <img src='/img/N_icon.png' alt=''/>
            <div className='crewMemberInfoLine'>
                <div className='memberDataLine'>
                    <h2 className='memberAuthority'>마스터</h2>
                    <h2 className='memberNickName'>낭만가득좌</h2>
                    <h2 className='memberLocation'>서울 / 관악</h2>
                </div>
                <div className='memberDataLine'>
                <h2 className='memberBikeData'>로얄앤필드<br/>스크램 411</h2>
                    <h2 className='memberAge'>29</h2>
                    <input className='crewMemberDetailBtn' type='button' value='관리'/>
                </div>
            </div>
        </div>
    );
};

export default CrewMember;