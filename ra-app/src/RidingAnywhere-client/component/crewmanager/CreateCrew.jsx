import React, { useEffect, useState } from 'react';

const CreateCrew = (props) => {

    // 🛠️ 크루 생성을 위한 기본 변수값
    const [crewData,setCrewData] = useState({
        crew_name:"",
        crew_city:"",
        crew_town:"",
        crew_context:""
        })

    // ✏️ 지역 관련 데이터 변수
    const [addressList, setAddressList] = useState([]);
    const [cityList, setCityList] = useState([""])

    // 🛜 지역 데이터 호출
    useEffect(()=>{
        console.log("🛜지역 데이터 요청중...")
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
        })
    },[])

    // ✏️ 작성되는 데이터 저장
    const setData = (props) => {
        switch(props.target.name){
            case "crew_city" :
                setCrewData({...crewData, crew_city:props.target.value, crew_town:""});
                break;
                default :
                setCrewData({...crewData,[props.target.name]:props.target.value})
        }
    }

    const clickCreate = async() => {
        console.log("🔎입력한 데이터 체크중...")
        if(Object.values(crewData).includes("")){
            console.log("❌입력 데이터 부족")
            alert(`⚠️크루 생성을 위한 정보가 부족합니다⚠️\n- 입력한 정보를 확인해주세요! -`)
        }
        else{
            console.log("🛜서버로 데이터 전송중...")
            await fetch("/CR/Create",{
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json;charset=utf-8"},
                body:JSON.stringify(crewData)
            }).then(response=>{
                console.log("✅수신 완료");
                console.log(response);
            })
        }
    }

    return (
            <div className='CreateCrew' style={props.showUp?{display:"flex"}:{display:"none"}}>
                <h1>크루 생성</h1>
                <div className='CreateInputLine'>
                    <h2>크루 명</h2>
                    <div className='TextLine'>
                        <input name='crew_name' type='text' maxLength={10} onChange={setData}/>
                    </div>
                </div>
                <div className='CreateInputLine'>
                    <h2>활동 지역</h2>
                    <div className='SelectLine'>
                        <select name='crew_city' className='selectCity' onChange={setData}>
                    <option value={""}>도시</option>
                    {cityList.map(data=>(<option value={data}>{data}</option>))}</select>
                    <select name='crew_town' className='selectTown' onChange={setData} value={crewData.crew_town}>
                        {console.log(crewData)}
                        <option value={""}>⚠️선택</option>
                        {addressList.filter(data=>data.city===crewData.crew_city).map(data=>(<option value={data.town}>{data.town}</option>))}
                    </select>
                    </div>
                </div>
                <div className='CreateInputLine'>
                    <div>
                        <h2>인사말</h2>
                        <h4>(✏️ {crewData.crew_context.length} / 100 )</h4>
                    </div>
                    <textarea name='crew_context' className='CrewContext_input' rows={4} cols={30} maxLength={100} onChange={setData}/>
                </div>
                <div className='CreateCrewBtn_Line'>
                    <label className='Ok' htmlFor='Create_Ok'></label>
                    <input id='Create_Ok' type='button' style={{display:"none"}} onClick={clickCreate}/>
                    <label className='Cancel' htmlFor='Create_Non'></label>
                    <input id='Create_Non' type='button' style={{display:"none"}}/>
                </div>
            </div>
    );
};

export default CreateCrew;