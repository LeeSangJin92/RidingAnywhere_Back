import React from 'react';


// 바이크 추가에서 브랜드 라디오 버튼의 컴포넌트
function AddbikeBrandBtn({btnName,value, onChange, label}) {
    return (
            <>
                <input
                    id={value}
                    className='btn'
                    type='radio'
                    name={btnName}
                    value={value}
                    onChange={onChange}/>

                <label for={value} className='brandBtn'>
                    {label}
                </label>
            </>
    );
}

export default AddbikeBrandBtn;