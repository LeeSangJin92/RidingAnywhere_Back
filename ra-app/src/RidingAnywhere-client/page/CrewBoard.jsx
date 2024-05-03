import React from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import '../css/crewBoard.css';
import { useNavigate } from 'react-router-dom';
const CrewBoard = () => {
    const navigate = useNavigate();

    return (
        <main>
            <DefaultHeader/>
            <section className='CrewBoard'>
                <div className='boardTopLine'>
                    <div className='boardFilterLine'>
                        <div className='filterTop'>
                            <h1>크루 게시판</h1>
                            <input type='text' className='boardTextBox' placeholder='찾고 싶은 키워드를 입력하세요!' />
                            <input type='button' className='boardSearchBtn'/>
                            <select className='boardSearchType'>
                                <option value={"all"}>제목 + 내용</option>
                                <option value={"title"}>제목</option>
                                <option value={"context"}>내용</option>
                            </select>
                        </div>
                        <div className='filterBottom'>
                            <h1>필터</h1>
                            <input type='checkbox' id='filterNote' className='filterInput' hidden/>
                            <label htmlFor='filterNote' className='filterCheckBox'><span>공지글</span></label>
                            <input type='checkbox' id='filterTour' className='filterInput' hidden/>
                            <label htmlFor='filterTour' className='filterCheckBox'><span>스케줄</span></label>
                            <input type='checkbox' id='filterFree' className='filterInput' hidden/>
                            <label htmlFor='filterFree' className='filterCheckBox'><span>자유글</span></label>
                            <input type='checkbox' id='filterGreetings' className='filterInput' hidden/>
                            <label htmlFor='filterGreetings' className='filterCheckBox'><span>인사말</span></label>
                            <select className='PageSelect'>
                                <option value={5}>5개</option>
                                <option value={10}>10개</option>
                                <option value={20}>20개</option>
                            </select>
                        </div>
                    </div>
                    <label htmlFor='writeBtn' className='boardWriteBtn'><span>게시글<br/>작성</span></label>
                    <input id='writeBtn' type='button' onClick={navigate("/CR/BoardWrite")} hidden/>
                </div>
                
                <div className='boardListLine'>
                    <div className='boardListHeadLine'>
                        <h2 className='boardNo'>No</h2>
                        <h2 className='boardType'>말머리</h2>
                        <h2 className='boardTitle'>제목</h2>
                        <h2 className='boardWriter'>작성자</h2>
                        <h2 className='boardLevel'>등급</h2>
                        <h2 className='boardCount'>조회수</h2>
                    </div>
                    <div className='boardListBodyLine'>
                        <h2 className='boardNo'>1</h2>
                        <h2 className='boardType'>공지</h2>
                        <h2 className='boardTitle'>크루 안전기원 공지 사항</h2>
                        <h2 className='boardWriter'>닉네임</h2>
                        <h2 className='boardLevel'>마스터</h2>
                        <h2 className='boardCount'>5</h2>
                    </div>
                </div>
                <div className='boardPageLine'>
                    <input type='button' className='pageNumberBtn' value={1}/>
                    <input type='button' className='pageNumberBtn' value={2}/>
                    <input type='button' className='pageNumberBtn' value={3}/>
                    <input type='button' className='pageNumberBtn' value={4}/>
                    <input type='button' className='pageNumberBtn' value={5}/>
                </div>
            </section>
            <DefaultFooter/>
        </main>
    );
};

export default CrewBoard;