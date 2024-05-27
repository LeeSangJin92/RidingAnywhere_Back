import React from 'react';

const CrewBoardDeleteCheckBox = (props) => {
    let commentId = props.commentId;
    const onClickCancelBtn = () => {
        console.log("❌ 삭제 취소")
        props.setDeleteCommentId(0);
        props.setShowDeleteBox(false);
    }

    const onClickOkayBtn = async () => {
        console.log("🛜 댓글 삭제 요청");
        await fetch(`/CR/BoardDetail/CommentDelete?commentId=${commentId}`,{
            method:"POST",
            headers:{
                "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                "Content-Type": "application/json;charset=utf-8"}
        }).then(response=>{
            if(response.status===200){
                console.log("✅ 댓글 삭제 성공");
                alert("✅ 댓글이 삭제되었습니다.");
                props.loadCommentList();
            }
            else{
                console.log("❌ 삭제 실패");
                alert("❌ 댓글 삭제 도중 오류가 발생되었습니다.");
            }
        }).then(()=>{
            props.setDeleteCommentId(0);
            props.setShowDeleteBox(false);
        });
    }

    return (
        <div className='blockPageLine' style={props.showDeleteBox?{display:'flex'}:{display:'none'}}>
            <div className='CrewBoardDeleteCheckBox'>
                <h1>⚠️ 해당 글을 삭제 하시겠습니까?</h1>
                <div className='DeleteBoxBtnLine'>
                    {/* 삭제 */}
                    <input id='deleteOkayBtn' type='button' onClick={onClickOkayBtn} hidden/>
                    <label htmlFor='deleteOkayBtn' className='deleteBtnOkayLabel'><h1>삭제</h1></label>

                    {/* 취소 */}
                    <input id='deleteCancelBtn' type='button' onClick={onClickCancelBtn} hidden/>
                    <label htmlFor='deleteCancelBtn' className='deleteBtnCancelLabel'><h1>취소</h1></label>

                </div>
            </div>
        </div>
    );
};

export default CrewBoardDeleteCheckBox;