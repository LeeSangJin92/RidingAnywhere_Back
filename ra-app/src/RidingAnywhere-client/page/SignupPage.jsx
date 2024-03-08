import React, { useEffect, useState } from 'react';
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
        userPasswordRe:""
    },[])

    // 입력된 정보 에러 체크 및 Display 설정 [에러문구 색상, Display 설정]
    const [dataCheck,setDataCheck] = useState({
        userNickname:[false,false],
        userName:[false,false],
        userBirthday:[false,false],
        userPhone:[false,false],
        userEmail:[false,false],
        emailAuth:[false,false],
        userPassword:[false,false],
        userPasswordRe:[false,false]
    },[])

    // 서브밋 버튼 활성화 및 비활성화 여부 확인
    const [disableBtn,setDisableBtn] = useState(false)
    useEffect(()=>{
        setDisableBtn(Object.values(dataCheck).map(data=>data[0]).includes(false))
    },[dataCheck])

    // 회원 데이터 입력 설정
    const changeData = (data) =>{
        setUserData({
            ...userData,
            [data.target.name]:data.target.value
        })
    }

    // 이메일 인증 번호 입력 값
    const [emailAuthData,setEmailAuthData] = useState("")
    const changeEmailAuthData = (data) =>{
        setEmailAuthData(
            data.target.value
        );
        setDataCheck({...dataCheck,emailAuth:[parseInt(emailAuthData)===parseInt(emailKey),true]})
    }

    const [emailKey,setEmailKey] = useState("")


    // 회원 정보 관련 정규표현식 데이터
    const mapRegExp = {
        "userEmail" : new RegExp("^([A-Za-z0-9])+@+([A-Za-z0-9])+\\.+([A-Za-z])+$"),
        "emailAuth" : new RegExp("^([\\d]{8,8}$)"),
        "userPassword" : new RegExp('^(?=.*[A-Za-z])(?=.*[\\d])(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,14}$'),
        "userPasswordRe" : new RegExp(userData.userPasswordRe),
        "userNickname" : new RegExp('^([A-Za-z\\d\\uAC00-\\uD7A3\\u3131-\\u314E]){1,8}$'),
        "userName" : new RegExp('^([가-힣]){3,4}$'),
        "userBirthday" : new RegExp('^([\\d]){8,8}$'),
        "userPhone" : new RegExp('^([\\d]){11,11}$')
    };

    // 회원 데이터 검증
    const checkData = (data) => {
        let tagName = data.target.name;
        setDataCheck({...dataCheck,[tagName]:[mapRegExp[tagName].test(data.target.value),true]})
    }

    // 회원 가입 서버로 요청
    const signUpPost = (e) => {
        e.preventDefault();
        setUserData({...userData,authority:'1'})
        fetch("http://localhost:8080/RA/Signup",{
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
                default :
                alert("회원가입이 완료되었습니다.");
                return response.json;
            }
        }).then(()=>{
            navigate("/RA/AddBike");
        })

    }
    const [emailAuthDisable,setEmailAuthDisabled] = useState(true);

    // 이메일 인증 번호 전송
    const sendEmailAuth = () => {
        fetch("http://localhost:8080/RA/SignUp/Email",{
            method: "POST",
            headers:{
                "Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(userData.userEmail)
            }).then(code=>{
                if(code.status===200) return code.json();
            }).then((data)=>{
                console.log(data);
                setEmailKey(data);
            })
            setEmailAuthDisabled(false);
        }

    return (
        <main>
            <section className='Section_signup'>
            <DefaultHeader word={'회원가입'}/>
            <div className='Signup_Box'>

                {/* 이메일 입력 라인 */}
                <div className='Signup_line'>
                    <h2>이메일</h2>
                    <input type='eamil' placeholder='ex) test1@naver.com' name='userEmail' onChange={changeData} onBlur={checkData}/>
                </div>
                <h8 name='userEmailError' style={{color: dataCheck.userEmail[0]?'green':'red', display:dataCheck.userEmail[1]?'block':'none'}}>
                    {dataCheck.userEmail[0]?'정상적으로 입력되었습니다.':'이메일 정보가 정확하지 않습니다.'}
                </h8>

                {/* 이메일 인증 라인 */}
                <div className='Signup_line' id='Email_pass'>
                    <button name='emailAuth' value={""} onClick={sendEmailAuth} disabled={dataCheck.userEmail[0]?false:true}>인증 요청</button> 
                    <input type='textbox' name='emailAuthData' maxLength="8" placeholder='ex) 12345678' onChange={changeEmailAuthData} onBlur={changeEmailAuthData} disabled={emailAuthDisable}/>
                </div>
                <h8 name='emailAuthError' style={{color : dataCheck.emailAuth[0]?'green':'red', display:dataCheck.emailAuth[1]?'block':'none'}}>
                    {dataCheck.emailAuth[0]?'인증이 완료 되었습니다':'인증번호가 정확하지 않습니다.'}
                </h8>

                {/* 1차 비밀번호 입력 라인 */}
                <div className='Signup_line'><h2>비밀번호</h2><input type='password' name='userPassword' onChange={changeData} onBlur={checkData}/></div>
                <h8 name='userPasswordError' style={{color : dataCheck.userPassword[0]?'green':'red', display:dataCheck.userPassword[1]?'block':'none'}}>
                    {dataCheck.userPassword[0]?'정상적으로 입력되었습니다.':'비밀번호가 정확하지 않습니다.'}
                </h8>
                
                {/* 2차 비밀번호 입력 라인 */}
                <div className='Signup_line'><h2>비밀번호 확인</h2><input type='password' name='userPasswordRe' onChange={changeData} onBlur={checkData}/></div>
                <h8 name='userPasswordReError' style={{color : dataCheck.userPasswordRe[0]?'green':'red', display:dataCheck.userPasswordRe[1]?'block':'none'}}>
                    {dataCheck.userPasswordRe[0]?'정상적으로 입력되었습니다.':'비밀번호와 동일하지 않습니다.'}
                </h8>
                
                {/* 닉네임 입력 라인 */}
                <div className='Signup_line'><h2>닉네임</h2><input type='textbox' name='userNickname' onChange={changeData} onBlur={checkData}/></div>
                <h8 name='userNicknameError' style={{color : dataCheck.userNickname[0]?'green':'red', display:dataCheck.userNickname[1]?'block':'none'}}>
                    {dataCheck.userNickname[0]?'정상적으로 입력되었습니다.':'닉네임이 정확하지 않습니다.'}
                </h8>
               
                {/* 이름 입력 라인 */}
                <div className='Signup_line'><h2>이름</h2><input type='textbox' name='userName' onChange={changeData} onBlur={checkData}/></div>
                <h8 name='userNameError' style={{color : dataCheck.userName[0]?'green':'red', display:dataCheck.userName[1]?'block':'none'}}>
                    {dataCheck.userName[0]?'정상적으로 입력되었습니다.':'이름이 정확하지 않습니다.'}
                </h8>
                
                {/* 생년월일 입력 라인 */}
                <div className='Signup_line'><h2>생년월일</h2><input type='textbox' maxLength="8" placeholder='ex) 19920110' name='userBirthday' onChange={changeData} onBlur={checkData}/></div>
                <h8 name='userBirthdayError' style={{color : dataCheck.userBirthday[0]?'green':'red', display:dataCheck.userBirthday[1]?'block':'none'}}>
                    {dataCheck.userBirthday[0]?'정상적으로 입력되었습니다.':'생년월일 정보가 정확하지 않습니다.'}
                </h8>

                {/* 연락처 입력 라인 */}
                <div className='Signup_line'><h2>연락처</h2><input type='textbox' placeholder='핸드폰번호를 숫자로만 입력하세요!' name='userPhone' onChange={changeData} onBlur={checkData}/></div>
                <h8 name='userPhoneError' style={{color : dataCheck.userPhone[0]?'green':'red', display:dataCheck.userPhone[1]?'block':'none'}}>
                    {dataCheck.userPhone[0]?'정상적으로 입력되었습니다.':'연락처 정보가 정확하지 않습니다.'}   
                </h8>

                {/* 성별 선택 라인 */}
                <div className='Gender_radio'>
                    <input id='gender1' name='userGender' type='radio' value='true' onChange={changeData}/>
                    <label for='gender1'>남자</label>
                    <input id='gender2' name='userGender' type='radio' value='false' onChange={changeData}/>    
                    <label for='gender2'>여자</label>
                    <input id='gender3' name='userGender' type='radio' value='null' onChange={changeData}/>    
                    <label for='gender3'>선택안함</label>
                </div>

                {/* 서브밋 버튼 라인 */}
                <div className='Button_line'>
                    <button className='btn_submit_signup' id='btnSignUp' disabled={disableBtn} onClick={signUpPost}>다음</button>
                </div>
                </div>
            </section>
            <DefaultFooter/>
        </main>
    );
};
export default SignupPage;