import React from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';
import '../css/crewBoardWrite.css';

const CrewBoardWrite = () => {
    return (
        <main>
            <DefaultHeader/>
                    <section className='CrewBoardWrite'>
                        <div className='WriteTop'>
                            <h1>크루 게시판</h1>
                            <div className='WriteOptionLine'>
                                <h2>게시글 종류</h2>
                                <select value={'Note'}>
                                    <option value={'Note'}>공지글</option>
                                    <option value={'Tour'}>스케줄</option>
                                    <option value={'Free'}>자유글</option>
                                    <option value={'Greetings'}>인사말</option>
                                </select>
                                <div className='WriteOptionBox'>
                                    <div className='NoteOption'>
                                        <input id='BoardPosition' className='BoardPositionBtn' type='checkBox' hidden/>
                                        <label htmlFor='BoardPosition' className='BoardPositionLabel'><h2>최상단 배치</h2></label>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='BoardWriteBox'>
                            <textarea className='WriteTextarea'>
                            </textarea>
                        </div>
                </section>
            <DefaultFooter/>
        </main>
    );
};

export default CrewBoardWrite;