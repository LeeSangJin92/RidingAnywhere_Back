import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css';
import '../css/index.css';
import DefaultFooter from '../component/DefaultFooter';
import OkBtnBox from '../component/OkBtnBox';
import Logout from '../component/Logout';

const HomePage = () => {
    // 🪙토큰 확인
    const [accessToken, setAccessToken] = useState(!sessionStorage.getItem('accessToken'))
    const checkData = async () => {
        console.log("🛜라이더 엑세스 체크 중...")
        if(!accessToken){
            console.log("✅접속자에게 엑세스 있음!")
            console.log("🛜라이더 데이터 확인 중...")
            await fetch("http://localhost:8080/RA/CheckRider",
            {headers:{
                "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                "Content-Type": "application/json;charset=utf-8"}})
            .then(response => {
                if(response.status===200) return response.json();
                else console.log("❌라이더 데이터 수집 실패!");
            }).then(data => {
                console.log("✅라이더 데이터 수집 완료!");
                if(data.bikeList.length===0){
                    console.log("⚠️입력된 바이크 정보가 없습니다.")
                }
            })

        } else console.log("⛔접속자에게 엑세스 없음")
    }

    checkData();
    return (
        <main>
            <header>    {/* 상단 타이틀 부분 */}
                <div className='logimg'>
                    <img src='/img/Log_img.png' id="log_img" alt='logo192.png'/>
                </div>
                <div className='top_line'>
                    <div className='top_tag_line'>
                        <Link to="/RA/Login" className='top_tag' name="unaccesslog_btn" style={{display:!accessToken?"none":"flex"}}>log in</Link>
                        <Link to="/RA/Signup" className='top_tag' name="unaccesslog_btn" style={{display:!accessToken?"none":"flex"}}>Sign Up</Link>
                        <Link to="" className='top_tag' name="accesslog_btn" style={{display:!accessToken?"flex":"none"}}>my page</Link>
                        <Link to="" className='top_tag' name="accesslog_btn" style={{display:!accessToken?"flex":"none"}}>log out</Link>
                    </div>
                    <nav className='topNav'>
                        <div className='NavMiain'>
                            <h1>CREW AREA</h1>
                            <div className='NavMenu'>
                                <div className='NavCategory'>CREW<br/>MASTER</div>      {/*크루 설정, 생성*/}
                                <div className='NavCategory'>CREW<br/>MANAGER</div>     {/*크루원 관리*/}
                                <div className='NavCategory'>CREW<br/>BOARD</div>       {/*크루 게시판*/}
                                <div className='NavCategory'>CREW<br/>PAGE</div>        {/*크루원 페이지*/}
                                <div className='NavCategory'>CREW<br/>JOIN</div>        {/*크루원 모집*/}
                            </div>
                        </div>
                        <div className='NavMiain'>
                            <h1>RIDER AREA</h1>       
                            <div className='NavMenu'>      
                                <div className='NavCategory'>RIDER<br/>BOARD</div>      {/*라이더 커뮤니티*/}
                                <div className='NavCategory'>TOUR<br/>BOARD</div>       {/*투어 게시판*/}
                                <div className='NavCategory'>MOTO<br/>CAMPING</div>     {/*모토 캠핑 게시판*/}
                                <div className='NavCategory'>RIDING<br/>COURSE</div>    {/*라이딩 코스 추천*/}
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            <section>  {/* 메인 영역 부분*/}
                    <div className='CrewHome'>
                        크루 영역
                    </div>
                    <div className='RiderHome'>
                        오픈 게시판 영역
                    </div>
            </section>
            <Logout/>
            <OkBtnBox title={"테스트 제목"} context={"테스트 내용"}/>
                <DefaultFooter/>
        </main>
    );
};

export default HomePage;