import React, { useState } from 'react';
import '../css/loginpage.css';
import DefaultFooter from '../component/DefaultFooter';
import { Link, useNavigate } from 'react-router-dom';
import DefaultHeader from '../component/DefaultHeader_small';

const LoginPage = () => {

    const navigate = useNavigate();

    // Request 보낼 데이터 기본값
    const [request, setRequest] = useState({
        userEmail:"",
        userPassword:""
    },[]);
    
    // 로그인 데이터 수정하는 영역
    const changeValue = (data)=>{
        setRequest({
            ...request,
            [data.target.name]:data.target.value
        });
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
                else if(response.status===404) alert("등록되지 않은 이메일 입니다.");
                else alert("비밀번호를 확인해 주시길 바랍니다.")});
    }

    // const emailRegExp = new RegExp("^([A-Za-z0-9])+@+([A-Za-z0-9])+\\.+([A-Za-z])+$")
    // const passwordRegExp = new RegExp('^(?=.*[A-Za-z])(?=.*[\\d])(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,14}$')

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
                                <input className='login_textline' name='userPassword' type='password' onChange={changeValue}/>
                            </div>
                        </div>
                        <input className='Login_Button' type='button' value={'Login'} onClick={login_start}/>
                    </div>
                    <div className='OAuth_Line'>
                        <Link to={''}><img className='OAuth_log' src='/img/N_icon.png' alt=''/></Link>
                        <Link to={''}><img className='OAuth_log' src='/img/N_icon.png' alt=''/></Link>
                        <Link to={''}><img className='OAuth_log' src='/img/N_icon.png' alt=''/></Link>
                        <Link to={'/RA/SignUp'}><img className='OAuth_log' src='/img/RA_icon.png' alt=''/></Link>
                    </div>
                </div>
                <p className='errorWord' name='errorEmail'></p>
                <p className='errorWord' name='errorPW'></p>
                <p className='errorWord' name='errorUndefined'></p>
            </section>
                <DefaultFooter/>
        </main>
    );
};

export default LoginPage;