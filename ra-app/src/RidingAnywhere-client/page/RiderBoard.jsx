import React, { useState } from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import '../css/RiderBoard.css';
import { useNavigate } from 'react-router-dom';

const RiderBoard = () => {
    // 네비 사용
    const navigate = useNavigate();

    // 토큰 체크
    const [accessToken] = useState(!sessionStorage.getItem('accessToken'));

    // 화면 컨트롤
    const [viewBlock,setViewBlock] = useState(true);

    // 접속한 유저 정보
    const [riderInfo, setriderInfo] = useState({
        userId : 0,
        userCrewId : 0,
     });

     // 게시글 목록
    const [riderBoardList,setRiderBoardList] = useState([]);
    
    // 필터 리스트
    const [filterList, setFilterList] = useState({
        Note:true,
        Tour:true,
        Free:true,
        Greetings:true,
        SearchText:new RegExp(''),
        SearchType:'all'
    });

    // 검색 데이터
    const [searchData,setSearchData] = useState({
        Text:"",
        Type:"all"
    })

    // ✏️ 검색 데이터 작성
    const changeSearchData = (inputData) => {
        let key = inputData.target.className==="boardTextBox"?"Text":"Type";
        let changeData = inputData.target.value;
        setSearchData({...searchData,[key]:changeData})
    }

    // 🕹️ 게시글 검색 버튼 클릭
    const onClickSearchBtn = () => {
        if(!searchData.Text){
            alert("⚠️검색어가 비어 있습니다.");
            setFilterList({
                ...filterList,SearchText:new RegExp('')
            });
        } else {
            let filterText = new RegExp(searchData.Text);
            setFilterList({
                ...filterList,
                SearchText:filterText,
                SearchType:searchData.Type
            });
        }
    }

    // 🕹️ 게시글 필터 버튼 클릭
    const onClickFilterBtn = (filterData) => {
        setFilterList({
            ...filterList,
            [filterData.target.id]:!filterList[filterData.target.id]
        })
    }

    // 🕹️ 게시글 작성 버튼 클릭
    const onClickWriteBtn = () => {
        console.log("🕹️ 게시글 작성 페이지로 이동")
        navigate("/RA/Board/Write");
    }


    return (
        <main>
            <DefaultHeader/>
            <section className='RiderBoard'>

                {/* 검색 및 필터 영역 */}
                <div className='boardTopLine'>
                    <div className='boardFilterLine'>
                        <div className='filterTop'>
                            <h1>라이더 게시판</h1>
                            <input type='text' className='boardTextBox' value={searchData.Text} placeholder='찾고 싶은 키워드를 입력하세요!' onChange={changeSearchData} disabled={viewBlock}/>
                            <input type='button' className='boardSearchBtn' disabled={viewBlock} onClick={onClickSearchBtn}/>
                            <select className='boardSearchType' value={searchData.Type} onChange={changeSearchData}  disabled={viewBlock}>
                                <option value={"all"}>제목 + 내용</option>
                                <option value={"title"}>제목</option>
                                <option value={"context"}>내용</option>
                            </select>
                        </div>
                        <div className='filterBottom'>
                            <h1>필터</h1>
                            <input type='checkbox' id='Free' className='filterInput' checked={filterList.Free} onClick={onClickFilterBtn} disabled={viewBlock} hidden/>
                            <label htmlFor='Free' className='filterCheckBox'><span>자유글</span></label>
                            <input type='checkbox' id='Event' className='filterInput' checked={filterList.Free} onClick={onClickFilterBtn} disabled={viewBlock} hidden/>
                            <label htmlFor='Event' className='filterCheckBox'><span>사건글</span></label>
                            <input type='checkbox' id='Driving' className='filterInput' checked={filterList.Free} onClick={onClickFilterBtn} disabled={viewBlock} hidden/>
                            <label htmlFor='Driving' className='filterCheckBox'><span>번개글</span></label>
                            <input type='checkbox' id='Mechanic' className='filterInput' checked={filterList.Free} onClick={onClickFilterBtn} disabled={viewBlock} hidden/>
                            <label htmlFor='Mechanic' className='filterCheckBox'><span>정비글</span></label>
                        </div>
                    </div>
                    <label htmlFor='writeBtn' className='boardWriteBtn'><span>게시글<br/>작성</span></label>
                    <input type='button' id='writeBtn' onClick={onClickWriteBtn} hidden/>
                </div>

                {/* 게시판 리스트 영역 */}
                <div className='boardList'>
                    <div className='boardListHeader'>
                        <h2 className='boardNo'>No</h2>
                        <h2 className='boardType'>말머리</h2>
                        <h2 className='boardTitle'>제목</h2>
                        <h2 className='boardWriter'>작성자</h2>
                        <h2 className='boardCount'>조회수</h2>
                    </div>
                    <div className='boardListBody'>
                        
                    </div>
                </div>



            </section>
            <DefaultFooter/>
        </main>
    );
};

export default RiderBoard;