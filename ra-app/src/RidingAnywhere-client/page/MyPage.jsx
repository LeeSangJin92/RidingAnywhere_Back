import React, { useEffect, useState } from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import "../css/mypage.css"

const MyPage = () => {

     // 🪙 토큰 확인
     const [accessToken] = useState(!sessionStorage.getItem('accessToken'))

     // 📷 프로필 이미지 관련 라인
     const [profile,setprofile] = useState()
     const profileimg = data => {
        const imagefile = data.target.files[0];
        const imageUrl = URL.createObjectURL(imagefile);
        setprofile(imageUrl); 
        console.log("✅ 이미지 변경이 완료 되었습니다.")
    }


    // 😎 라이더 정보
     const [riderInfo, setriderInfo] = useState({
        userEmail : "",
        userName : "",
        userNickname : "",
        userBirthday: "",
        userGender:"",
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
                setUpdateRider({...updateRider,userEmail:[data.userData.userEmail,true],userGender:[data.userData.userGender,true]})
                
                if(data.bikeList.length===0){
                    console.log("⚠️입력된 바이크 정보가 없습니다.")
                }
            })
        } else console.log("⛔접속자에게 엑세스 없음")
    }

    // 🛠️ 수정하려는 라이더 정보
    const [updateRider, setUpdateRider] = useState({
        userEmail : [riderInfo.userEmail, true],
        userNickname : ["",false],
        userName : ["",false],
        userPhone:["",false],
        userBirthday: ["",false],
        userGender:[riderInfo.userGender,true]
     })

    // 🛠️ 라이더 정보 수정
    const [changeBtnAct, setchangeBtn] = useState("/img/ChangeBtn.png")
    const [showinput, setinput] = useState(false)

    const changeData = () => {
        switch(changeBtnAct){

            // ✏️ 라이더 정보 수정 시작
            case "/img/ChangeBtn.png" : 
                console.log("🛠️개인정보 수정 중...");
                setinput(true)
                reSetData();
                setchangeBtn("/img/CancelBtn.png");
                break;

             // ✏️ 라이더 정보 수정 취소
            case "/img/CancelBtn.png" : 
                console.log("❌개인정보 수정 취소!");
                reSetData();
                setinput(false)
                setchangeBtn("/img/ChangeBtn.png");
                break;

             // ✏️ 라이더 정보 수정 완료
            case "/img/SaveBtn.png" : 
                console.log("✅개인정보 수정 완료!");
                setinput(false)
                setchangeBtn("/img/ChangeBtn.png");
                break;
            default :
        }
    }
    // ✏️ 수정 취소로 인한 업데이트 데이터 초기화
    const reSetData = () => {
        setUpdateRider({
            userEmail: [riderInfo.userEmail, true],
            userName: ["",false],
            userNickname: ["",false],
            userBirthday: ["",false],
            userPhone: ["",false],
            userGender: [riderInfo.userGender, true]
        });
        document.getElementById('userName').value = "";
        document.getElementById('userNickname').value = "";
        document.getElementById('userBirthday').value = "";
        document.getElementById('userPhone').value = "";
    }

    // ✏️ 라이더 정보 관련 정규표현식 데이터
    const mapRegExp = {
        "userNickname" : new RegExp('^([A-Za-z\\d\\uAC00-\\uD7A3\\u3131-\\u314E]){1,8}$'),
        "userName" : new RegExp('^([가-힣]){3,4}$'),
        "userPhone" : new RegExp('^(010+[\\d]{8,8})$'),
        "userBirthday" : new RegExp('^([\\d]){8,8}$')
    };

    // 🛠️ 수정하는 데이터 입력 받기
    const insertData = (inputData) => {
        let key = inputData.target.name;
        let value = inputData.target.value;
        setUpdateRider({
            ...updateRider,[key]:[value,mapRegExp[key].test(value)]
        })
    }

    

    useEffect(()=>{
        console.log(updateRider);
        !Object.values(updateRider).map(data=>data[1]).includes(false)&&
        setchangeBtn("/img/SaveBtn.png");
        console.log( !Object.values(updateRider).map(data=>data[1]).includes(false))
    },[updateRider])

    return (
        <main>
            <DefaultHeader/>
            <section className='myPage'>
                <page_tile>
                    <h1>마이 페이지</h1>
                </page_tile>
                    <div className='myInfoLine'>
                        <profile>
                            <div className='profile_changeLine'>
                            <h2>프로필</h2>
                            <label id='profile_changeLine' htmlFor='profile_changebtn'><img src={changeBtnAct}></img></label>
                            <input type='button' className='profile_changebtn' id='profile_changebtn' style={{display:'none'}} onClick={changeData}/>
                            </div>
                            <div id='profile_img'>
                                <img src={profile} alt='/img/Log_img.png'/>
                            </div>
                            <label id='prfile_btnLline' htmlFor="profilebtn" style={showinput?{display:'block'}:{display:'none'}}><h3>이미지 변경</h3></label>
                            <input className='profile_btn' type='file' id="profilebtn" style={{display:'none'}} accept='.jpg, .png' onChange={profileimg}/>
                            <h4 style={showinput?{display:'block'}:{display:'none'}}>⚠️크기 : 200px x 200px</h4>
                        </profile>
                    <riderInfo>
                        <tablle>
                            <tr>
                                <td><h2>이메일</h2></td>
                                <td><h2>{riderInfo.userEmail}</h2></td>
                            </tr>
                            <tr>
                                <td><h2>닉네임</h2></td>
                                <td style={showinput?{display:'none'}:{display:'flex'}} className='profile_inputLine'><h2>{riderInfo.userNickname}</h2></td>
                                <td style={showinput?{display:'flex'}:{display:'none'}} className='profile_inputLine'><input className='profile_text' name='userNickname' id='userNickname' placeholder={riderInfo.userNickname} type='text' onChange={insertData}/></td>
                            </tr>
                            <tr>
                                <td><h2>이름</h2></td>
                                <td style={showinput?{display:'none'}:{display:'block'}} className='profile_inputLine'><h2>{riderInfo.userName}</h2></td>
                                <td style={showinput?{display:'block'}:{display:'none'}} className='profile_inputLine'><input className='profile_text' name='userName' id='userName' placeholder={riderInfo.userName} type='text' onChange={insertData}/></td>
                            </tr>
                            <tr>
                                <td><h2>연락처</h2></td>
                                <td style={showinput?{display:'none'}:{display:'block'}} className='profile_inputLine'><h2>{riderInfo.userPhone}</h2></td>
                                <td style={showinput?{display:'block'}:{display:'none'}} className='profile_inputLine'><input className='profile_text' name='userPhone' id='userPhone' placeholder={riderInfo.userPhone} type='text' maxLength={11} onChange={insertData}/></td>
                            </tr>
                            <tr>
                                <td><h2>생일</h2></td>
                                <td style={showinput?{display:'none'}:{display:'block'}} className='profile_inputLine'><h2>{riderInfo.userBirthday}</h2></td>
                                <td style={showinput?{display:'flex'}:{display:'none'}} className='profile_inputLine'><input name='userBirthday' id='userBirthday' placeholder={riderInfo.userBirthday} type='text' maxLength={8} onChange={insertData}/></td>
                            </tr>
                            <tr>
                                <td><h2>성별</h2></td>
                                <td style={showinput?{display:'none'}:{display:'block'}} className='profile_inputLine'><h2>{riderInfo.userGender?"여성 ♀️":"남성 ♂️"}</h2></td>
                                <td style={showinput?{display:'flex'}:{display:'none'}} className='profile_inputLine'>
                                    <input id='gender1' name='changeGender' type='radio' value={false} style={{display:'none'}} />
                                    <label for='gender1'><h3>남자 ♂️</h3></label>
                                    <input id='gender2' name='changeGender' type='radio' value={true} style={{display:'none'}}/>    
                                    <label for='gender2'><h3>여자 ♀️</h3></label>
                                </td>
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