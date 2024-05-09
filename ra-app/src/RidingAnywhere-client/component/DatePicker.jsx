import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import '../css/DatePicker.css';
import ko from 'date-fns/locale/ko'; // 또는 원하는 언어 설정
import '/node_modules/react-datepicker/dist/react-datepicker.module.css';

const DatePicker = (props) => {
    registerLocale('ko', ko); // 사용할 로케일 등록
    setDefaultLocale('ko'); // 기본 로케일 설정

    const changedDate = (data) => {
        !!props.setStartDate&&props.setStartDate({...props.boardData,startDate:data});
        !!props.setEndDate&&props.setEndDate({...props.boardData,endDate:data});
    }

    return (
        <div>
            <ReactDatePicker
                placeholderText={props.placeholderText}
                className='DatePicker'
                selected={!props.setStartDate?props.boardData.endDate:props.boardData.startDate}
                onChange={changedDate}
                dateFormat="yyyy .MM .dd (EEEE)"
                value={!props.setStartDate?props.disable?"":props.boardData.endDate:props.boardData.startDate}
                disabled={props.disable}
            />
        </div>
    );
};

export default DatePicker;