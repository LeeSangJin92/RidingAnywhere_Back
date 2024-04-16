import React, { useEffect, useState } from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import "../css/crewManager.css";
import { useNavigate } from 'react-router-dom';
import CreateCrew from '../component/crewmanager/CreateCrew';
import CheckCrew from '../component/crewmanager/CheckCrew';


// 🛠️ 크루 관리 페이지
const CrewManager = () => {
    const navigate = useNavigate();

    // ✏️ 지역 관련 데이터 변수
    const [addressList, setAddressList] = useState([]);
    const [cityList, setCityList] = useState([""])

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
                    return data.crewId;
                }).then(async (crewId)=>{
                    console.log("🔎 크루 데이터 조회 중...")
                    await loadCrewData(crewId);
                }).then(async ()=>{
                    console.log("🛜지역 데이터 요청중...")
                    await fetch("/RA/AddressData")
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
        } else {
            console.log("⛔ 접속자에게 엑세스 없음");
            alert("⚠️로그인이 필요합니다.⚠️\n - 로그인 페이지로 이동합니다. - ")
            console.log("🛠️ 로그인 페이지로 이동")
            navigate("/RA/login");
        }
    }

    const loadCrewData = async (props) => {
            let crewId = props;
            if(!crewId){
                console.log("⚠️ 가입된 크루가 없음.");
                showUpController({block:true,up:"Check"});
            } else{
                console.log("✅ 가입된 크루 존재");
                console.log("🛜 크루 데이터 호출중...")
                await fetch("/CR/LoadCrewData",{
                    method:"POST",
                    headers:{
                    "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json;charset=utf-8"},
                    body:JSON.stringify(crewId)
                }).then((response)=>{
                    if(response.status===200) return response.json();
                    else console.log("❌크루 데이터 호출 실패")
                }).then(data=>{
                    console.log("✅ 크루 데이터 호출 완료")
                    setCrewInfo({...crewInfo,
                        CrewId:data.crew_id,
                        CrewName:data.crew_name,
                        CrewMaster:data.user.userNickname,
                        CrewContext:data.crew_context,
                        CrewCity:data.crew_location.city,
                        CrewTown:data.crew_location.town,
                        CrewCount:data.crew_count
                    })
                    setUpdateCrewInfo({...updateCrewInfo,
                        CrewContext:data.crew_context,
                        CrewCity:data.crew_location.city,
                        CrewTown:data.crew_location.town
                    })
                    return data.crew_id;
                }).then(crewId =>  {
                    console.log("🛜 크루 멤버 데이터 호출중...")
                    fetch("/CR/GetCrewMember",{
                        method:"POST",
                        headers:{
                        "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json;charset=utf-8"},
                        body:JSON.stringify(crewId)
                    }).then(response=>{
                        console.log("✅ 크루 멤버 응답 완료")
                        if(response.status===200) return response.json()
                        else console.log("❌ 크루 멤버 응답 실패")
                    }).then(data=>{
                        console.log("🔎 크루 멤버 리스트")
                    })
                })  
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
        CrewId:"",
        CrewName:"",
        CrewMaster:"",
        CrewContext:"",
        CrewCity:"",
        CrewTown:"",
        CrewCount:0,
    });

    // 👪 크루 멤버 정보
    const [crewMember, setCrewMember] = useState([])

    // 🕹️ 크루 수정 컨트롤러
    const [crewInfoBtn, setInfoBtn] = useState({
        ChangeMode:false,
        CheckAddress:"Non",
        CheckContext:"Non",
        SaveBtnAddress:{display:'none', backgroundImage:"url('/img/crewmanager/SaveBtnOff.png')"},
        SaveBtnContext:{display:'none', backgroundImage:"url('/img/crewmanager/SaveBtnOff.png')"},
        ChangeBtn:{backgroundImage:"url('/img/crewmanager/ChangeBtn.png')"},
        AddressSelect:{display:'none'},
        ContextArea : {display:'none'}
    })

    const [updateCrewInfo, setUpdateCrewInfo] = useState({
        CrewContext:"",
        CrewCity:"",
        CrewTown:""
    })

    const clickChangeBtn = () => {
        if(crewInfoBtn.ChangeMode){
            console.log("❌ 크루 수정 데이터 리셋")
            setInfoBtn({...crewInfoBtn,ChangeMode:false,
                        ChangeBtn:{backgroundImage:"url('/img/crewmanager/ChangeBtn.png')"},
                        CheckAddress:"Non",
                        CheckContext:"Non",
                        SaveBtnAddress:{display:'none', backgroundImage:"url('/img/crewmanager/SaveBtnOff.png')"},
                        SaveBtnContext:{display:'none', backgroundImage:"url('/img/crewmanager/SaveBtnOff.png')"},
                        AddressSelect:{display:'none'},
                        ContextArea : {display:'none'}
                    })
            setUpdateCrewInfo({
                            CrewContext:crewInfo.CrewContext,
                            CrewCity:crewInfo.CrewCity,
                            CrewTown:crewInfo.CrewTown
            })
        } else {
                console.log("🛠️ 크루 수정 모드로 전환")
                setInfoBtn({...crewInfoBtn,ChangeMode:true,
                        ChangeBtn:{backgroundImage:"url('/img/crewmanager/CancelBtn.png')"},
                        CheckAddress:"Non",
                        CheckContext:"Non",
                        SaveBtnAddress:{display:'flex', backgroundImage:"url('/img/crewmanager/SaveBtnOff.png')"},
                        SaveBtnContext:{display:'flex', backgroundImage:"url('/img/crewmanager/SaveBtnOff.png')"},
                        AddressSelect:{display:'flex'},
                        ContextArea : {display:'flex'}
                    })
        }
    }

    const datainsert = (props) => {
        let data = props.target;
            switch(data.name){
                case "CrewCity":
                    setInfoBtn({
                        ...crewInfoBtn,CheckAddress:"Denied",SaveBtnAddress:{display:'flex', backgroundImage:"url('/img/crewmanager/DeniedBtn.png')"},
                    })
                    setUpdateCrewInfo({...updateCrewInfo,[data.name]:data.value})
                    break;
                case "CrewTown":
                    if(data.value==="") setInfoBtn({
                        ...crewInfoBtn,CheckAddress:"Denied",SaveBtnAddress:{display:'flex', backgroundImage:"url('/img/crewmanager/DeniedBtn.png')"},
                    });
                    else if(data.value!==crewInfo.CrewTown)setInfoBtn({
                        ...crewInfoBtn,CheckAddress:"OK",SaveBtnAddress:{display:'flex', backgroundImage:"url('/img/crewmanager/SaveBtnOn.png')"},
                    }); else setInfoBtn({
                        ...crewInfoBtn,CheckAddress:"Non",SaveBtnAddress:{display:'flex', backgroundImage:"url('/img/crewmanager/SaveBtnOff.png')"},
                    }); 
                    setUpdateCrewInfo({...updateCrewInfo,[data.name]:data.value})
                    break;
                case "CrewContext":
                    if(data.value.length>100){
                        alert("⚠️크루 인사말은 100자 이하입니다.");
                    } else {
                        if((data.value===""))
                        setInfoBtn({
                            ...crewInfoBtn,CheckContext:"Denied",SaveBtnContext:{display:'flex', backgroundImage:"url('/img/crewmanager/DeniedBtn.png')"},
                        });
                        else if(data.value===crewInfo.CrewContext)setInfoBtn({
                            ...crewInfoBtn,CheckContext:"Non",SaveBtnContext:{display:'flex', backgroundImage:"url('/img/crewmanager/SaveBtnOff.png')"},
                        }); 
                        else (setInfoBtn({
                            ...crewInfoBtn,CheckContext:"OK",SaveBtnContext:{display:'flex', backgroundImage:"url('/img/crewmanager/SaveBtnOn.png')"},
                        }));
                        setUpdateCrewInfo({...updateCrewInfo,[data.name]:data.value});}
                    break;
                default :
                    break;
            }
        }

    const saveAddressData = async () => {
        console.log("🔎 지역 데이터 검증 중...");
        switch(crewInfoBtn.CheckAddress){
            case "Denied" :
                console.log("❌ 지역 데이터 부족")
                alert("⚠️크루 지역을 선택해주세요!⚠️");
                break;
            case "Non" :
                console.log("❌ 수정 데이터 없음")
                alert("⚠️수정된 사항이 없습니다.⚠️")
                break;
            case "OK":
                console.log("✅ 지역 검중 완료");
                console.log("🛜 지역 데이터 서버 요청");
                let data = {
                    crew_id:crewInfo.CrewId,
                    crew_city:updateCrewInfo.CrewCity,
                    crew_town:updateCrewInfo.CrewTown
                };
                console.log(data)
                await fetch("/CR/ChangeAddress",{
                    method:"POST",
                    headers:{
                        "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json;charset=utf-8"},
                    body:JSON.stringify(data)
                }).then(response=>{
                    if(response.status===200) {console.log("✅서버 동작 완료"); return response.json()}
                    else(console.log("❌ 서버 작업 실패"))
                }).then(data=>{
                    console.log("🛠️ 크루 데이터 최신화")
                    loadCrewData(data.crew_id);
                    setInfoBtn({
                        ...crewInfoBtn,CheckAddress:"Non",SaveBtnAddress:{display:'flex', backgroundImage:"url('/img/crewmanager/SaveBtnOff.png')"},
                    }); 
                })
                break;
            default : 
        }
    }

    const saveContext = async () => {
        console.log("🔎 크루 인사말 검증 중...")
        switch(crewInfoBtn.CheckContext){
            case "Denied" :
                console.log("❌ 인사말 데이터 Null")
                alert("⚠️인사말은 꼭 입력해주세요!⚠️");
                break;
            case "Non" :
                console.log("❌ 수정 데이터 없음")
                alert("⚠️수정된 사항이 없습니다.⚠️")
                break;
            case "OK":
                console.log("✅ 크루 인사말 검증 완료")
                console.log("🛜 인사말 데이터 서버 요청");
                let data = {
                    crew_id:crewInfo.CrewId,
                    crew_context:updateCrewInfo.CrewContext
                };
                await fetch("/CR/ChangeContext",{
                    method:"POST",
                    headers:{
                        "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json;charset=utf-8"},
                    body:JSON.stringify(data)
                }).then(response=>{
                    if(response.status===200) {console.log("✅서버 동작 완료"); return response.json()}
                    else(console.log("❌ 서버 작업 실패"))
                }).then(data=>{
                    console.log("🛠️ 크루 데이터 최신화")
                    loadCrewData(data.crew_id);
                    setInfoBtn({
                        ...crewInfoBtn,CheckContext:"Non",SaveBtnContext:{display:'flex', backgroundImage:"url('/img/crewmanager/SaveBtnOff.png')"},
                    });

                })

                break;
            default : 
        }
    }

    return (
        <main>
            <DefaultHeader/>
            <section className='crewManager'>
                {/* 🛠️ 백그라운드 클릭 방지용 */}
                 <div className='LayoutBlock' style={showUpControl[0]?{display:'flex'}:{display:'none'}}>
                    {/* 🛠️ 크루 생성 또는 가입 */}
                    <CheckCrew controller={showUpController} showUp={showUpControl[1]==='Check'?true:false}/>
                    {/* 🛠️ 크루 생성 창 */}
                    <CreateCrew addressList={addressList} cityList={cityList} controller={showUpController} showUp={showUpControl[1]==='Create'?true:false}/>
                 </div>
                
                {/* 🛠️ 크루 정보 관련 라인 */}
                <div className='crewInfoLine'>
                    {/* 크루 정보 탑 */}
                    <div className='crewInfoLine_Top'>
                        <h1 className='crewName'> {crewInfo.CrewName} </h1>
                        <label htmlFor='saveAddressBtn' className='CrewBtn' name='save' style={crewInfoBtn.SaveBtnAddress} />
                        <input id="saveAddressBtn" type='button' style={{display:'none'}} onClick={saveAddressData}/>
                        <label htmlFor='changeModeBtn' className='CrewBtn' name='change' style={crewInfoBtn.ChangeBtn}/>
                        <input id="changeModeBtn" type='button' style={{display:'none'}} onClick={clickChangeBtn}/>
                        
                    </div>
                    <div className='crewInfoBox'>
                        <div className='crewInfoBox_Line'>
                                <div className='line'>
                                    <h2>크루 마스터</h2>
                                    <h2>{crewInfo.CrewMaster}</h2>
                                </div>
                                <div className='line'>
                                    <h2>크루 인원</h2>
                                    <h2>😎 {crewInfo.CrewCount} 명</h2>
                                </div>
                                <div className='line'>
                                    <h2>활동 지역</h2>
                                    <h2 style={crewInfoBtn.ChangeMode?{display:'none'}:{display:'flex'}}>{crewInfo.CrewCity} / {crewInfo.CrewTown}</h2>
                                    <div className='addressSelectBox' style={crewInfoBtn.AddressSelect} >
                                        <select name='CrewCity' className='selectCity' onChange={datainsert} value={updateCrewInfo.CrewCity}>
                                            {cityList.map((data,index)=>(<option key={index} value={data}>{data}</option>))}</select>
                                        <select name='CrewTown' className='selectTown' onChange={datainsert} value={updateCrewInfo.CrewTown}>
                                            <option value={""}>⚠️선택</option>
                                            {addressList.filter(data=>data.city===updateCrewInfo.CrewCity).map((data,index)=>(<option key={index} value={data.town}>{data.town}</option>))}
                                        </select>
                                    </div>
                                </div>
                        </div>
                        <div className='crewContext'>
                            <div className='crewContext_Top'>
                                <h1>크루 소개</h1>
                                <label htmlFor='saveContext' className='CrewBtn' name='save' style={crewInfoBtn.SaveBtnContext}/>
                                <input id="saveContext" type='button' style={{display:'none'}} onClick={saveContext}/>
                            </div>
                            <div className='crewContextBox'>
                                <h2 style={crewInfoBtn.ChangeMode?{display:'none'}:{display:"flex"}}>{crewInfo.CrewContext}</h2>
                                <textarea name='CrewContext' style={crewInfoBtn.ContextArea} value={updateCrewInfo.CrewContext} className='crewContextArea' placeholder={crewInfo.CrewContext} onChange={datainsert}></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🛠️ 크루원 관리 라인 */}
                <div className='crewListLine'>
                    <h1>크루 리스트</h1>
                    <div className='crewMenberBoxLine'>
                        {/* 크루 멤버 목록 */}
                        {console.log()}
                    </div>
                </div>
                
            </section>
            <DefaultFooter/>
        </main>
    );
};

export default CrewManager;