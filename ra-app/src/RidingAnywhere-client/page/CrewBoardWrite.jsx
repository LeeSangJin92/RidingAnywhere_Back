import React, { useState } from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import DatePicker from '../component/DatePicker';
import '../css/crewBoardWrite.css';

const CrewBoardWrite = () => {

    // ✏️ 게시판 종류 변수
    const [optionControl, setOptionControl] = useState("Note");

    // 🛠️ 게시판 내용 변수
    const [boardData, setBoardData] = useState({
        emergencyNote : false,
        boardTitle : "",
        boardContext : "",
        startDate : "",
        endDate : "",
        memberCount : 2,
        address : ""
    });

    // 🛠️ 게시판 종류 설정 반응
    const changeType = (data) => {
        setOptionControl(data.target.value);
        setBoardData({      // 데이터 초기화
            ...boardData,
            emergencyNote : false,
            startDate : "",
            endDate : "",
            memberCount : 2,
            address : ""
        });
        setDateEqual(false);
    }

    // 🕹️ 게시판 데이터 입력
    const insertBoardData = (data) => {
            switch(data.target.className){
                case "WriteTitle":
                    setBoardData({...boardData,boardTitle:data.target.value});
                    break;
                case "WriteContext":
                    setBoardData({...boardData,boardContext:data.target.value});
                    break;
                default:
            }
            console.log(boardData);
    }

    // 🛠️ 시작 날짜, 종료 날짜 동일 버튼
    const [dateEqual, setDateEqual] = useState(false)
    const clickDateEqualBtn = (data) => {
        let dateEqualBtn = data.target;
        setDateEqual(dateEqualBtn.checked)
        dateEqualBtn.checked&&setBoardData({...boardData,endDate:boardData.startDate});
        !dateEqualBtn.checked&&setBoardData({...boardData,endDate:""});
    }

    // ✏️ 데이터 검증에 필요한 정규표현식 데이터
    const boardRegExp = {
        "boardTitle" : new RegExp('^(\\S).+'),
        "boardContext" : new RegExp('^(\\S).+'),
        "address" : new RegExp('^(\\S).+')
    };

    // 🛠️ 서버 요청 전 데이터 검증
    const clickOkayBtn = () => {
        console.log("🕹️ 등록 버튼 클릭")
        console.log("🔎 데이터 검증 중...")
        Object.keys(boardData).map(boardDataKey => {
            
            // 🛠️ 게시판 종류에 따른 검증 절차 우선 진행
            switch(optionControl){
                case "Note" : 
                    console.log("🔎 공지글 검증")
                    switch(boardDataKey){
                        case "endDate" :
                        case "startDate" :
                            if(!boardData[boardDataKey]){
                                alert("⚠️ 공지 날짜를 확인해주세요!")
                            }
                        default:
                    }
                        break;

                case "Tour" :
                    console.log("🔎 모임글 검증")
                        break;
                default :
            }
        })

    }


    return (
        <main>
            <DefaultHeader/>
                    <section className='CrewBoardWrite'>
                        <div className='WriteTop'>
                            <h1>크루 게시판</h1>
                            <div className='WriteOptionLine'>
                                <h2>게시글 종류</h2>
                                <select value={optionControl} className='BoardType' onChange={changeType}>
                                    <option value={'Note'}>공지글</option>
                                    <option value={'Tour'}>모임</option>
                                    <option value={'Free'}>자유글</option>
                                    <option value={'Greetings'}>인사말</option>
                                </select>
                            </div>
                        </div>
                        <div className='WriteBody'>
                            <div className='BoardWriteBox'>
                                <input type='text' className='WriteTitle' placeholder='제목을 입력하세요' value={boardData.boardTitle} onChange={insertBoardData}/>
                                <input type='text' className='WriteContext' placeholder='내용을 입력하세요' value={boardData.boardContext} onChange={insertBoardData}>
                                </input>
                            </div>
                            <div className='WriteOptionBox'>
                                <div className='Option' id='Note' style={optionControl==='Note'?{display:'flex'}:{display:'none'}}>
                                    <input type='checkbox' id='emergencyNoteBtn' hidden/>
                                    <label htmlFor='emergencyNoteBtn' className='EmergencyNoteLabel'>
                                    <span>긴급 공지</span>
                                    </label>
                                    <div className='TimeLine'>
                                        <h2>공지 기간</h2>
                                        <input type='checkbox' id='NoteDateEqualBtn' onClick={clickDateEqualBtn} hidden/>
                                        <label htmlFor='NoteDateEqualBtn' className='NoteDateEqualLabel'>
                                        <span>날짜 동일</span>
                                    </label>
                                    </div>
                                    <div className='TimeLine'>
                                    <DatePicker placeholderText='시작 날짜' boardData={boardData} isStartDate={true} setBoardData={setBoardData} dateEqual={dateEqual}/>
                                        <DatePicker placeholderText='종료 날짜' boardData={boardData} isStartDate={false} setBoardData={setBoardData} dateEqual={dateEqual}/>
                                    </div>
                                </div>
                                <div className='Option' id='Tour' style={optionControl==='Tour'?{display:'flex'}:{display:'none'}}>
                                    <div className='TimeLine'>
                                        <h2>모임 일정</h2>
                                        <label htmlFor='TourDateEqualBtn' className='TourOptionInput'>
                                            <h2>날짜 동일</h2>
                                        </label>
                                        <input type='checkbox' id='TourDateEqualBtn' onClick={clickDateEqualBtn} hidden/>
                                    </div>
                                    <div className='TimeLine'>
                                        <DatePicker placeholderText='시작 날짜' boardData={boardData} isStartDate={true} setBoardData={setBoardData} dateEqual={dateEqual}/>
                                        <DatePicker placeholderText='종료 날짜' boardData={boardData} isStartDate={false} setBoardData={setBoardData} dateEqual={dateEqual}/>
                                    </div>
                                    <div className='CountMemberLine'>
                                        <h2>참석 인원</h2>
                                        <input type='number' min={2} className='TourOptionInput' id='CountMember'/>
                                        <h2>명</h2>
                                    </div>
                                    <h2>모임 장소</h2>
                                    <input type='text' className='TourAddress' id='TourAddress' placeholder='모임 장소를 입력해주세요!'/>
                                </div>
                                <div className='Option' id='Free' style={optionControl==='Free'?{display:'flex'}:{display:'none'}}>
                                    <h2>설정 가능 옵션 없음</h2>
                                </div>
                                <div className='Option' id='Greetings' style={optionControl==='Greetings'?{display:'flex'}:{display:'none'}}>
                                    <h2>설정 가능 옵션 없음</h2>
                                </div> 
                                <div className='OkayBtnLine'>
                                    <label htmlFor='BoardUploadBtn'><h2>등록</h2></label>
                                    <input type='button' id='BoardUploadBtn' onClick={clickOkayBtn} hidden/>
                                    <label htmlFor='BoardCancelBtn'><h2>취소</h2></label>
                                    <input type='button' id='BoardCancelBtn' hidden/>
                                </div> 
                            </div>
                        </div>
                </section>
            <DefaultFooter/>
        </main>
    );
};

export default CrewBoardWrite;