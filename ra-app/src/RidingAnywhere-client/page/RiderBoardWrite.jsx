import React, { useState } from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import '../css/RiderBoardWrite.css';
import DatePicker from '../component/DatePicker';

const RiderBoardWrite = () => {

    const [boardType,setOption] = useState("Free")
    const [boardData, setBoardData] = useState({
        board_type:"",          // 게시글 타입
        board_title:"",         // 게시글 제목
        board_context:"",       // 게시글 내용
        board_commentOn:true,   // 게시글 댓글 제한
        board_event:"",         // 게시글 사건 종류
        board_level:"",         // 게시글 등급
        board_date:"",          // 게시글 일정
        board_location:""       // 게시글 장소
    });

    const onChangeBoardType = (props) => {
        setOption(props.target.value);
    }

    const onClickCommentControlBtn = () => {
        setBoardData({...boardData,board_commentOn:!boardData.board_commentOn});

    }

    return (
        <main>
            <DefaultHeader/>
            <section className='RiderBoardWrite'>
                <div className='RiderBoardWriteTop'>
                    <h1>라이더 게시판</h1>
                    <div className='RiderBoardType'>
                        <h2>게시글 종류</h2>
                        <select value={boardType} onChange={onChangeBoardType}>
                            <option value={"Free"}>자유글</option>
                            <option value={"Event"}>사건글</option>
                            <option value={"Driving"}>번개글</option>
                            <option value={"Mechanic"}>정비글</option>
                        </select>
                    </div>
                </div>
                <div className='RiderBoardWriteBody'>
                    <div className='BoardWriteArea'>
                        <input type='text'></input>
                        <textarea></textarea>
                    </div>
                    <div className='BoardOptionArea'>
                        <input id='CommitControlBtn' type='checkbox' onClick={onClickCommentControlBtn} hidden></input>
                        
                        {/* 자유글 옵션 */}
                        <div className='BoardOptionBox' style={boardType==="Free"?{display:"flex"}:{display:"none"}}>
                            <h2>게시글 설정</h2>
                            <label className='CommentControlBtn' htmlFor='CommitControlBtn'><h2>댓글 제한</h2></label>
                        </div>
                        
                        {/* 사건글 옵션 */}
                        <div className='BoardOptionBox' style={boardType==="Event"?{display:"flex"}:{display:"none"}}>
                            <h2>게시글 설정</h2>
                            <div>
                                <h2>사건 종류 : </h2>
                                <select>
                                    <option value={"Crackdown"}>🚨교통 단속</option>
                                    <option value={"Accident"}>⚠️교통 사고</option>
                                    <option value={"RoadCondition"}>👷🏾도로 상태</option>
                                    <option value={"TrafficJam"}>🐢교통 체증</option>
                                </select>
                            </div>
                            <div>
                                <h2>사건 장소 : </h2>
                                <input type='text'/>
                            </div>
                            <div>
                                <h2>사건 날짜 : </h2>
                                <DatePicker placeholderText='날짜 선택' boardData={boardData} isStartDate={true} setBoardData={setBoardData}/>
                            </div>
                            <label className='CommentControlBtn' htmlFor='CommitControlBtn'><h2>댓글 제한</h2></label>
                        </div>
                        
                        {/* 번개글 옵션 */}
                        <div className='BoardOptionBox' style={boardType==="Driving"?{display:"flex"}:{display:"none"}}>
                            <h2>게시글 설정</h2>
                            <label className='CommentControlBtn' htmlFor='CommitControlBtn'><h2>댓글 제한</h2></label>
                        </div>
                        
                        {/* 정비글 옵션 */}
                        <div className='BoardOptionBox' style={boardType==="Mechanic"?{display:"flex"}:{display:"none"}}>
                            <h2>게시글 설정</h2>
                            <label className='CommentControlBtn' htmlFor='CommitControlBtn'><h2>댓글 제한</h2></label>
                        </div>
                    </div>
                </div>
            </section>
            <DefaultFooter/>
        </main>
    );
};

export default RiderBoardWrite;