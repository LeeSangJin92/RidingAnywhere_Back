import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css';
import '../css/index.css';
import DefaultFooter from '../component/DefaultFooter';

const HomePage = () => {

    return (
        <main>
            <header>    {/* 상단 타이틀 부분 */}
                <div className='logimg'>
                    <img src='/img/Log_img.png' id="log_img" alt='logo192.png'/>
                </div>
                <div className='top_line'>
                    <div className='top_tag_line'>
                        <Link to="/RA/Login" className='top_tag' name="unaccesslog_btn">log in</Link>
                        <Link to="/RA/Signup" className='top_tag' name="unaccesslog_btn">Sign Up</Link>
                        <Link to="" className='top_tag' name="accesslog_btn">my page</Link>
                        <Link to="" className='top_tag' name="accesslog_btn">log out</Link>
                    </div>
                    <nav className='topNav'>
                        <div className='NavMiain'>
                            <h1>CREW AREA</h1>
                            <div className='NavMenu'>
                                <div className='NavCategory'>CREW<br/>MASTER</div>      {/*크루 설정, 생성*/}
                                <div className='NavCategory'>CREW<br/>MANAGER</div>     {/*크루원 관리*/}
                                <div className='NavCategory'>CREW<br/>BOARD</div>       {/*크루 게시판*/}
                                <div className='NavCategory'>CREW<br/>PAGE</div>        {/*크루원 페이지*/}
                                <div className='NavCategory'>CREW<br/>JOIN</div>        {/*크루원 모집*/}
                            </div>
                        </div>
                        <div className='NavMiain'>
                            <h1>RIDER AREA</h1>       
                            <div className='NavMenu'>      
                                <div className='NavCategory'>RIDER<br/>BOARD</div>      {/*라이더 커뮤니티*/}
                                <div className='NavCategory'>TOUR<br/>BOARD</div>       {/*투어 게시판*/}
                                <div className='NavCategory'>MOTO<br/>CAMPING</div>     {/*모토 캠핑 게시판*/}
                                <div className='NavCategory'>RIDING<br/>COURSE</div>    {/*라이딩 코스 추천*/}
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            <section>  {/* 메인 영역 부분*/}
                    <div className='CrewHome'>
                        크루 영역
                    </div>
                    <div className='RiderHome'>
                        오픈 게시판 영역
                    </div>
            </section>
                <DefaultFooter/>
        </main>
    );
};

export default HomePage;