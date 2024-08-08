import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({value,onChange}) => {

    const clickBtn = () => {
        console.log("버튼 클릭");
    }

    return (
                <ReactQuill
                className='WriteContext'
                value={value}
                onChange={onChange}
                theme="snow"
                modules={{
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['code-block'],
                    ['clean']
                ]
            }}
                formats={[
                'header', 'font', 'list', 'bold', 'italic', 'underline', 'code-block', 'color', 'background'
                ]}
            />
    );
};

export default QuillEditor;