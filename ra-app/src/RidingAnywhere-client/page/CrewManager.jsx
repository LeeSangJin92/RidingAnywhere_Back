import React, { useEffect, useState } from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import "../css/crewManager.css";
import CrewMember from '../component/crewmanager/CrewMember';
import { useNavigate } from 'react-router-dom';
import CreateCrew from '../component/crewmanager/CreateCrew';
import CheckCrew from '../component/crewmanager/CheckCrew';


// 🛠️ 크루 관리 페이지
const CrewManager = () => {

    const navigate = useNavigate();

    // 토큰 체크
    const [accessToken] = useState(!sessionStorage.getItem('accessToken'))

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
     })

     // 📷 프로필 이미지 정보
    const [profile,setprofile] = useState(null)

     // 🏍️ 바이크 정보
    const [bikeInfo, setbikeInfo] = useState()

     // 🛠️ 창 관리용 [백그라운드 블록 on/off, "창 종류"]
    const [showUpControl,setShowup] = useState([false,""])

     // ✏️ 토큰으로 라이더 정보 가져오기
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
                else console.log("⛔ 라이더 데이터 수집 실패!");
            }).then(data => {
                console.log("✅라이더 데이터 수집 완료!");
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
                !!userData.userProfile&&setprofile('data:image/png;base64,'+userData.userProfile);
                if(data.bikeList.length===0){
                    console.log("⛔ 바이크 저장 이력 없음")
                    alert("⚠️입력된 바이크 정보가 없습니다.⚠️\n - 바이크 추가 페이지로 이동합니다. - ")
                    console.log("🛠️ 바이크 추가 페이지로 이동")
                    navigate("/RA/Addbike");
                }
                else {
                    setbikeInfo(data.bikeList.map((data,index)=>{
                        const bikeData = {
                            bike_index:index,
                            bike_id:data.bikegarage_id,
                            bike_year:data.bike_year,
                            bike_cc:data.bikeModel.model_cc,
                            bike_select:data.bike_select,
                            model_name:data.bikeModel.model_name,
                            bikebrand_logo:data.bikeModel.bikebrand_id.bikebrand_logo,
                        }
                        return bikeData
                    }))
                    console.log("✅ 바이크 데이터 수집 완료")}
                return data.userData;
            }).then(userData => {
                if(!userData.crew){
                    console.log("⚠️ 가입된 크루가 없음.");
                    showUpController({block:true,up:"Check"});
                } else{
                    console.log("✅ 가입된 크루 존재");
                }
            })
        } else {
            console.log("⛔ 접속자에게 엑세스 없음");
            alert("⚠️로그인이 필요합니다.⚠️\n - 로그인 페이지로 이동합니다. - ")
            console.log("🛠️ 로그인 페이지로 이동")
            navigate("/RA/login");
        }
        
    }

    // 🔎 랜더링때 1회 실행용
    useEffect(()=>{
        checkData();
    },[])

    const showUpController = (props) => {
        console.log("✅ 창 관리 변경")
        setShowup([props.block,props.up])
    }


    // 👪 크루 정보
    const [crewInfo, setCrewInfo] = useState({
        CrewName:"낭만 라이더",
        CrewMaster:"",
        CrewContext:"낭만이 가득한 라이더들의 모임에 어서오세요~",
        CrewPlaces:"",
        CrewCount:0,
        CrewList:[],
    });

    return (
        <main>
            <DefaultHeader/>
            <section className='crewManager'>
                {/* 🛠️ 백그라운드 클릭 방지용 */}
                 <div className='LayoutBlock' style={showUpControl[0]?{display:'flex'}:{display:'none'}}>
                    {/* 🛠️ 크루 생성 또는 가입 */}
                    <CheckCrew controller={showUpController} showUp={showUpControl[1]==='Check'?true:false}/>
                    {/* 🛠️ 크루 생성 창 */}
                    <CreateCrew showUp={showUpControl[1]==='Create'?true:false}/>
                 </div>
                
                {/* 🛠️ 크루 정보 관련 라인 */}
                <div className='crewInfoLine'>
                    <div>
                        <h1 className='crewName'> {crewInfo.CrewName} </h1>
                    </div>
                    <div className='crewInfoBox'>
                        <div className='crewInfoTable'>
                            <table>
                                <tr>
                                    <th><h2>크루 마스터</h2></th>
                                    <td><h2>마스터 닉네임</h2></td>
                                </tr>
                                <tr>
                                    <th><h2>크루 인원</h2></th>
                                    <td><h2>😎 100명</h2></td>
                                </tr>
                                <tr>
                                    <th><h2>활동 지역</h2></th>
                                    <td><h2>서울 경기</h2></td>
                                </tr>
                            </table>
                        </div>
                        <div className='crewContext'>
                            <h1>크루 소개</h1>
                            <div className='crewContextBox'>
                                <h2>{crewInfo.CrewContext}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🛠️ 크루원 관리 라인 */}
                <div className='crewListLine'>
                    <h1>크루 리스트</h1>
                    <div className='crewMenberBoxLine'>
                        <CrewMember/>
                        <CrewMember/>
                        <CrewMember/>
                    </div>
                </div>
                
            </section>
            <DefaultFooter/>
        </main>
    );
};

export default CrewManager;