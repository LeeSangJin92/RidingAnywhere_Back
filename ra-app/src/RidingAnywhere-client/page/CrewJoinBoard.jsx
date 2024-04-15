import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultFooter from '../component/DefaultFooter';
import DefaultHeader from '../component/DefaultHeader_main';
import "../css/CrewJoinBoard.css"
import CrewJoiner from '../component/crewmanager/CrewJoiner';


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

    // 🛠️ 라이더 정보 및 지역 데이터 가져오기
    const checkData = async () => {
        console.log("🛜 라이더 엑세스 체크 중...")
        if(!accessToken){
            console.log("✅ 접속자에게 엑세스 있음!")
            console.log("🛜 라이더 데이터 확인 중...")
            await fetch("/RA/CheckRider",
            {headers:{
                "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                "Content-Type": "application/json;charset=utf-8"}})
            .then(response => {
                if(response.status===200) return response.json();
                else console.log("⛔ 라이더 데이터 수집 실패!");
            }).then(data => {
                console.log("✅ 라이더 데이터 수집 완료!");
                console.log(data)
                let userData = data.userData;
                setriderInfo({...riderInfo,
                    userEmail : userData.userEmail,
                    userName : userData.userName,
                    userNickname : userData.userNickname,
                    userBirthday : userData.userBirthday,
                    userGender : userData.userGender,
                    userPhone : userData.userPhone,
                    userAddressCity : userData.address.city,
                    userAddressTown : userData.address.town,
                    userAuthority : userData.authorityId.authority_name,
                });
                setCrewAddress({
                    CrewCity:userData.address.city,
                    CrewTown:userData.address.town
                })
            }).then(()=>{
                fetch("/RA/AddressData")
                    .then((response)=>{
                        console.log("✅지역 데이터 요청 완료");
                        if(response.status===200) return response.json();
                        else console.log("❌지역 데이터 호출 실패!")
                    }).then((data)=>{
                        console.log("🛠️지역 데이터 저장중...");
                        setAddressList(data);
                        setCityList([...new Set(data.map(data=>data.city))]);
                        console.log("✅지역 데이터 작업 완료")
                    });
            })
        }
    }

    // 🛠️ 맵 로딩 후 1회 실행해야하는 사항들
    useEffect(()=>{checkData()},[])

    // 🛠️ 크루 리스트 지역 필터용 데이터
    const [crewAddress,setCrewAddress] = useState({
        CrewCity:"",
        CrewTown:""
    })

    // 🛠️ 크루 지역 필터 설정
    const changeFilter = (prop) => {
        let filterData = prop.target
        if(filterData.name==="CrewCity"){
            console.log("🛠️ 크루 도시 필터 변경")
            setCrewAddress({
                CrewCity:filterData.value,
                CrewTown:""
            })
        } else {
            console.log("🛠️ 크루 지역 필터 변경")
            setCrewAddress({
                ...crewAddress,
                CrewTown:filterData.value
            })
        }
    }


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
                    <div className='CrewListBoxt_Top'>
                        <input type='text' className='CrewNameSuchBox' placeholder='✏️ 찾고 싶은 크루 이름을 입력하세요'/>
                        <input type='button' className='CrewNameSearchBtn'/>
                        <select name='CrewCity' className='selectCity' value={crewAddress.CrewCity} onChange={changeFilter}>
                            {cityList.map((data,index)=>(<option key={index} value={data}>{data}</option>))}</select>
                        {console.log(riderInfo)}
                        <select name='CrewTown' className='selectTown' value={crewAddress.CrewTown} onChange={changeFilter}>
                            <option value={""}>⚠️선택</option>
                            {addressList.filter(data=>data.city===riderInfo.userAddressCity).map((data,index)=>(<option key={index} value={data.town}>{data.town}</option>))}
                        </select>
                    </div>
                    <div className='CrewListBox_Section'>
                        <CrewJoiner/>
                        <CrewJoiner/>
                        <CrewJoiner/>
                        <CrewJoiner/>
                        <CrewJoiner/>
                        <CrewJoiner/>
                        <CrewJoiner/>
                        <CrewJoiner/>
                        <CrewJoiner/>
                        <CrewJoiner/>
                    </div>
                </div>
            </section>
            <DefaultFooter/>
        </main>
    );
};

export default CrewJoinBoard;