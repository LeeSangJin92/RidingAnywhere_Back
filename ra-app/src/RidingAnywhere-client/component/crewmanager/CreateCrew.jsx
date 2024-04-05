import React from 'react';

const CreateCrew = (props) => {
    return (
        <div style={{display:"none"}}>
            <div className='LayoutBlock'/>
            <div className='CreateCrew'>
                <h1>크루 생성</h1>
                <div className='CreateInputLine'>
                    <h2>크루 명</h2>
                    <div className='TextLine'>
                        <input type='text' maxLength={10}/>
                    </div>
                </div>
                <div className='CreateInputLine'>
                    <h2>활동 지역</h2>
                    <div className='SelectLine'>
                        <select><option value={""}>도시</option></select>
                        <select name="" id=""><option value={""}>마을</option></select>
                    </div>
                </div>
                <div className='CreateInputLine'>
                    <div>
                        <h2>인사말</h2>
                        <h4>(✏️ 100 / 100 )</h4>
                    </div>
                    <textarea className='CrewContext_input' rows={4} cols={30} maxLength={100}/>
                </div>
                <div className='CreateCrewBtn_Line'>
                    <label className='Ok' htmlFor='Create_Ok'></label>
                    <input id='Create_Ok' type='button' style={{display:"none"}}/>
                    <label className='Cancel' htmlFor='Create_Non'></label>
                    <input id='Create_Non' type='button' style={{display:"none"}}/>
                </div>
            </div>
        </div>
    );
};

export default CreateCrew;