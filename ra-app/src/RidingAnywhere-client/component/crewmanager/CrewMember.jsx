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
            memberAuth="요청중";     // 크루 가입 요청자
            break;
        default:
    }

    const onClickMember = ()=>{
        console.log("🕹️ 멤버 정보 클릭")
        console.log(memberData)
        props.controller({block:true,up:"Detail"})
        props.setcrewMemberInfo({
            ListIndex : memberData.ListIndex,           // 멤버 리스트 Index
            UserId : memberData.UserId,                 // 멤버 라이더 ID
            UserName : memberData.UserName,             // 멤버 이름
            UserNickname : memberData.UserNickname,     // 멤버 닉네임
            UserEmail : memberData.UserEmail,           // 멤버 이메일
            UserBirthday : memberData.UserBirthday,     // 멤버 생년월일
            UserPhone : memberData.UserPhone,           // 멤버 연락처
            UserCity : memberData.UserCity,             // 멤버 도시
            UserTown : memberData.UserTown,             // 멤버 지역
            UserGender : memberData.UserGender,         // 멤버 성별
            UserState : memberData.UserState,           // 멤버 상태(마스터, 네임드, 멤버, 대기, 신청 등...)
            UserJoinDate : memberData.UserJoinDate,     // 멤버 크루 가입 날짜
            UserCnt : memberData.UserCnt,               // 멤버 크루 일정 참가 횟수
            UserProfile : memberData.UserProfile,       // 멤버 라이더 프로필
            UserBike : memberData.UserBike              // 멤버 대표 바이크
        })
    }

    return (
        <>
            <label className='crewMemberBox' htmlFor='memberInfoBox'>
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
            </label>
            <input type='button' id='memberInfoBox' style={{display:"none"}} onClick={onClickMember}/>
        </>
    );
};

export default CrewMember;