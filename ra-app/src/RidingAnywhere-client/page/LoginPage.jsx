import React, { useState } from 'react';
import '../css/loginpage.css';
import DefaultFooter from '../component/DefaultFooter';
import { Link, useNavigate } from 'react-router-dom';
import DefaultHeader from '../component/DefaultHeader_small';
import styled from 'styled-components';

const LoginPage = () => {

    const navigate = useNavigate();

    // Request 보낼 데이터 기본값
    const [request, setRequest] = useState({
        userEmail:"",
        userPassword:""
    },[]);
    
    const [loginBtnAct, setLoginBtnAct] = useState(true);

    // 로그인 데이터 수정하는 영역
    const changeValue = (data)=>{
        let emailRegExp = new RegExp("^([A-Za-z0-9])+@+([A-Za-z0-9])+\\.+([A-Za-z])+$");
        let passwordRegExp = new RegExp('^(?=.*[A-Za-z])(?=.*[\\d])(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,14}$');
        setRequest({
            ...request,
            [data.target.name]:data.target.value
        });
        setLoginBtnAct(!(emailRegExp.test(request.userEmail)&&passwordRegExp.test(request.userPassword)));
        setErrorWord({...errorWord,
            errorEmail:emailRegExp.test(request.userEmail),
            errorPW:passwordRegExp.test(request.userPassword)})
    };


    // Request 보내는 작업 영역
    const login_start = (e)=>{
        e.preventDefault();
        fetch("http://localhost:8080/RA/Login",{
            method: "POST", 
            headers: {
                "Content-Type": "application/json;charset=utf-8",       // 전송되는 데이터 타입 옵션 설정!
            },
            body:JSON.stringify(request)
            }).then(response => {
                if(response.status===200) navigate("/RA/Home");
                else if(response.status===404) setErrorWord({...errorWord,errorUndefined:false});
                else setErrorWord({...errorWord,errorUndefined:false})})
    }

    const [errorWord,setErrorWord] = useState({
        errorEmail:true,
        errorPW:true,
        errorUndefined:true
    })

    return (
        <main>
            <section className='Section_login'>
            <DefaultHeader word={'로그인'}/>
                <div className='Login_Box'>
                    <div className='Login_InputLine'>
                        <div className='input_wrap'>
                            <div className='input_row'>
                                <h2>Emaiil</h2>
                                <input className='login_textline' name='userEmail' type='textbox' onChange={changeValue} onBlur={changeValue}/>
                            </div>
                            <div className='input_row'>
                                <h2>PW</h2>
                                <input className='login_textline' name='userPassword' type='password' onChange={changeValue} onBlur={changeValue}/>
                            </div>
                        </div>
                        <div className='input_wrap'>
                            <input type='button' className='Login_Button' value={'Login'} onClick={login_start} disabled={loginBtnAct}/>
                            <Link to={'/RA/SignUp'}><img className='OAuth_log' src='/img/RA_icon.png' alt=''/></Link>
                        </div>
                    </div>
                </div>
                <p className='errorWord' name='errorEmail' style={{display:errorWord.errorEmail?'none':'block'}}>이메일 정보가 정확하지 않습니다.</p>
                <p className='errorWord' name='errorPW' style={{display:errorWord.errorPW?'none':'block'}}>비밀번호가 정확하지 않습니다.</p>
                <p className='errorWord' name='errorUndefined' style={{display:errorWord.errorUndefined?'none':'block'}}>등록되지 않은 이메일 정보입니다.</p>
            </section>
                <DefaultFooter/>
        </main>
    );
};

export default LoginPage;