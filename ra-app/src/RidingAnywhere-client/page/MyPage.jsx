import React, { useEffect, useState } from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import "../css/mypage.css"

const MyPage = () => {

     // 🪙 토큰 확인
     const [accessToken] = useState(!sessionStorage.getItem('accessToken'))

     // 📷 프로필 관련 라인
     const [profile,setprofile] = useState()
     
     const profileimg = data => {
        const imagefile = data.target.files[0];
        const imageUrl = URL.createObjectURL(imagefile);
        console.log(imagefile);
        setprofile(imageUrl); 
        console.log("✅ 이미지 변경이 완료 되었습니다.")
    }

    // 😎 라이더 정보
     const [riderInfo, setriderInfo] = useState({
        userEmail : "",
        userName : "",
        userNickname : "",
        userBirthday: "",
        Gender:"",
        userPhone:""
     })

    // 🤝 크루 정보
    const [crewInfo, setcrewInfo] = useState({})

    // 🏍️ 오토바이 정보
    const [bikeInfo, setbikeInfo] = useState({})

    useEffect(()=>{
        checkData();
    },[])

     // ✏️ 토큰으로 라이더 정보 가져오기
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
                setriderInfo({...riderInfo,...data.userData})
                
                if(data.bikeList.length===0){
                    console.log("⚠️입력된 바이크 정보가 없습니다.")
                }
            })
        } else console.log("⛔접속자에게 엑세스 없음")
    }
    console.log(riderInfo)

    return (
        <main>
            <DefaultHeader/>
            <section className='myPage'>
                <page_tile>
                    <h1>마이 페이지</h1>
                </page_tile>
                    <div className='myInfoLine'>
                        <profile>
                            <h2>프로필</h2>
                            <div id='profile_img'>
                                <img src={profile} alt='/img/Log_img.png'/>
                            </div>
                            <label id='prfile_btnLline' htmlFor="profilebtn"><h3>이미지 변경</h3></label>
                            <input className='profile_btn' type='file' id="profilebtn" style={{display:'none'}} accept='.jpg, .png' onChange={profileimg}/>
                            <h3>200px x 200px</h3>
                        </profile>
                    <riderInfo>
                        <tablle>
                            <tr>
                                <td><h2>이메일</h2></td>
                                <td><h2>{riderInfo.userEmail}</h2></td>
                            </tr>
                            <tr>
                                <td><h2>닉네임</h2></td>
                                <td><h2>{riderInfo.userNickname}</h2></td>
                            </tr>
                            <tr>
                                <td><h2>이름</h2></td>
                                <td><h2>{riderInfo.userName}</h2></td>
                            </tr>
                            <tr>
                                <td><h2>연락처</h2></td>
                                <td><h2>{riderInfo.userPhone}</h2></td>
                            </tr>
                            <tr>
                                <td><h2>생일</h2></td>
                                <td><h2>{riderInfo.userBirthday}</h2></td>
                            </tr>
                            <tr>
                                <td><h2>성별</h2></td>
                                <td><h2>{riderInfo.Gender?"여성 ♀️":"남성 ♂️"}</h2></td>
                            </tr>
                        </tablle>
                    </riderInfo>
                </div>
            </section>
            <DefaultFooter/>
        </main>
    );
};

export default MyPage;