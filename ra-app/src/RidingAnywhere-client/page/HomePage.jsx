import React, { useEffect, useState } from 'react';
import '../css/homepage.css';
import '../css/index.css';
import DefaultFooter from '../component/DefaultFooter';
import OkBtnBox from '../component/OkBtnBox';
import DefaultHeader from '../component/DefaultHeader_main';

const HomePage = () => {

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
                else console.log("❌라이더 데이터 수집 실패!");
            }).then(data => {
                console.log("✅라이더 데이터 수집 완료!");
                if(data.bikeList.length===0){
                    console.log("⚠️입력된 바이크 정보가 없습니다.")
                }
            })

        } else console.log("⛔접속자에게 엑세스 없음")
    }

    useEffect(()=>{
        checkData();
    },[])
    

    return (
        <main>
            <DefaultHeader/>
            <section className='HomeSection'>  {/* 메인 영역 부분*/}
                    <div className='CrewHome'>
                        크루 영역
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