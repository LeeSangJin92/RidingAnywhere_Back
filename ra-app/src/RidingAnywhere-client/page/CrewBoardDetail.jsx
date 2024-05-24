import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import '../css/crewBoardDetail.css';


const CrewBoardDetail = () => {

    const {boardId} = useParams();

    // ✏️ 게시글 데이터
    const [crewBoardData, setCrewBoardData] = useState({
        boardId : 0,                // 게시글 ID
        boardTitle : "",            // 게시글 제목
        boardContext : "",          // 게시글 내용
        boardType : "",             // 게시글 타입
        boardWriter : "",           // 게시글 작성자
        WriterLevel : "",           // 작성자 등급
        boardViewCnt : "",          // 게시글 조회수
        emergencyNote : false,      // 게시글 긴급 여부
        endDate : "",               // 게시글 일정 종료날짜
        startDate : "",             // 게시글 일정 시작날짜
        regDate : "",               // 게시글 생성 날짜
        tourAddress : "",           // 게시글 모임 장소
    });

    // 🛜 게시글 데이터 조회 요청
    const loadBoardData = async () => {
        console.log("🛜 서버로 게시글 조회 요청");
        await fetch(`/CR/BoardDetail/board?boardId=${boardId}`,{
            headers:{
                "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                "Content-Type": "application/json;charset=utf-8"
            }
        }).then(response=>{
            if(response.status===200){
                console.log("✅ 서버 응답 완료");
                return response.json();
            } else {
                console.log("❌ 서버 응답 실패");
                console.log("사유 : "+response.status);
            }
        }).then(boardData=>{
            if(!!boardData){

                // 🛠️ 게시글 타입 설정
                let resultBoardType = "";
                switch(boardData.boardType){
                    case "Note" : 
                        resultBoardType = "공지글"
                        break;
                    case "Tour" : 
                        resultBoardType = "모임글"
                        break;
                    case "Free" : 
                        resultBoardType = "자유글"
                        break;
                    case "Greetings" : 
                        resultBoardType = "인사글"
                        break;
                    default : 
                }
                    
                // 🛠️ 작성자 등급 설정
                let writerLevel = "";
                    switch(boardData.writer.authorityId.authorityName){
                        case "ROLE_CREW_Master":
                            writerLevel = "마스터";
                            break;
                        case "ROLE_CREW_Member":
                            writerLevel = "멤버";
                            break;
                        case "ROLE_RA_ADMIN":
                            writerLevel = "관리자";
                            break;
                        default : 
                    }
                let dateformatte = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                let resultBoardData = {
                    boardId : boardData.boardId,
                    boardTitle : boardData.boardTitle,
                    boardContext : boardData.boardContext,
                    boardType : resultBoardType,
                    boardWriter : boardData.writer.userNickname,  
                    writerLevel : writerLevel,
                    boardViewCnt : boardData.boardCnt, 
                    emergencyNote : boardData.emergencyNote,
                    endDate : new Date(boardData.endDate).toLocaleDateString('ko-KR',dateformatte),
                    startDate : new Date(boardData.startDate).toLocaleDateString('ko-KR',dateformatte),
                    regDate : new Date(boardData.regDate).toLocaleDateString('ko-KR',dateformatte),
                    tourAddress : boardData.address
                }
                setCrewBoardData(resultBoardData);
                console.log(resultBoardData);
            }
        })
    }

    useEffect(()=>{
        loadBoardData();
    },[])

    return (
        <main>
            <DefaultHeader/>
                <section className='CrewBoardDetail'>
                    <div className='BoardTopLine'>
                        <div className='boardTypeLine'>
                            <h1>크루</h1>
                            <h1>{crewBoardData.boardType}</h1>
                        </div>
                        <div className='TopLine1'>
                            <div className='TopLine2'>
                                <div className='BoardInfoTop'>
                                    <h2>✏️작성자</h2>
                                    <h2>{crewBoardData.boardWriter}</h2>
                                    <span><h2>{crewBoardData.writerLevel}</h2></span>
                                </div>
                                <div className='BoardInfoTop'>
                                    <h2>{crewBoardData.startDate+" ~ "+crewBoardData.endDate}</h2>
                                </div>
                            </div>
                            <div className='TopLine2'>
                                <h1>{crewBoardData.boardTitle}</h1>
                                <div className='TourAddressLine'>
                                    <h3 id='address'>장소🚩</h3>
                                    <h3>{crewBoardData.tourAddress}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='BoardBottomLine'>
                        <div className='TourInfoSlideOff'>
                            <div className='AttendanceCnt'>
                                <h2>참여 인원</h2>
                                <h2>(100/100)</h2>
                            </div>
                            <div className='TourBtnLine' id='Off'>
                                <input type='checkbox' id='attachOkay' hidden/>
                                <label htmlFor='attachOkay'><h2>참여</h2></label>
                                <input type='checkbox' id='attachNon' hidden/>
                                <label htmlFor='attachNon'><h2>불참여</h2></label>
                            </div>
                        </div>
                        <div className='TourInfoSideOn'>
                            <div className='AttendanceListTop'>
                                <div className='AttendanceCnt'>
                                    <h2>참여 인원</h2>
                                    <h2>(100/100)</h2>
                                </div>
                                <div className='TourBtnLine' id='On'>
                                    <input type='checkbox' id='attachOkay' checked hidden/>
                                    <label htmlFor='attachOkay'><h2>참여</h2></label>
                                    <input type='checkbox' id='attachNon' hidden/>
                                    <label htmlFor='attachNon'><h2>불참여</h2></label>
                                </div>
                            </div>
                            <div className='AttendanceListBottom'>
                                <div className='CrewAttendanceBox'>
                                    <label>
                                        <h2>닉네임 테스트</h2>
                                        <h2>마스터</h2>
                                        <h2>92</h2>
                                        <h2>서울/관악</h2>
                                    </label>
                                    <input type='button' hidden/>
                                </div>
                            </div>
                        </div>
                        
                        <div className='TourSlideBtn'>
                                    <label htmlFor='TourSlideBtn'><h2>명<br/>단<br/> <br/>보<br/>기</h2></label>
                                    <input id='TourSlideBtn' hidden/>
                            </div>
                        <div>

                        </div>
                    </div>
                </section>
            <DefaultFooter/>
        </main>
    );
};

export default CrewBoardDetail;