import React from 'react';
import { useNavigate } from 'react-router-dom';

const CrewBoardBox = (props) => {
    
    const navigate = useNavigate();

    let userId = props.userId;
    let boardData = props.boardData;
    let boardType = "";
    let writerLevel = "";

    switch(boardData.boardType){
        case "Note" :
            boardType="공지글";
            break;
        case "Tour" :
            boardType="모임글";
            break;
        case "Free" :
            boardType="자유글";
            break;
        case "Greetings" :
            boardType="인사글";
            break;
        default:
    }

    switch(boardData.writer.authorityId.authorityName){
        case "ROLE_CREW_Master":
            writerLevel = "마스터"
            break;
        case "ROLE_CREW_Member":
            writerLevel = "멤버"
            break;
        case "ROLE_RA_ADMIN":
            writerLevel = "관리자"
            break;
            default:
    }

    return (
        <div className='CrewBoardBox'>
            <label htmlFor={boardData.boardId} className='CrewBoardBoxLabel'>
                <h2 className='boardNo'>{boardData.boardId}</h2>
                <h2 className='boardType' id={boardData.writer.authorityId.authorityName}>{boardType}</h2>
                <h2 className='boardTitle'>{boardData.boardTitle}{boardData.emergencyNote?<span id='emergency'> *</span>:""}</h2>
                <h2 className='boardWriter' id={boardData.writer.userId===userId?"MyBoard":""}>{boardData.writer.userNickname}</h2>
                <h2 className='boardLevel'>{writerLevel}</h2>
                <h2 className='boardCount'>{boardData.boardCnt}</h2>
            </label>
            <input id={boardData.boardId} hidden/>
        </div>
    );
};

export default CrewBoardBox;