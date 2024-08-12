import React, { useEffect, useRef, useState} from 'react';
import "../css/naverMap.css"
import ResultBoxTarget from './navermap/ResultBoxTarget';
import ResultBoxAddress from './navermap/ResultBoxAddress';

const NaverMap = ({hidden, mapHiddenControl}) => {

  // ✏️ 기본값 정리
  const {naver} = window;
  const naverMap = useRef(null);
  const [location, setLocation] = useState("");   // ✏️ 장소 이름
  const [address, setAddress] = useState("");     // ✏️ 주소
  const [coordinate, setCoordinate] = useState({  // ✏️ 좌표 코드
    lat:37.5759,
    lng:126.9769
  });
  const [resultList,setResultList] = useState([]);
  
  // 🕹️ 결과창 숨김 컨트롤
  const [resultDisplayed, setResultDisplayed] = useState(false); // ✏️ 검색 결과창 표시
  const [resultHidden, setResultHidden] = useState(true); // ✏️ 검색 결과창 숨김
  const resultDisplayControl = (control) => {
    setResultDisplayed(control);
  }
  const toggleResultHidden = () => {
    setResultHidden(!resultHidden);
  }
  useEffect(()=>{
    resultDisplayControl(resultList.length>0)
  },[resultList])

  const onClickResultBox = ({lat, lng}) => {
    console.log("🕹️맵 마커 생성")
  }


  // 🛠️ 네이버 지도 컨트롤 영역
  useEffect(() => {
    // 네이버 지도 API 로드 확인
    if (window.naver && window.naver.maps) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(coordinate.lat, coordinate.lng),
        zoom: 16,
      };

      naverMap.current = new window.naver.maps.Map('map', mapOptions); 
      naver.maps.Event.addListener(naverMap.current, 'click', function(e) {
        setCoordinate({
          lat:e.coord.lat(),
          lng:e.coord.lng()
        });
    })
    }
  }, []);

  useEffect(()=>{
    if(!hidden)searchCoordinate();
  },[coordinate])

  // 🕹️ 검색 텍스트 입력
  const onChangeSearchText = ({target}) => {
    setLocation(target.value);
  }

  // 🛠️ 마커 컨트롤 영역
  const [clickMarker, setClickMarker] = useState({
    marker:null,
    lat:37.5759,
    lng:126.9769,
    type:"Normal",
    markerName:"서울시청",
    number:"",
    city:"",
    district:"",
    neigh:"",
    streetName:"",
    streetNumber:""
  })


  // 🛜 좌표 기준으로 주소 조회
  const searchCoordinate = async () => {
    console.log("🛜 좌표 기준으로 주소 요청");
    try{
      const response = await fetch(`http://localhost:8080/Map/api/coordinate?lat=${coordinate.lat}&lng=${coordinate.lng}`);
      const data = await response.json();
      console.log(data);
      // 🕹️ 지도에 클릭한 위치에 마커 생성
      let markerData = new naver.maps.Marker({
        position: new naver.maps.LatLng(coordinate.lat, coordinate.lng),
        map: naverMap.current
    });
      if(!!clickMarker.marker) clickMarker.marker.setMap(null);
      setClickMarker({
        ...clickMarker,
        marker:markerData,
        lat:coordinate.lat,
        lng:coordinate.lng
      });
      console.log(data);
    }catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // 🛜 검색 클릭했을 때 서버 요청
  const onClickSearchBtn = async () => {
    console.log("🛜 장소 이름으로 검색 요청");
    if(location.trim().length>0){
      try {
        let response = await fetch(`http://localhost:8080/Map/api/search?location=${location}`);
        let data = await response.json();
        console.log(data);
        if(data.items.length===0){
          console.log("⚠️ 장소로 검색된 데이터 없음");
          response = await fetch(`http://localhost:8080/Map/api/address?address=${location}`)
          data = await(response.json());
          console.log(data.addresses)
          if(data.addresses.length>0){
            setResultList(data.addresses.map(resultData=>{
              let addressMapping = resultData.addressElements.map(data=>data.longName)
              let addressMain = addressMapping[0] + " " + addressMapping[1] + " " + addressMapping[2] + " " + addressMapping[7];
              let addressRoad = addressMapping[4] + " " + addressMapping[5];
              let mappingData={
                mainAddress:addressMain,
                roadAddress:addressRoad,
                lat:resultData.y,
                lng:resultData.x
              }
              return mappingData;
            }));
          }
          else{
            alert("🚨 검색 결과가 없습니다.");
          }
        } else {
          setResultList(data.items.map((resultData)=>{

            function changeData(data,number){
              let result = data.split('');
                  result.splice(number,0,'.');
                  return result.join('')
            }

            let mappingData = {
              title:resultData.title,
              category:resultData.category,
              address:resultData.roadAddress,
              lat:parseFloat(changeData(resultData.mapy,2)),
              lng:parseFloat(changeData(resultData.mapx,3))
            }
            console.log(mappingData);
            return mappingData;
          }))
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else alert("🚨 검색 내용이 비어 있습니다.");
  }

  return <div className='NaverMap' style={hidden?{display:"none"}:{display:"flex"}}>
            <div className='BlockBox' onClick={mapHiddenControl}></div>
            <div className='MapBox'>
                <div className='TopLine'>
                    <h1>장소 선택</h1>
                    <div>
                      <div className='searchLine'>
                        <h2>장소 이름 :</h2>
                        <input className='tagText' type='text' value={location} onChange={onChangeSearchText} placeholder='주소 또는 장소를 검색해주세요. ex) 효자동 10, 잠수교, CGV'></input>
                        <input id='searchBtn' type='button' onClick={onClickSearchBtn} hidden/>
                        <label htmlFor='searchBtn' className='searchBtn'><h2>검색</h2></label>
                      </div>
                      <div className='addressLine'>
                        <h2>주소 :</h2>
                        <h2 className='addressText'>{address?{address}:"선택된 주소가 없습니다."}</h2>
                        <input id='insertBtn' type='button' hidden/>
                        <label htmlFor='insertBtn'><h2>등록</h2></label>
                      </div>
                    </div>
                </div>
                <div className='BottomLine'>
                    <div className='resultBoxLine' style={resultDisplayed?{display:"flex"}:{display:"none"}}>
                      <input type='button' id='resultHiddenBtn' onClick={toggleResultHidden} hidden/>
                      <label htmlFor='resultHiddenBtn' className='resultHiddenLabel'>{resultHidden?"열기":"닫기"}</label>
                      {resultList.map((data,index)=>
                        {
                         if(!data.category) return (<ResultBoxAddress key={index} addressMain={data.mainAddress} addressRoad={data.roadAddress} lat={data.lat} lng={data.lng}/>);
                         else return (<ResultBoxTarget key={index} title={data.title} category={data.category} address={data.address} lat={data.lat} lng={data.lng} onClick={onClickResultBox}/>);
                        }
                      )}
                    </div>
                    <div id='map'></div>
                </div>
            </div>
        </div>
};

export default NaverMap;