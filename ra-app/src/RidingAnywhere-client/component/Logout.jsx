import React from 'react';
import "../css/logout.css"

function Logout(){

    // 로그아웃 진행 ✅
    function logoutOk(){
        alert("로그아웃을 진행합니다.")
    }

    // 로그아웃 취소 ❌
    function logoutCancel(){
        alert("로그아웃 취소!")
    }
    return (
        <>
            {/* 로그아웃 박스 */}
            <div className='logoutBox'>
                    <h1>⚠️ 로그아웃 ⚠️</h1>
                    <h2>- 정말 로그아웃 하시겠습니까? -</h2>
                    <div className='logoutBtnLine'>
                        <input type='button' value={"🤗 Ok"} onClick={logoutOk}></input>
                        <input type='button' value={"😎 No"} onClick={logoutCancel}></input>
                    </div>
            </div>
            
        </>
    );

    
};

export default Logout;