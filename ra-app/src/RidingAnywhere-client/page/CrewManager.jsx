import React, { useState } from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import "../css/crewManager.css";
import CrewMember from '../component/crewmanager/CrewMember';


// 🛠️ 크루 관리 페이지
const CrewManager = () => {

    // 크루 정보 변수
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