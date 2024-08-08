import React, { useEffect, useState } from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import '../css/RiderBoardWrite.css';
import DatePicker from '../component/DatePicker';
import QuillEditor from '../component/QuillEditor';
import { useNavigate } from 'react-router-dom';

const RiderBoardWrite = () => {

    // 🛠️ 네비게이션용
    const navigate = useNavigate();

    // ✏️ 작성하는 게시글 정보
    const [boardData, setBoardData] = useState({
        board_type:"Free",          // 게시글 타입
        board_title:"",         // 게시글 제목
        board_context:"",       // 게시글 내용
        board_limit:false,   // 게시글 댓글 제한
        board_detail:"",        // 게시글 디테일 타입 ex) 사건 종류, 번개 종류, 카테고리
        board_date:"",          // 게시글 날짜
        board_location:""       // 게시글 장소
    });
    
    // ✏️ 게시글 초기값 정보 저장
    const [resetData,setResetData]=useState(null);
    useEffect(()=>{
        if(boardData) setResetData(boardData);
    },[])

    // 🕹️ 게시글 타입 선택 반응
    const onChangeBoardType = (props) => {
        setBoardData({...resetData,
            board_type:props.target.value,          // 게시글 타입
            board_context:boardData.board_context,  // 게시글 내용
            board_title:boardData.board_title});    // 게시글 제목
    }

    // 🕹️ 게시글 제목 입력
    const insertTitle = (props) => {
        setBoardData({...boardData,board_title:props.target.value})
    }

    // 🕹️ 게시글 내용 입력
    const insertContext = (data) => {
        setBoardData({...boardData,board_context:data});
    }

    // 🕹️ 댓글 제한 버튼 반응
    const onClickCommentControlBtn = () => {
        setBoardData({...boardData,board_limit:!boardData.board_limit});
    }

    // 🕹️ 게시글 디테일 변경 반응
    const [hiddenMechanicMap,setHiddenMechanicMap] = useState(true);
    const onChangeDetail = (data) => {
        setBoardData({...boardData,board_detail:data.target.value});
        // 🛠️ 정비 맵 버튼 Hidden 설정
        if(boardData.board_type==="Mechanic") setHiddenMechanicMap(data.target.value!=="Center");
    }

    // 🕹️ 등록 버튼 클릭 반응
    const onClickOkayBtn = () => {
        console.log(boardData);
    }

    // 🕹️ 취소 버튼 클릭 반응
    const onClickCancelBtn = () => {
        navigate('/CR/Board');
    }

    return (
        <main>
            <DefaultHeader/>
            <section className='RiderBoardWrite'>
                <div className='RiderBoardWriteTop'>
                    <h1>라이더 게시판</h1>
                    <div className='RiderBoardType'>
                        <h2>게시글 종류</h2>
                        <select value={boardData.board_type} onChange={onChangeBoardType}>
                            <option value={"Free"}>🆓자유글</option>
                            <option value={"Event"}>🚨사건글</option>
                            <option value={"Driving"}>⚡번개글</option>
                            <option value={"Mechanic"}>🛠️정비글</option>
                        </select>
                    </div>
                </div>
                <div className='RiderBoardWriteBody'>
                    <div className='BoardWriteArea'>
                        <input type='text' value={boardData.board_title} placeholder='게시글 제목을 입력하세요.' onChange={insertTitle}></input>
                        <QuillEditor value={boardData.board_context} onChange={insertContext}/>
                    </div>
                    <div className='BoardOptionArea'>
                        <h1>게시글 설정</h1>
                        <input id='CommitControlBtn' type='checkbox' onClick={onClickCommentControlBtn} hidden></input>
                        
                        {/* 자유글 옵션 */}
                        <div className='BoardOptionBox' style={boardData.board_type==="Free"?{display:"flex"}:{display:"none"}}>
                            <label className='CommentControlBtn' htmlFor='CommitControlBtn'><h2>댓글 제한</h2></label>
                        </div>
                        
                        {/* 사건글 옵션 */}
                        <div className='BoardOptionBox' style={boardData.board_type==="Event"?{display:"flex"}:{display:"none"}}>
                            <div className='EventType'>
                                <h2>사건 종류 : </h2>
                                <select value={boardData.board_detail} onChange={onChangeDetail}>
                                    <option value={""}>✏️필수 선택</option>
                                    <option value={"Crackdown"}>👮🏻교통 단속</option>
                                    <option value={"Accident"}>⚠️교통 사고</option>
                                    <option value={"RoadCondition"}>👷🏾도로 상태</option>
                                    <option value={"TrafficJam"}>🐢교통 정체</option>
                                </select>
                            </div>
                            <div className='EventLocation'>
                                <h2>사건 장소 : </h2>
                                <input id='EventMap' type='button' hidden/>
                                <label className='EventMapBtn' htmlFor='EventMap'><h2>🔎 서울시 관악구 신림동</h2></label>
                            </div>
                            <div className='EventDate'>
                                <h2>사건 날짜 : </h2>
                                <DatePicker className='EventDatePicker' placeholderText='날짜 선택' boardData={boardData} isStartDate={true} setBoardData={setBoardData}/>
                            </div>
                            <label className='CommentControlBtn' htmlFor='CommitControlBtn'><h2>댓글 제한</h2></label>
                        </div>
                        
                        {/* 번개글 옵션 */}
                        <div className='BoardOptionBox' style={boardData.board_type==="Driving"?{display:"flex"}:{display:"none"}}>
                            <div className='DrivingType'>
                                <h2>배기 조건 : </h2>
                                <select value={boardData.board_detail} onChange={onChangeDetail}>
                                    <option value={""}>✏️필수 선택</option>
                                    <option value={"Fast"}>🏍️고배기 번개</option>
                                    <option value={"All"}>🆓모든 바이크</option>
                                    <option value={"Slow"}>🛵저배기 번개</option>
                                </select>
                            </div>
                            <div className='DrivingLocation'>
                                <h2>번개 장소 : </h2>
                                <input id='DrivingMap' type='button' hidden/>
                                <label className='DrivingMapBtn' htmlFor='DrivingMap'><h2>🔎 서울시 관악구 신림동</h2></label>
                            </div>
                            <div className='DrivingDate'>
                                <h2>번개 날짜 : </h2>
                                <DatePicker className='DrivingDatePicker' placeholderText='날짜 선택' boardData={boardData} isStartDate={true} setBoardData={setBoardData}/>
                            </div>
                            <label className='CommentControlBtn' htmlFor='CommitControlBtn'><h2>댓글 제한</h2></label>
                        </div>

                        {/* 정비글 옵션 */}
                        <div className='BoardOptionBox' style={boardData.board_type==="Mechanic"?{display:"flex"}:{display:"none"}}>
                            <div className='MechanicType'>
                                <h2>카테고리 : </h2>
                                <select value={boardData.board_detail} onChange={onChangeDetail}>
                                    <option value={""}>✏️필수 선택</option>
                                    <option value={"Mechanic"}>🛠️정비 토크</option>
                                    <option value={"Center"}>🏬센터 소개</option>
                                    <option value={"Traction"}>🚚용달 소개</option>
                                </select>
                            </div>
                            <div className='MechanicTypeLocation' style={hiddenMechanicMap?{display:'none'}:{display:'flex'}}>
                                <h2>센터 장소 : </h2>
                                <input id='MechanicMap' type='button' hidden/>
                                <label className='MechanicMapBtn' htmlFor='MechanicMap'><h2>🔎 서울시 관악구 신림동</h2></label>
                            </div>
                            <label className='CommentControlBtn' htmlFor='CommitControlBtn'><h2>댓글 제한</h2></label>
                        </div> 

                        {/* 게시글 등록&취소 버튼 라인 */}
                        <div className='OkayBtnLine'>
                            <label htmlFor='BoardUploadBtn'><h2>등록</h2></label>
                            <input type='button' id='BoardUploadBtn' onClick={onClickOkayBtn} hidden/>
                            <label htmlFor='BoardCancelBtn'><h2>취소</h2></label>
                            <input type='button' id='BoardCancelBtn' onClick={onClickCancelBtn} hidden/>
                        </div>
                    </div>
                </div>
            </section>
            <DefaultFooter/>
        </main>
    );
};

export default RiderBoardWrite;