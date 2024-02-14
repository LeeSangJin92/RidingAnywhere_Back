import React, { useState } from 'react';
import DefaultFooter from '../component/DefaultFooter';
import '../css/signuppage.css';
import DefaultHeader from '../component/DefaultHeader_small';
import { useNavigate } from 'react-router-dom';
const SignupPage = () => {

    const navigate = useNavigate();


    // 회원 데이터 초기값 설정
    const [userData,setUserData] = useState({
        userNickname:"",
        userName:"",
        userBirthday:"",
        userGender:"",
        userPhone:"",
        userEmail:"",
        userPassword:"",
        userPasswordRe:"",
        authority:""
    })

    // 회원 데이터 입력 설정
    const changeData = (data) =>{
        setUserData({
            ...userData,
            [data.target.name]:data.target.value
        })
    }

    // 회원 정보 관련 정규표현식 데이터들
    const mapRegExp = {
        "userEmail" : new RegExp("^([A-Za-z0-9])+@+([A-Za-z0-9])+\\.+([A-Za-z])+$"),
        "userPassword" : new RegExp('^(?=.*[A-Za-z])(?=.*[\\d])(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,14}$'),
        "userPasswordRe" : new RegExp(userData.userPasswordRe),
        "userNickname" : new RegExp('^([A-Za-z\\d\\uAC00-\\uD7A3\\u3131-\\u314E]){1,8}$'),
        "userName" : new RegExp('^([\\uAC00-\\uD7A3]){1,4}$'),
        "userBirthday" : new RegExp('^([\\d]){8,8}$'),
        "userPhone" : new RegExp('^([\\d]){11,11}$')
    }

    // 회원 데이터 검증
    const checkData = (data) => {

            if((mapRegExp[data.target.name]).test(data.target.value)){
                
            }
    }

    // 회원 가입 서버로 요청
    const signUpPost = (e) => {
        e.preventDefault();
        setUserData({...userData,authority:'1'})
        fetch("http://localhost:8080/RA/SignUp",{
            method: "POST", 
            headers: {
                "Content-Type": "application/json;charset=utf-8",       // 전송되는 데이터 타입 옵션 설정!
            },
            body:JSON.stringify(userData)
        }).then(response => {
            switch(response.status){
                case 400 :
                    alert("이미 가입된 회원입니다.");
                    break;
                case 412 :
                    alert("회원가입이 실패하였습니다.");
                    break;
                default :
                alert("회원가입이 완료되었습니다.");
                return response.json;
            }
        }).then(()=>{
            navigate("/RA/Login");
        })

    }

    return (
        <main>
            <section className='Section_signup'>
            <DefaultHeader word={'회원가입'}/>
            <div className='Signup_Box'>
                <div className='Signup_line'>
                    <h2>이메일</h2>
                    <input type='eamil' placeholder='ex) test1@naver.com' name='userEmail' onChange={changeData} onBlur={checkData}/>
                </div>
                <h8 name='userEmailError'>※ 에러 경고 문구 라인</h8>
                <div className='Signup_line' id='Email_pass'>
                    <input type='button' name='Eamil_check'/>
                    <label for='Eamil_check'>인증 요청</label>
                    <input type='textbox' maxLength="8" placeholder='ex) 1234'/>
                </div>
                <h8>※ 에러 경고 문구 라인</h8>
                <div className='Signup_line'><h2>비밀번호</h2><input type='password' name='userPassword' onChange={changeData} onBlur={checkData}/></div>
                <h8 name='userPasswordError'>※ 에러 경고 문구 라인</h8>
                <div className='Signup_line'><h2>비밀번호 확인</h2><input type='password' name='userPasswordRe' onChange={changeData} onBlur={checkData}/></div>
                <h8 name='userPasswordReError'>※ 에러 경고 문구 라인</h8>
                <div className='Signup_line'><h2>닉네임</h2><input type='textbox' name='userNickname' onChange={changeData} onBlur={checkData}/></div>
                <h8 name='userNicknameError'>※ 에러 경고 문구 라인</h8>
                <div className='Signup_line'><h2>이름</h2><input type='textbox' name='userName' onChange={changeData} onBlur={checkData}/></div>
                <h8 name='userNameError'>※ 에러 경고 문구 라인</h8>
                <div className='Signup_line'><h2>생년월일</h2><input type='textbox' maxLength="8" placeholder='ex) 19920110' name='userBirthday' onChange={changeData} onBlur={checkData}/></div>
                <h8 name='userBirthdayError'>※ 에러 경고 문구 라인</h8>
                <div className='Signup_line'><h2>연락처</h2><input type='textbox' placeholder='핸드폰번호를 숫자로만 입력하세요!' name='userPhone' onChange={changeData} onBlur={checkData}/></div>
                <h8 name='userPhoneError'>※ 에러 경고 문구 라인</h8>
                <div className='Gender_radio'>
                    <input id='gender1' name='userGender' type='radio' value='true' onChange={changeData}/>
                    <label for='gender1'>남자</label>
                    <input id='gender2' name='userGender' type='radio' value='false' onChange={changeData}/>    
                    <label for='gender2'>여자</label>
                    <input id='gender3' name='userGender' type='radio' value='null' onChange={changeData}/>    
                    <label for='gender3'>선택안함</label>
                </div>
                <div className='Button_line'>
                    <button className='btn_submit_signup' id='btnSignUp' onClick={signUpPost}>다음</button>
                </div>
                </div>
            </section>
            <DefaultFooter/>
        </main>
    );
};
export default SignupPage;