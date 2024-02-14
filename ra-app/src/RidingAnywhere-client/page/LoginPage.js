import React from 'react';
import '../css/loginpage.css';
import DefaultFooter from '../component/DefaultFooter';
import { Link } from 'react-router-dom';
import DefaultHeader from '../component/DefaultHeader_small';

const LoginPage = () => {
    return (
        <main>
            <section className='Section_login'>
            <DefaultHeader word={'로그인'}/>
                <div className='Login_Box'>
                    <div className='Login_InputLine'>
                        <div className='input_wrap'>
                            <div className='input_row'><h2>&nbsp;&nbsp;ID :&nbsp;</h2><input className='login_textline' id='id_line' type='textbox'/></div>
                            <div className='input_row'><h2>&nbsp;PW :&nbsp;</h2><input className='login_textline' id='pw_line' type='textbox'/></div>
                        </div>
                        <input className='Login_Button' type='button' value={'Login'}/>
                    </div>
                    <div className='OAuth_Line'>
                        <Link to={''}><img className='OAuth_log' src='/img/N_icon.png' alt=''/></Link>
                        <Link to={''}><img className='OAuth_log' src='/img/N_icon.png' alt=''/></Link>
                        <Link to={''}><img className='OAuth_log' src='/img/N_icon.png' alt=''/></Link>
                        <Link to={'/RA/SignUp'}><img className='OAuth_log' src='/img/RA_icon.png' alt=''/></Link>
                    </div>
                </div>
            </section>
                <DefaultFooter/>
        </main>
    );
};

export default LoginPage;