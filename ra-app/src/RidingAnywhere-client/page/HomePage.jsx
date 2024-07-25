import React, { useEffect, useState } from 'react';
import '../css/homepage.css';
import '../css/index.css';
import DefaultFooter from '../component/DefaultFooter';
import OkBtnBox from '../component/OkBtnBox';
import DefaultHeader from '../component/DefaultHeader_main';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    // 🪙토큰 확인
    const [accessToken, setAccessToken] = useState(!sessionStorage.getItem('accessToken'))
    const checkData = async () => {
        console.log("🛜라이더 엑세스 체크 중...")
        if(!accessToken){
            console.log("✅접속자에게 엑세스 있음!")
            console.log("🛜라이더 데이터 확인 중...")
            await fetch("/RA/CheckRider",
            {headers:{
                "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                "Content-Type": "application/json;charset=utf-8"}})
            .then(response => {
                if(response.status===200) return response.json();
                else if(response.status===401){
                    console.log("❌ 토큰 데이터 만료");
                    alert("⚠️ 로그인 유지 시간 초과 \n - 로그인 페이지로 이동합니다. -");
                    sessionStorage.removeItem('accessToken');
                    navigate('/RA/Login');
                }
            }).then(data => {
                console.log("✅라이더 데이터 수집 완료!");
                console.log(data);
                if(data.bikeList.length===0){
                    console.log("⚠️입력된 바이크 정보가 없습니다.")
                    alert("⚠️ 등록된 바이크가 없습니다. ⚠️\n - 바이크 등록 페이지로 이동합니다 -")
                    navigate("/RA/AddBike")
                }
                console.log("🔎 가입된 크루 조회 중...");
                if(data.userData.authorityId.authorityId===1){
                    console.log("⚠️ 가입된 크루 없음");
                }else{
                    console.log("✅ 가입된 크루 존재");
                    setJoinCrew(true);
                }
            })

        } else console.log("⛔접속자에게 엑세스 없음")
    }

    useEffect(()=>{
        checkData();
    },[])
    
    // 게시판 영역 관련 코드
    const [joinCrew, setJoinCrew] = useState(false);
    const [joinCrewList, setJoinCrewList] = useState([]);
    const [crowBoardList, setCrewBoardList] = useState([]);


    return (
        <main>
            <DefaultHeader/>
            <section className='HomeSection'>  {/* 메인 영역 부분*/}
                    <div className='CrewHome'>
                        {/* 🛠️ 가입된 크루 없을 시 블록 처리 */}
                        <div className='BlockCrewBoard' style={joinCrew?{display:'none'}:{display:'flex'}}>
                            <img src='/img/NotJoiningCrew.png' alt=''></img>
                            <h1>가입된 크루가 없습니다.</h1>
                        </div>
                        
                        {/* ✏️ 크루 게시판글 목록 */}
                        <div className='MiniCrewBoardArea' style={joinCrew?{display:'flex'}:{display:'none'}}>
                            <h1 className='TitleName'>미니 크루 게시글</h1>
                            <div className='ListLine'>
                                <div className='ListHeader'>
                                    <table>
                                        <th>
                                            <td><h2 className='boardType'>말머리</h2></td>
                                            <td><h2 className='boardTitle'>제목</h2></td>
                                            <td><h2 className='boardWriter'>작성자</h2></td>
                                        </th>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='RiderHome'>
                        오픈 게시판 영역
                    </div>
            </section>
            
            {/* ✏️ 픽스로 들어가는 태그 및 컴포넌트 */}
            <OkBtnBox title={"테스트 제목"} context={"테스트 내용"}/>
                <DefaultFooter/>
        </main>
    );
};

export default HomePage;