import React, { useState } from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import "../css/RiderBoardDetail.css";

const RiderBoardDetail = () => {
    const [boardData, setBoardData] = useState({
        boardTitle : "테스트 제목라인",            // 게시글 제목
        boardType:"🆓 자유글",      // 게시글 타입
        boardContext:"",            // 게시글 내용
        boardWriter:{               // 게시글 작성자 정보
            userId:0,               // 작성자 ID
            userNickName:"테스트닉"         // 작성자 닉네임
        },
        boardDate:"2024년 12월 31일 금요일",               // 게시글 날짜
        address:"서울시 관악구 신림동 87-28",              // 게시글 장소
        boardViewCont : 0,          // 게시글 조회수
        boardLimit : true           // 게시글 댓글 제한
    })

    const [boardOptionHidden, setBoardOptionHidden] = useState(false); // 게시글 옵션 숨김

    // 🕹️ 수정 버튼 클릭 반응
    const onClickChangeBtn = ({target}) => {
        console.log("🛠️ 게시글 수정 모드");
    }

    // 🕹️ 삭제 버튼 클릭 반응
    const onClickDeleteBtn = ({target}) => {
        console.log("🕹️ 게시글 삭제 클릭");
    }

    return (
        <main>
             <DefaultHeader/>
            <section className='RiderBoardDetail'>
                <div className='PageTopLine'>
                    <div className='PageTitle'>
                        <h1>라이더 게시판</h1>
                        <h1>{boardData.boardType}</h1>
                    </div>
                    <div className='BoardTitleLine'>
                        <div>
                            <input type='button' id='writerInfoBtn' hidden/>
                            <label htmlFor='writerInfoBtn'>
                                <h1>✏️ {boardData.boardWriter.userNickName}</h1>
                            </label>
                            <div>
                                <div className='boardControl'>
                                    <h2>{boardData.boardDate}</h2>
                                    <input type='button' id='boardChangeBtn' onClick={onClickChangeBtn} hidden={boardOptionHidden}/>
                                    <input type='button' id='boardDeleteBtn' onClick={onClickDeleteBtn} hidden={boardOptionHidden}/>
                                </div>
                                <input type='button' id='boardAddressBtn' hidden/>
                                <label htmlFor='boardAddressBtn'>
                                    <h2>🚩 {boardData.address}</h2>
                                </label>
                            </div>
                        </div>
                        <h1>{boardData.boardTitle}</h1>
                    </div>
                </div>
                <div className='PageBodyLine'>

                </div>
                <div className='PageCommentLine'>

                </div>
            </section>
             <DefaultFooter/>
        </main>
    );
};

export default RiderBoardDetail;