import React from 'react';
import "../../css/crewManager.css"

const CrewMember = (props) => {
    let memberData = props.memberData;
    let memberAuth = "";
    switch(memberData.UserState){
        case "CrewMaster":
            memberAuth="마스터";        // 크루 마스터
            break;
        case "CrewNamed":
            memberAuth="네임드";        // 크루 네임드
            break;
        case "CrewMember":
            memberAuth="멤버";          // 크루 일반 멤버
            break;
        case "CrewJoiner":
            memberAuth="가입 요청";     // 크루 가입 요청자
            break;
        default:
    }

    console.log(memberData);
    return (
        <div className='crewMemberBox'>
            <img src={!memberData.UserProfile?'/img/mypage/DefaultProfileImg.png':('data:image/png;base64,'+memberData.UserProfile)} alt=''/>
            <div className='crewMemberInfoLine'>
                <div className='memberDataLine_Top'>
                    <h2 className='memberAuthority'>{memberAuth}</h2>
                    <h2 className='memberNickName'>{"닉네임 : " + memberData.UserNickname}</h2>
                </div>
                <div className='memberDataLine_Bottom'>
                    <div className='Bottom_Title'>
                        <h2>지역</h2>
                        <h2>나이</h2>
                    </div>
                    <div className='Bottom_Data'>
                        <h2 className='memberLocation'>{memberData.UserCity} / {memberData.UserTown}</h2>
                        <h2 className='memberAge'>{(memberData.UserBirthday+"").substring(2,4)+" . "+(memberData.UserBirthday+"").substring(4,6)}</h2>
                    </div>
                    <div className='Bottom_Bike'>
                        <h2 className='memberBikeData'>{memberData.UserBike.bikeModel.bikebrand_id.bikebrand_name}</h2>
                        <h2 className='memberBikeData'>{memberData.UserBike.bikeModel.model_name}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrewMember;