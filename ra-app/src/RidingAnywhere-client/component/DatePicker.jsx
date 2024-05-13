import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import '../css/DatePicker.css';
import ko from 'date-fns/locale/ko'; // 또는 원하는 언어 설정
import '/node_modules/react-datepicker/dist/react-datepicker.module.css';

const DatePicker = (props) => {
    registerLocale('ko', ko); // 사용할 로케일 등록
    setDefaultLocale('ko'); // 기본 로케일 설정

    const changedDate = (data) => {
        if(props.isStartDate){
            props.setBoardData(props.dateEqual?
                {...props.boardData,startDate:data,endDate:data}:
                {...props.boardData,startDate:data});
        }
        !props.isStartDate&&props.setBoardData({...props.boardData,endDate:data});
    }

    return (
        <div>
            <ReactDatePicker
                id='DatePicker'
                placeholderText={props.placeholderText}
                className='DatePicker'
                selected={props.isStartDate?props.boardData.startDate:props.boardData.endDate}
                onChange={changedDate}
                dateFormat="yyyy .MM .dd (EEEE)"
                value={props.isStartDate?props.boardData.startDate:props.dateEqual?props.boardData.startDate:props.boardData.endDate}
                disabled={props.dateEqual&&!props.isStartDate}
            />
        </div>
    );
};

export default DatePicker;