import React from 'react';


// 바이크 추가에서 브랜드 라디오 버튼의 컴포넌트
function AddbikeBrandBtn({btnName, onChange, brand}) {
    return (
            <>
                <input
                    id={brand}
                    className='btn'
                    type='radio'
                    name={btnName}
                    value={brand}
                    onChange={onChange}/>
                <label htmlFor={brand} className='brandBtn'>
                    {brand}
                </label>
            </>
    );
}

export default AddbikeBrandBtn;