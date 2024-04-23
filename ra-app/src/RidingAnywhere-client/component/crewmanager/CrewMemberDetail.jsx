import React from 'react';

const CrewMemberDetail = (props) => {
    
    console.log(props.memberData);
    return (
        <div className='CrewMemberDetail'>
            <div className='Detail_Top'>
                <img src='/img/mypage/DefaultProfileImg.png' alt=''></img>
                <div className='MemberInfoBox'>
                    <div className='MemberInfoTitle'>
                        <h2>닉네임</h2>
                        
                        <h2>출석일</h2>
                        <h2>가입일</h2>
                    </div>
                    <div className='MemberInfoData'>
                        <h2>닉네임테스트</h2>
                        <h2>10</h2>
                        <h2>2024.04.02</h2>
                    </div>
                </div>            
            </div>
            <div className='Detail_Mid'>
                <div className='MemberInfoTitle'>
                    <h2>나이</h2>
                    <h2>성별</h2>
                    <h2>지역</h2>
                    <h2>연락처</h2>
                    <h2>이메일</h2>
                </div>
                <div className='MemberInfoData'>
                    <h2>92. 01</h2>
                    <h2>여성</h2>
                    <h2>서울 / 관악</h2>
                    <h2>010-5561-****</h2>
                    <h2>yomko65@gmail.com</h2>
                </div>
            </div>
            <div className='Detail_Bottom'>
                <h2>바이크 라인</h2>
            </div>
        </div>
    );
};

export default CrewMemberDetail;