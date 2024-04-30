import React from 'react';

const CrewMemberDetail = (props) => {
    let memberData = props.memberData;
    const clickCloseBtn = () => {
        console.log("🕹️ 멤버 상세 정보 닫음")
        props.controller({block:false,up:""})
    }
    return (
        <div className='CrewMemberDetail'>
            {props.memberData.ListIndex!==""&&
                <>
                    <input type='button' className='CloseDetailBtn' onClick={clickCloseBtn}></input>
                    <div className='Detail_Top'>
                    <img src='/img/mypage/DefaultProfileImg.png' alt=''></img>
                    <div className='MemberInfoBox'>
                        <div className='MemberInfoTitle'>
                            <h2>닉네임</h2>
                            <h2>지역</h2>
                            <h2>생년월</h2>
                            <h2>성별</h2>
                        </div>
                        <div className='MemberInfoData'>
                            <h2>{memberData.UserNickname}</h2>
                            <h2>{memberData.UserCity} / {memberData.UserTown}</h2>
                            <h2>{memberData.UserBirthday.slice(2,4)} . {memberData.UserBirthday.slice(4,6)}</h2>
                            <h2>{memberData.UserGender?"여성":"남성"}</h2>
                        </div>
                    </div>            
                </div>
                <div className='Detail_Mid'>
                    <div className='MemberInfoLine'>
                        <div className='MemberInfoEmail'>
                            <h2>이메일</h2>
                            <h2>{memberData.UserEmail}</h2>
                        </div>
                        <div className='MemberInfoCnt'>
                            <h2>출석일</h2>
                            <h2>{memberData.UserCnt}</h2>
                        </div>
                    </div>
                    <div className='MemberInfoLine'>
                        <div className='MemberInfoPhone'>
                            <h2>연락처</h2>
                            <h2>{memberData.UserPhone.slice(0,3)+"-"+memberData.UserPhone.slice(3,7)+"-****"}</h2>
                        </div>
                        <div className='MemberInfoJoin'>
                            <h2>{memberData.UserState==="CrewJoiner"?"요청일":"가입일"}</h2>
                            <h2>{memberData.UserJoinDate.slice(0,10)}</h2>
                        </div>
                    </div>
                </div>
                <div className='Detail_Bottom'>
                    <h2>바이크 라인</h2>
                </div>
            </>
            }
        </div>
    );
};

export default CrewMemberDetail;