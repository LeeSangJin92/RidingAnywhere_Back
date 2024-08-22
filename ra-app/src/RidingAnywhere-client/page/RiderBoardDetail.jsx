import React, { useEffect, useState } from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import "../css/RiderBoardDetail.css";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import RiderBoardCommentBox from '../component/riderboard/RiderBoardCommentBox';

const RiderBoardDetail = () => {
    const {boardId} = useParams();

    // ✏️ 게시글 데이터
    const [boardData, setBoardData] = useState({
        boardTitle : "테스트 제목라인",            // 게시글 제목
        boardType:"🆓 자유글",      // 게시글 타입
        boardContext:"",            // 게시글 내용
        boardWriter:{               // 게시글 작성자 정보
            userId:null,               // 작성자 ID
            userNickName:"테스트닉"         // 작성자 닉네임
        },
        boardDate:"2024년 12월 31일 금요일",               // 게시글 날짜
        address:"서울시 관악구 신림동 87-28",              // 게시글 장소
        boardViewCont : 0,          // 게시글 조회수
        boardLimit : true           // 게시글 댓글 제한
    });

    // ✏️ 게시글 댓글 데이터
    const [commentList, setCommentList] = useState([]);

    // ✏️ 댓글 작성 데이터
    const [commentData,setCommentData] = useState({
        board_id:0,         // 게시글 ID
        comment_id:0,       // 상위 댓글 ID
        comment_context:''  // 댓글 내용
    });

    // ✏️ 댓글 데이터 입력
    const onChangeContext = (props) => {
        setCommentData({
            ...commentData,
            board_id:boardData.boardId,
            comment_context:props.target.value
        });
    }

    // 🔎 댓글 검사
    const onClickUploadBtn = () => {
        if(!commentData.comment_context){
            alert("⚠️ 입력된 댓글이 없습니다.");
        } else upLoadComment(commentData);
    }

    // ✏️ 댓글 작성 영역
    const upLoadComment = async (upLoadData) => {
        console.log(upLoadData);
        console.log("✏️ 댓글 등록 요청");
        await fetch("/CR/BoardDetail/Comment",{
            method:'POST',
            headers:{
                "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                "Content-Type": "application/json;charset=utf-8"
            },
            body:JSON.stringify(upLoadData)
        }).then(response => {
            if(response.status===200){
                alert("✅ 등록이 완료 되었습니다..");
                setCommentData({...commentData, comment_context:''});
                loadBoardCommentList();
            } else response.status!==200&&alert("❌ 등록을 실패 했습니다..");
        })
    }



    // 🔎 로그인 유저의 Id
    const [riderId, setRiderId] = useState(null)

    // 🔎 게시글 내용 가져오기
    const loadBoardData = async () => {
        console.log(boardId);
        console.log("🛜 서버로 게시글 데이터 호출")
        await fetch(`/RA/BoardDetail/Board?boardId=${boardId}`,{}).then(response=>{
            if(response.status===200) return response.json(); 
            else {alert("실패");
                return null;
            }
        }).then(data=>{
            if(data){
                console.log("✅ 서버 게시글 데이터 호출")
                let boardDate = format(new Date(data.boardDate), "yyyy년 MM월 dd일") // 날짜 포맷 적용

                setBoardData({
                    boardTitle : data.boardTitle,           // 게시글 제목
                    boardType: typeName(data.boardType),    // 게시글 타입
                    boardContext: data.boardContext,        // 게시글 내용
                    boardWriter:{                           // 게시글 작성자 정보
                        userId:data.user.userId,            // 작성자 ID
                        userNickName:data.user.userNickname // 작성자 닉네임
                    },
                    boardDate:boardDate,                    // 게시글 날짜
                    address:data.boardLocation,             // 게시글 장소
                    boardViewCont : data.boardCnt,          // 게시글 조회수
                    boardLimit : data.boardLimit            // 게시글 댓글 제한
                });
            }

            function typeName(typeData){
                switch(typeData){
                    case "Free" :
                        return "🆓자유글";
                    case "Event" :
                        return "🚨사건글";
                    case "Driving" :
                        return "⚡번개글";
                    case "Mechanic" :
                        return "🛠️정비글";
                    default:
                }
            }

        }).then(loadBoardCommentList).then(loadRiderInfo);
    }

    // 🛜 게시글 댓글 불러오기
    const loadBoardCommentList = async () => {
        console.log("🛜 게시글 댓글 요청");
        await fetch(`/RA/BoardDetail/Comment?Board=${boardId}`,{})
        .then(response=>{
            if(response.status===200) return response.json();
            else console.log("🚨 게시글 댓글 요청");
        }).then(data=>{
            if(data){
                 console.log("✅ 게시글 댓글 요청")
                setCommentList(data);
            }
        })
    }

    const loadRiderInfo = async () => {
        console.log("🛜 라이더 정보 요청");
        if(sessionStorage.getItem('accessToken'))
        await fetch("/RA/CheckRider",
            {headers:{
            "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
            "Content-Type": "application/json;charset=utf-8"}})
            .then(response=>{
                if(response.status===200){
                    console.log("✅ 라이더 정보 요청");
                    return response.json();
                } else {
                    console.log("🚨 로그인 데이터 오류");
                    alert("🚨 로그인 정보 오류 발생");
                    return null;}
            }).then(data => {
                if(data){
                    console.log("✅ 접속중인 라이더");
                    setRiderId(data.userData.userId);
                    console.log(data);
                };
            });
        else console.log("⚠️ 비접속 라이더");
     }

    useEffect(()=>{
        console.log(boardId);
        loadBoardData();
    },[])

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
                                <div className='RightTopBox'>
                                    <h2>{boardData.boardDate}</h2>
                                    <div className='boardControl' style={riderId===boardData.userId?{display:"flex"}:{display:"none"}}>
                                        <input type='button' id='boardChangeBtn' onClick={onClickChangeBtn}/>
                                        <input type='button' id='boardDeleteBtn' onClick={onClickDeleteBtn}/>
                                    </div>
                                </div>
                                <input type='button' id='boardAddressBtn' hidden/>
                                <label htmlFor='boardAddressBtn' style={boardData.address?{display:"flex"}:{display:"none"}}>
                                    <h2>🚩 {boardData.address}</h2>
                                </label>
                            </div>
                        </div>
                        <h1>{boardData.boardTitle}</h1>
                    </div>
                </div>
                <div className='PageBodyLine'>
                    <div className='BoardContext' dangerouslySetInnerHTML={{__html:boardData.boardContext}}>
                    </div>
                </div>

                {/* 댓글 영역 */}
                    <div className='PageCommentLine'>
                        <div className='commentList'> {/* 댓글 목록 */}
                            <div className='loadingBlock'>
                                <h1>🔎 댓글을 불러오는 중입니다.</h1>
                                <h1>- 잠시만 기달려 주세요 -</h1>
                            </div>
                            <div className='commentEmptyNote'>
                                <h1>⚠️ 등록된 댓글이 없습니다.</h1>
                            </div>
                            <div className='commentListLine'>
                                {commentList.map((commentData,index) => {
                                if(!commentData.commentReply) 
                                    return <RiderBoardCommentBox key={index} commentData={commentData} replyList={commentList.filter(
                                        comment=>comment.commentReply&&comment.commentReply.commentId===commentData.commentId)} 
                                        userId={riderId} boardId={boardId} onClickDeleteBtn={onClickDeleteBtn}/>;
                                else return null;
                                })}
                            </div>
                        </div>
                        <div className='commentInputLine'>
                            <h2>댓글 내용 : </h2>
                            <input type='text' className='commentTextBox' onChange={onChangeContext} value={commentData.comment_context}/>
                            <input id='commentUploadBtn' type='button' className='commentUploadBtn' onClick={onClickUploadBtn} hidden/>
                            <label htmlFor='commentUploadBtn'><h2>댓글 등록</h2></label>
                        </div>
                    </div>
            </section>
             <DefaultFooter/>
        </main>
    );
};

export default RiderBoardDetail;