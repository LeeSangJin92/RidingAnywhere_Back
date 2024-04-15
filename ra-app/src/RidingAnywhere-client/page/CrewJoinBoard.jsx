import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultFooter from '../component/DefaultFooter';
import DefaultHeader from '../component/DefaultHeader_main';
import "../css/CrewJoinBoard.css"


// 크루 가입 게시판
const CrewJoinBoard = () => {

    const navigate = useNavigate();

    // ✏️ 지역 관련 데이터 변수
    const [addressList, setAddressList] = useState([]);
    const [cityList, setCityList] = useState([""])

    // 🔐 토큰 체크
    const [accessToken] = useState(!sessionStorage.getItem('accessToken'));

     // 😎 라이더 정보
     const [riderInfo, setriderInfo] = useState({
        userEmail : "",
        userName : "",
        userNickname : "",
        userBirthday : "",
        userGender : "",
        userPhone : "",
        userAddressCity:"",
        userAddressTown:"",
        userAuthority:"",
     });

    return (
        <main>
            <DefaultHeader/>
            <section className='CrewJoinBoard'>
                <div className='CrewInfoBox'>
                    <div className='CrewInfoBox_Top'>
                        <h1>크루 이름</h1>
                        <label htmlFor='JoinBtn' className='JoinBtnLabel'/>
                        <input id='JoinBtn' style={{display:'none'}}/>
                    </div>
                    <div className='CrewInfoBox_Main'>
                        <div>
                            <h2>크루 마스터</h2>
                            <h2>닉네임 칸</h2>
                        </div>
                        <div>
                            <h2>크루 인원</h2>
                            <h2>😎 100명</h2>
                        </div>
                        <div>
                            <h2>활동 장소</h2>
                            <h2>서울 / 관악</h2>
                        </div>
                    </div>
                    <div className='CrewInfoBox_Botton'>
                        <h1>크루 인사말</h1>
                        <h2 className='CrewContextBox'>크루 인사말 영역</h2>
                    </div>
                </div>
                <div className='CrewListBox'>

                </div>
            </section>
            <DefaultFooter/>
        </main>
    );
};

export default CrewJoinBoard;