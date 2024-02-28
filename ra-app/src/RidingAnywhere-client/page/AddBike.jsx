import React, { useEffect, useRef, useState } from 'react';
import '../css/addbikepage.css';
import DefaultFooter from '../component/DefaultFooter';
import DefaultHeader from '../component/DefaultHeader_small';
import AddbikeBrandBtn from '../component/AddbikeBrandBtn';

const AddBike = () => {
    
    const [addBikeData,setAddBikeData] = useState({
        brand : "",
        model : "",
        cc : "",
        year : "",
        state: ""

    },[])
    const [defaultBikeData,setDefaultBikeData] = useState(null,[])
    const modelList = useRef([])
    const brandList = useRef([])
    
    useEffect(() => {
        const getData = async ()=>{
            await fetch("http://localhost:8080/RA/BikeModel")
            .then(response => {
                console.log("바이크 데이터 호출 시도🛜")
                if(response.status===200) return response.json();
            }).then(data => {
                console.log("바이크 데이터 호출 완료✅");
                // 바이크 리스트 저장
                brandList.current = data.bikeBrandList.map(brand=> brand.bikebrand_name);   // 바이크 브랜드 저장
                brandList.current.forEach( brand => {
                    modelList.current = {...modelList.current,[brand]:data.bikeModelList.filter(model => model.bikebrand_id.bikebrand_name === brand)}
                });
            });
            setDefaultBikeData(modelList.current);     // 각 바이크 브랜드 별 모델 저장
        }
        getData();
    },[]);

    const selectBrand = (data) => {
        setAddBikeData({...AddBike,brand:data.target.value+""})
    }


     return (
        <main>
            <section className='Section_addbike'>
                <DefaultHeader word={'바이크 등록'}/>
                <div className='Addbike_Box'>

                    {/* 바이크 브랜드 설정 라인 */}
                    <div className='addbike_line'><h2>바이크 브랜드</h2>
                        <div className='btnLine'>
                            {brandList.current.map((brand)=><AddbikeBrandBtn btnName={"brand"} value={brand} label={brand} onChange={selectBrand}/>)}
                        </div>
                    </div>

                    {/* 바이크 모델 설정 라인 */}
                    <div className='addbike_line'><h2>바이크 모델</h2>
                        <div className='btnLine'>
                            {!addBikeData.brand&&<h2>브랜드를 선택해주세요!</h2>}
                            {console.log(modelList.current[addBikeData.brand])}
                            {/* {!!addBikeData.brand&&modelList.current[(addBikeData.brand)]map()} */}
                        </div>
                    </div>
                    <div className='addbike_line'><h2>바이크 배기량</h2><input type='number' className='seuch_bike' placeholder='ex) 배기량을 입력하세요'/></div>
                    <div className='addbike_line'><h2>바이크 연식</h2><input type='number' className='seuch_bike' placeholder='ex) 연식을 입력하세요'/></div>
                    <div className='addbike_line'><h2>바이크 상태</h2><input type='textbox' className='seuch_bike' placeholder='ex) 인수중, 수리중, 운행중'/></div>
                    <div className='Button_line'>
                        <button className='btn_submit_addbike' id='btnSignUp'>가입 완료</button>
                    </div>
                </div>
            </section>
                <DefaultFooter/>
        </main>
    );
};

export default AddBike;