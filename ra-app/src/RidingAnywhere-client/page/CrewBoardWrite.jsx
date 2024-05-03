import React from 'react';
import DefaultHeader from '../component/DefaultHeader_main';
import DefaultFooter from '../component/DefaultFooter';

const CrewBoardWrite = () => {
    return (
        <div>
            <DefaultHeader/>
                <section className='CrewBoardWrite'>
                    <h1>크루 게시글 작성 페이지</h1>
                </section>
            <DefaultFooter/>
        </div>
    );
};

export default CrewBoardWrite;