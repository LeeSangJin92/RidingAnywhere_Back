import React, { useEffect,  useState } from 'react';
import '../css/addbikepage.css';
import DefaultFooter from '../component/DefaultFooter';
import DefaultHeader from '../component/DefaultHeader_small';
import AddbikeModelBtn from '../component/AddbikeModelBtn';
import AddbikeBrandBtn from '../component/AddbikeBrandBtn';
import { useNavigate } from 'react-router-dom';

const AddBike = () => {
    const navigate = useNavigate();

    const [addBikeData,setAddBikeData] = useState({
        bikeBrand : "",
        bikeModel : "", 
        bikeCC : "",
        bikeYear : "",
        bikeState: ""
    });

    const [accessToken,getAccessToken] = useState(sessionStorage.getItem('accessToken'))
    const [modelList,setModelList] = useState(null)
    const [brandList,setBrandList] = useState(null)
    const [disabledBtn,setdisabledBtn] = useState(false);

    useEffect(() => {
        const getData = async()=>{
            if(!accessToken){
                alert("⚠️로그인이 필요한 페이지 입니다.⚠️\n - 로그인 페이지로 이동합니다. - ")
                navigate("/RA/Login");
            }
            else await fetch("http://localhost:8080/RA/BikeModel")
            .then(response => {
                console.log("바이크 데이터 호출 시도🛜")
                if(response.status===200) return response.json();
            }).then(data => {
                console.log("바이크 데이터 호출 완료✅");

                // 바이크 브랜드 리스트 저장
                setBrandList(data.bikeBrandList.map(brand => brand.bikebrand_name));

                // 바이크 모델 리스트 저장
                setModelList(()=>{
                    const brand = data.bikeModelList.map((data)=>({brand_id:data.bikebrand_id.bikebrand_id, brand_name: data.bikebrand_id.bikebrand_name}));
                    return data.bikeModelList.map(({model_id, model_name, model_cc},index) =>({model_id, model_name, model_cc, ...brand[index]}))
                });
            });
        }
        getData();
    },[]);


    // 바이크 브랜드 선택
    const selectBrand = (data) => {
        let inputData = document.getElementsByClassName("bikeImfoInput");
        inputData[0].selectedIndex = 0;  // input 데이터 초기화
        inputData[1].selectedIndex = 0; 
        console.log("바이크 브랜드 선택");
        setAddBikeData({...addBikeData,
                        bikeBrand:data.target.value,
                        bikeModel : "", 
                        bikeCC : "",
                        bikeYear : "",
                        bikeState: ""});
    }


    // 바이크 모델 선택
    const selectModel = (model)=>{
        console.log("바이크 모델 변경")
        let selectdModel = modelList.filter(modelData=>modelData.model_name===model.target.value)[0];
        setAddBikeData({...addBikeData,
            bikeBrand : selectdModel.brand_name,
            bikeModel : selectdModel.model_name,
            bikeCC : selectdModel.model_cc
        })
    }

    // 바이크 연식 선택
    const selectYear = (inputData) => {
        console.log("바이크 연식 선택");
        (setAddBikeData(!!inputData.target.value?       
            {...addBikeData,bikeYear : inputData.target.value}:
            {...addBikeData,bikeYear : ""}));
    }

    // 바이크 상태 선택
    const selectState = (inputData) => {
        console.log("바이크 상태 선택");
        (setAddBikeData(!!inputData.target.value?
            {...addBikeData,bikeState : inputData.target.value}:
            {...addBikeData,bikeState : ""}));
    }

    useEffect(()=>{
        setdisabledBtn(Object.values(addBikeData).includes(""));
    },[addBikeData])

    // 입력한 바이크 데이터 저장
    const sendAddBikeData = () => {
        console.log("🛜바이크 데이터 서버로 전송")
        fetch("http://localhost:8080/RA/AddBike",{
            method: "POST",
            headers:{
                "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                "Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(addBikeData)
        }).then(response => {
            if(response.status===200){
                alert('✅바이크 추가가 완료 되었습니다!');
                navigate("/RA/Home");
            }
        })
    }

     return (
        <main>
            <section className='Section_addbike'>
                <DefaultHeader word={'바이크 등록'}/>
                <div className='Addbike_Box'>

                    {/* {/* 바이크 브랜드 설정 라인 */}
                    <div className='addbike_line'><h2>바이크 브랜드</h2>
                        <div className='btnLine'>
                            {!!brandList&&brandList.map((brand)=><AddbikeBrandBtn key={brand} btnName={"brand"} brand={brand} onChange={selectBrand}/>)}
                        </div>
                    </div>

                    {/* 바이크 모델 설정 라인 */}
                    <div className='addbike_line'><h2>바이크 모델</h2>
                        <div className='btnLine'>
                            {!addBikeData.bikeBrand&&<h2>브랜드를 선택해주세요!</h2>}
                            {!!addBikeData.bikeBrand&&modelList.filter((model)=>model.brand_name===addBikeData.bikeBrand).map((model)=><AddbikeModelBtn key={model.model_id} btnName={"model"} model={model.model_name} onChange={selectModel}/>)}
                        </div>
                    </div>
                    <div className='bikeImfo_line'>
                        <h2>배기량</h2>
                        <h2>{!addBikeData.bikeCC?"-":addBikeData.bikeCC+" cc"}</h2>
                        <h2>연식</h2>
                        <select onChange={selectYear} className='bikeImfoInput'>
                            <option value="">선택하세요.</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                            <option value="1984">1984</option>
                            <option value="1983">1983</option>
                            <option value="1982">1982</option>
                            <option value="1981">1981</option>
                            <option value="1980">1980</option>
                        </select>
                        <h2>상태</h2>   
                        <select onChange={selectState} className='bikeImfoInput'>
                            <option value="">선택하세요.</option>
                            <option value="운행중">운행중</option>
                            <option value="대기중">대기중</option>
                            <option value="수리중">수리중</option>
                            <option value="인수중">인수중</option>
                            <option value="폐차중">폐차중</option>
                        </select>
                    </div>
                    <div className='button_line'>
                        <button className='btn_submit_addbike' id='btnSignUp' disabled={disabledBtn} onClick={sendAddBikeData}>가입 완료</button>
                    </div>
                </div>
            </section>
                <DefaultFooter/>
        </main>
    );
};

export default AddBike;