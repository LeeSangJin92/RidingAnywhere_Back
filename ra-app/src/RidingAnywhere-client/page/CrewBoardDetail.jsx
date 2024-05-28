import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import '../css/crewBoardDetail.css';
import CrewBoardCommentBox from '../component/crewboard/CrewBoardCommentBox';
import CrewBoardDeleteCheckBox from '../component/crewboard/CrewBoardDeleteCheckBox';
import DatePicker from '../component/DatePicker';


const CrewBoardDetail = () => {

    useEffect(()=>{
        checkData();
        loadBoardData();
        loadCommentList();
    },[])

    // 게시글 ID
    const {boardId} = useParams();

    const [changeMode, setChangeMode] = useState(false);
    const onClickChangeModeBtn = () => {
        setChangeMode(!changeMode);
        document.getElementById('boardContext').value="";
        setChangeData({
            boardId : boardId,          // 게시글 ID
            boardTitle : "",            // 게시글 제목
            boardContext : "",          // 게시글 내용
            emergencyNote : false,      // 게시글 긴급 여부
            endDate : "",               // 게시글 일정 종료날짜
            startDate : "",             // 게시글 일정 시작날짜
            address : "",  
        });
    }

    // 수정에 필요한 데이터
    const [changeData, setChangeData] = useState({
        boardId : boardId,          // 게시글 ID
        boardTitle : "",            // 게시글 제목
        boardContext : "",          // 게시글 내용
        emergencyNote : false,      // 게시글 긴급 여부
        endDate : "",               // 게시글 일정 종료날짜
        startDate : "",             // 게시글 일정 시작날짜
        address : "",           // 게시글 모임 장소
    })

    const onChangeBoardData = (inputTag) => {
        setChangeData({
            ...changeData, [inputTag.target.id]:inputTag.target.value
        })
        console.log(changeData)
    }

    const onClickBoardChangeBtn = async (inputTag) => {
        console.log("🛜 데이터 수정 요청");
        console.log(changeData);
        await fetch(`/CR/BoardChange/Board?type=${inputTag.target.id}`,{
            method:"POST",
            headers:{
                "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                "Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(changeData)
        }).then(response=>{
            if(response.status===200){
                console.log("✅ 수정 완료")
                alert("✅ 데이터 수정이 완료 했습니다.")
                setChangeMode(false);
                loadBoardData();
                loadCommentList();
            }else{console.log("❌ 수정 실패")}
        });
    }


    const navigate = useNavigate();
    // 토큰 체크
    const [accessToken] = useState(!sessionStorage.getItem('accessToken'));

    // 접속한 유저 정보
    const [userId, setUserId] = useState(0);

     // 접속한 유저 정보 가져오기
     const checkData = async () => {
        console.log("🛜 라이더 엑세스 체크 중...")
        if(!accessToken){
            console.log("✅ 접속자에게 엑세스 있음!")
            console.log("🛜 라이더 데이터 확인 중...")
            await fetch("/RA/CheckRider",
            {headers:{
                "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                "Content-Type": "application/json;charset=utf-8"}})
            .then(response => {
                if(response.status===200) return response.json();
                else if(response.status===401){
                    console.log("❌ 토큰 데이터 만료");
                    alert("⚠️ 로그인 유지 시간 초과 \n - 로그인 페이지로 이동합니다. -");
                    sessionStorage.removeItem('accessToken');
                    navigate('/RA/Login');
                }
            }).then(data => {
                if(!!data){
                    if(!data.crewId){
                    console.log("❌ 가입된 크루 없음")
                    alert("⚠️가입된 크루가 없습니다.\n - 가입 또는 생성 후 이용해주세요! -");
                    navigate("/RA/Home");
                    }
                    console.log("✅ 라이더 데이터 수집 완료!");
                    setUserId(data.userData.userId);
                }
            })
            }else {
                console.log("⛔ 접속자에게 엑세스 없음");
                alert("⚠️로그인이 필요합니다.⚠️\n - 로그인 페이지로 이동합니다. - ")
                console.log("🛠️ 로그인 페이지로 이동")
                navigate("/RA/login");
            }
        };

    // ✏️ 게시글 데이터
    const [crewBoardData, setCrewBoardData] = useState({
        boardId : 0,                // 게시글 ID
        boardTitle : "",            // 게시글 제목
        boardContext : "",          // 게시글 내용
        boardType : "",             // 게시글 타입
        boardWriter : "",           // 게시글 작성자
        writerId: 0,                // 게시글 작성자 ID
        writerLevel : "",           // 작성자 등급
        boardViewCnt : "",          // 게시글 조회수
        emergencyNote : false,      // 게시글 긴급 여부
        endDate : "",               // 게시글 일정 종료날짜
        startDate : "",             // 게시글 일정 시작날짜
        regDate : "",               // 게시글 생성 날짜
        tourAddress : "",           // 게시글 모임 장소
    });


    // ✏️ 모임 참여 인원 정보창 컨트롤
    const [showAttendanceList, setShowAttendanceList] = useState(true);
    const onClickAttendanceListBtn = () => {
        setShowAttendanceList(!showAttendanceList);
    }

    // 🛜 게시글 데이터 조회 요청
    const loadBoardData = async () => {
        console.log("🛜 서버로 게시글 조회 요청");
        await fetch(`/CR/BoardDetail/Board?boardId=${boardId}`,{
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
                        resultBoardType = "📢공지글"
                        break;
                    case "Tour" : 
                        resultBoardType = "🚩모임글"
                        break;
                    case "Free" : 
                        resultBoardType = "🆓자유글"
                        break;
                    case "Greetings" : 
                        resultBoardType = "😁인사글"
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
                    writerId : boardData.writer.userId,
                    writerLevel : writerLevel,
                    boardViewCnt : boardData.boardCnt, 
                    emergencyNote : boardData.emergencyNote,
                    endDate : new Date(boardData.endDate).toLocaleDateString('ko-KR',dateformatte),
                    startDate : new Date(boardData.startDate).toLocaleDateString('ko-KR',dateformatte),
                    regDate : new Date(boardData.regDate).toLocaleDateString('ko-KR',dateformatte),
                    tourAddress : boardData.address
                }
                setCrewBoardData(resultBoardData);
            }
        })
    }


    
    // ✏️ 댓글 리스트 데이터
    const [commentList, setCommentList] = useState([]);
    const [blockList, setBlockList] = useState(true);

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
                loadCommentList();
            } else response.status!==200&&alert("❌ 등록을 실패 했습니다..");
        })
    }

    

    // ✏️ 댓글 작성 데이터
    const [commentData,setCommentData] = useState({
        board_id:0,         // 게시글 ID
        comment_id:0,       // 상위 댓글 ID
        comment_context:''  // 댓글 내용
    })

    // ✏️ 댓글 데이터 입력
    const onChangeContext = (props) => {
        setCommentData({
            ...commentData,
            board_id:crewBoardData.boardId,
            comment_context:props.target.value
        });
    }

    const loadCommentList = async () => {
        console.log("🛜 댓글 리스트 호출");
        setBlockList(true);
        await fetch(`/CR/BoardDetail/Comment?boardId=${boardId}`,{
            headers:{
                "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`,
                "Content-Type": "application/json;charset=utf-8"
            }
        }).then(response=>{
            if(response.status===200){
                console.log("✅ 댓글 리스트 로드 완료");
                return response.json();
            }
        }).then(commentListData=>{
            !!commentListData&&console.log(commentListData);
            !!commentListData&&setCommentList(commentListData);
            setBlockList(false);
        })
    }

    // 데이터 삭제 영역
    const [showDeleteBox,setShowDeleteBox] = useState(false);
    const [deleteData, setDeleteData] = useState({Type:"",Id:0});
    const onClickDeleteBtn = (deleteBtn) => {
        setDeleteData({Type:deleteBtn.target.id,Id:deleteBtn.target.value});
        setShowDeleteBox(true);
    }

    return (
        <main>
            <DefaultHeader/>
                <section className='CrewBoardDetail'>
                    <CrewBoardDeleteCheckBox setShowDeleteBox={setShowDeleteBox} showDeleteBox={showDeleteBox} deleteData={deleteData} setDeleteData={setDeleteData} loadCommentList={loadCommentList}/>
                    <div className='BoardTopLine'>
                        <div className='boardTypeLine'>
                            <h1>크루</h1>
                            <h1>{crewBoardData.boardType}</h1>
                        </div>
                        <div className='TopLine1'>
                            <div className='TopLine2'>
                                <div className='BoardInfoTop'>
                                    <h2>✏️{crewBoardData.boardWriter}</h2>
                                    <span><h2>{crewBoardData.writerLevel}</h2></span>
                                </div>
                                <div className='BoardInfoTop'>
                                    <h2 style={!changeMode?{display:'flex'}:{display:'none'}}>{crewBoardData.startDate+" ~ "+crewBoardData.endDate}</h2>
                                    <div style={changeMode?{display:'flex'}:{display:'none'}} className='boardDateChangeLine'>
                                        <input type='button' id='boardDate' className='BoardChangeUpBtn' value={"기간 변경"} onClick={onClickBoardChangeBtn}/>
                                        <h2>시작 </h2>
                                        <DatePicker placeholderText={crewBoardData.startDate} boardData={changeData} isStartDate={true} setBoardData={setChangeData} dateEqual={false}/>
                                        <h2>종료 </h2>
                                        <DatePicker placeholderText={crewBoardData.endDate} boardData={changeData} isStartDate={false} setBoardData={setChangeData} dateEqual={false}/>
                                    </div>
                                    <div className='BoardOptionLine' style={crewBoardData.writerId===userId?{display:'flex'}:{display:'none'}}>
                                        <input type='button' className='BoardChangeBtn' onClick={onClickChangeModeBtn}/>
                                        <input id='Board' type='button' className='BoardDeleteBtn' onClick={onClickDeleteBtn} value={boardId}/>
                                    </div>
                                </div>
                                
                            </div>
                            <div className='TopLine2'>
                                <h1 style={!changeMode?{display:'flex'}:{display:'none'}}>{crewBoardData.boardTitle}</h1>
                                <div className='boardTitleOptionLine'>
                                    <input className='boardTitleChangeInput' type='text' id='boardTitle' style={changeMode?{display:'flex'}:{display:'none'}} placeholder={crewBoardData.boardTitle} value={changeData.boardTitle} onChange={onChangeBoardData}/>
                                    <input type='button' id='boardTitle' className='BoardTitleChangeBtn' style={changeMode?{display:'flex'}:{display:'none'}} value={"제목 변경"} onClick={onClickBoardChangeBtn}/>
                                </div>
                                <div className='TourAddressLine' style={crewBoardData.boardType==='🚩모임글'?{display:'flex'}:{display:'none'}}>
                                    <div>
                                        <h3 id='address'>장소🚩</h3>
                                        <input type='button' id='boardAddress' className='addressChangeUp'style={changeMode?{display:'flex'}:{display:'none'}} value={"장소 변경"} onClick={onClickBoardChangeBtn}/>
                                    </div>
                                    <h3 style={!changeMode?{display:'flex'}:{display:'none'}}>{crewBoardData.tourAddress}</h3>
                                    <input type='text' id='address' className='addressInput' placeholder={crewBoardData.tourAddress} value={changeData.tourAddress} style={changeMode?{display:'flex'}:{display:'none'}} onChange={onChangeBoardData}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='BoardBottomLine'>

                        {/* 모임 관련 정보 박스 영역 */}
                        <div className='TourInfo' style={crewBoardData.boardType==='🚩모임글'?{display:'flex'}:{display:'none'}}>
                            <div className='TourInfoSlideOff' style={showAttendanceList?{display:'flex'}:{display:'none'}}>
                                <div className='AttendanceCnt'>
                                    <h2>참여 인원</h2>
                                    <h2>(100/100)</h2>
                                </div>
                                <div className='TourBtnLine' id='Off'>
                                    <input type='radio' name='attachBtn' id='attachOkayOff' value={true} hidden/>
                                    <label htmlFor='attachOkayOff'><h2>참여</h2></label>
                                    <input type='radio' name='attachBtn' id='attachNonOff' value={false} hidden/>
                                    <label htmlFor='attachNonOff'><h2>불참여</h2></label>
                                </div>
                            </div>
                            <div className='TourInfoSideOn' style={showAttendanceList?{display:'none'}:{display:'flex'}}>
                                <div className='AttendanceListTop'>
                                    <div className='AttendanceCnt'>
                                        <h2>참여 인원</h2>
                                        <h2>(100/100)</h2>
                                    </div>
                                    <div className='TourBtnLine' id='On'>
                                        <input type='radio' name='attachBtn' value={true} id='attachOkayOn' hidden/>
                                        <label htmlFor='attachOkayOn'><h2>참여</h2></label>
                                        <input type='radio' name='attachBtn' value={false} id='attachNonOn' hidden/>
                                        <label htmlFor='attachNonOn'><h2>불참여</h2></label>
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
                                    <label htmlFor='TourSlideBtn'>{showAttendanceList?<h2>명<br/>단<br/> <br/>보<br/>기</h2>:<h2>명<br/>단<br/> <br/>숨<br/>김</h2>}</label>
                                    <input id='TourSlideBtn' onClick={onClickAttendanceListBtn} hidden/>
                            </div>
                        </div>

                        {/* 게시글 내용 영역 */}

                        <div className='boardContextBox'>
                            <textarea disabled style={changeMode?{display:'none'}:{display:'flex'}} value={crewBoardData.boardContext}/>
                            <textarea style={changeMode?{display:'flex'}:{display:'none'}} id='boardContext' placeholder={crewBoardData.boardContext} onChange={onChangeBoardData}/>
                            <input type='button' id='boardContext' className='boardContextChangeBtn' style={changeMode?{display:'flex'}:{display:'none'}} value={"내용 변경"} onClick={onClickBoardChangeBtn}/>
                            
                            {/* 댓글 영역 */}
                            <div className='commentLine'>
                                <div className='commentList'> {/* 댓글 목록 */}
                                    <div className='loadingBlock' style={blockList?{display:'flex'}:{display:'none'}}>
                                        <h1>🔎 댓글을 불러오는 중입니다.</h1>
                                        <h1>- 잠시만 기달려 주세요 -</h1>
                                    </div>
                                    <div className='commentEmptyNote' style={!blockList&&commentList.length===0?{display:'flex'}:{display:'none'}}>
                                        <h1>⚠️ 등록된 댓글이 없습니다.</h1>
                                    </div>
                                    <div className='commentListLine' style={!blockList&&commentList.length>0?{display:'flex'}:{display:'none'}}>
                                        {commentList.map((commentData,index) => {
                                        if(!commentData.commentReply) 
                                            return <CrewBoardCommentBox key={index} commentData={commentData} replyList={commentList.filter(
                                                comment=>comment.commentReply&&comment.commentReply.commentId===commentData.commentId)} 
                                                userId={userId} loadCommentList={loadCommentList} upLoadReply={upLoadComment} boardId={boardId} onClickDeleteBtn={onClickDeleteBtn}/>;
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
                        </div>

                    </div>
                </section>
            <DefaultFooter/>
        </main>
    );
};

export default CrewBoardDetail;