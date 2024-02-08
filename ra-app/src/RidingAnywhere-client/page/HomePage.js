import React from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css';
import '../css/index.css';

const HomePage = () => {
    document.title = "Riding AnyWhere"
    return (
        <body>
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
                    <div>
                        
                    </div>
            </section>
            <footer>    {/* 푸터 영역*/}
                <h3>Riding Anywhere 는 모든 라이더들의 안전한 라이딩을 기원합니다!</h3>
                <h3>문의 사항은 IG :
                <Link to="https://www.instagram.com/lee.traveler92?igsh=bm1ibWVxczR3YzRt" >LeeTraveler92</Link> 로 DM 남겨주시길 바랍니다.</h3>
            </footer>
        </body>
    );
};

export default HomePage;