import React, { useState } from 'react';

const CrewBoardCommentBox = (props) => {
    let userId = props.userId;
    let commentData = props.commentData;
    let writer = commentData.commentWriter;
    let commentList = props.commentList;

    const [changeMode, setChangeMode] = useState(false);
    const [changeContext,setChangeContext] = useState("");
    const onClickChangeBtn = () => {
        setChangeMode(!changeMode);
        setChangeContext("");
    }
    const insertContext = (props) => {
        setChangeContext(props.target.value);
    }
    const onClickChangeUpBtn = () => {
        if(!changeContext||changeContext===commentData.commentContext){
            alert("⚠️ 변경되지 않거나 댓글 내용이 없습니다.");
        } else {
            console.log("🛜 댓글 수정 작업 요청");

        }
    }

    let writerLevel = '';
        switch(writer.authorityId.authorityName){
            case "ROLE_CREW_Master" : 
                writerLevel = "마스터"
                break;
            case "ROLE_CREW_Member" :
                writerLevel = "멤버"
                break;
            case "ROLE_RA_ADMIN" :
                writerLevel = "관리자";
                break;
            default:
        }

    return (
        <div className='commentBox' >
            <img className='profileImg' src='/img/mypage/DefaultProfileImg.png' alt=''/>
            <div>
                <div className='TopLine'>
                    <h2 className='commentNickName'>{commentData.commentWriter.userNickname}</h2>
                    <span><h2 className='commentLevel'>{writerLevel}</h2></span>
                    <div className='commentDateLine'>
                        <h2 className='commentRegDate'>{new Date(commentData.commentRegDate).toLocaleDateString('ko-KR')}</h2>
                        <h2 className='commentRegTime'>{new Date(commentData.commentRegDate).toLocaleDateString('ko-KR',{hour: '2-digit', minute: '2-digit', hour12: false}).match(/\d{1,2}:\d{2}/)[0]}</h2>
                    </div>
                    <div className='commentBtnLine'>
                        <input className='commentChangeBtn' type='button' hidden={userId!==writer.userId} onClick={onClickChangeBtn}/>
                        <input className='commentDeleteBtn' type='button' hidden={userId!==writer.userId}/>
                    </div>
                </div>
                <div className='BottomLine'>
                    <h2 className='commentContext' hidden={changeMode}>{commentData.commentContext}</h2>
                    <input type='text' placeholder={commentData.commentContext} value={changeContext} className='ChangeCommentContext' onChange={insertContext} hidden={!changeMode}/>
                    <input type='button' className='CommentChangeUpBtn' onClick={onClickChangeUpBtn} value={"수정하기"} hidden={!changeMode}/>
                    <input id='commentReplyBtn' type='button' className='commentReplyBtn' hidden/>
                    <label htmlFor='commentReplyBtn'><h2>댓글 작성</h2></label>
                </div>
            </div>
        </div>
    );
};

export default CrewBoardCommentBox;