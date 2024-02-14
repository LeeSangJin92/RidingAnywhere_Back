import React from 'react';
import '../css/addbikepage.css';
import DefaultFooter from '../component/DefaultFooter';
import DefaultHeader from '../component/DefaultHeader_small';

const AddBike = () => {

    return (
        <main>
            <section className='Section_addbike'>
                <DefaultHeader word={'바이크 등록'}/>
                <div className='Addbike_Box'>
                <div className='addbike_line'><h2>바이크 브랜드</h2><input type='textbox' className='seuch_bike' placeholder='ex) 혼다, 야마하, 등...'/></div>
                <div className='addbike_line'><h2>바이크 모델</h2><input type='textbox' className='seuch_bike' placeholder='ex) R3, R6, 등...'/></div>
                <div className='addbike_line'><h2>바이크 배기량</h2><input type='number' className='seuch_bike' placeholder='ex) 배기량을 입력하세요'/></div>
                <div className='addbike_line'><h2>바이크 연식</h2><input type='number' className='seuch_bike' placeholder='ex) 연식을 입력하세요'/></div>
                <div className='addbike_line'><h2>바이크 상태</h2><input type='textbox' className='seuch_bike' placeholder='ex) 인수중, 수리중, 운행중'/></div>
                <div className='Button_line'>
                    <button className='btn_submit_addbike' id='btnSignUp'>가입 완료</button>
                </div>
                </div>
            </section>
                <DefaultFooter/>
        </main>
    );
};

export default AddBike;