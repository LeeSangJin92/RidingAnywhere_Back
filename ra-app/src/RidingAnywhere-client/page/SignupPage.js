import React from 'react';
import DefaultFooter from '../component/DefaultFooter';
import '../css/signuppage.css';
import DefaultHeader from '../component/DefaultHeader_small';
const SignupPage = () => {
    return (
        <main>
            <section className='Section_signup'>
            <DefaultHeader word={'회원가입'}/>
            <div className='Signup_Box'>
                <div className='Signup_line'><h2>이메일</h2><input type='textbox' placeholder='ex) test1@naver.com'/></div>
                <div className='Signup_line' id='Email_pass'>
                    <input type='button' name='Eamil_check'/>
                    <label for='Eamil_check'>인증 요청</label>
                    <input type='textbox' placeholder='ex) 1234'/></div>
                
                <div className='Signup_line'><h2>닉네임</h2><input type='textbox'/></div>
                <div className='Signup_line'><h2>이름</h2><input type='textbox'/></div>
                <div className='Signup_line'><h2>생년월일</h2><input type='textbox'/></div>
                <div className='Signup_line'><h2>연락처</h2><input type='textbox' placeholder='숫자만 입력하세요!'/></div>
                <div className='Gender_radio'>
                    <input id='gender1' name='gender_button' type='radio' value='true'/>
                    <label for='gender1'>남자</label>
                    <input id='gender2' name='gender_button' type='radio' value='false'/>    
                    <label for='gender2'>여자</label>
                    <input id='gender3' name='gender_button' type='radio' value='null'/>    
                    <label for='gender3'>선택안함</label>
                </div>
                <div className='Button_line'>
                    <button className='btn_submit' id='btnSignUp'>다음</button>
                </div>
                </div>
            </section>
            <DefaultFooter/>
        </main>
    );
};
export default SignupPage;