import React from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css';

const HomePage = () => {

    return (
        <>
            <header>    {/* 상단 타이틀 부분 */}
                <div className='logimg'>
                    <img src='/img/Log_img.png' id="log_img" alt='logo192.png'/>
                </div>
                <div className='top_line'>
                    <div className='top_tag_line'>
                        <Link to="" className='top_tag'>login</Link>
                        <Link to="" className='top_tag'>my page</Link>
                    </div>
                    <nav className='topNav'>
                        <div className='NavMiain'>
                        <h1>CREW AREA</h1>
                            <div className='category'>CREW MASTER</div>      {/*크루 설정, 생성*/}
                            <div className='category'>CREW MANAGER</div>     {/*크루원 관리*/}
                            <div className='category'>CREW BOARD</div>       {/*크루 게시파*/}
                            <div className='category'>CREW PAGE</div>        {/*크루원 페이지*/}
                            <div className='category'>CREW JOIN</div>        {/*크루원 모집*/}
                        </div>
                        <div className='NavMiain'>
                        <h1>RIDER AREA</h1>             
                            <div className='category'>RIDER BOARD</div>      {/*라이더 커뮤니티*/}
                            <div className='category'>TOUR BOARD</div>       {/*투어 게시판*/}
                            <div className='category'>MOTO CAMPING</div>     {/*모토 캠핑 게시판*/}
                            <div className='category'>RIDING COURSE</div>    {/*라이딩 코스 추천*/}
                        </div>
                    </nav>
                </div>
                
            </header>
            <section>  {/* 메인 영역 부분*/}
                메인 영역 부분
            </section>
            <footer>    {/* 푸터 영역*/}
                푸터 영역
            </footer>
        </>
    );
};

export default HomePage;