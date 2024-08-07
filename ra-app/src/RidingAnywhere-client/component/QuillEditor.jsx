import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({text,insertBoardContext}) => {

    let insertData = insertBoardContext;

    return (
                <ReactQuill
                className='WriteContext'
                value={text}
                onChange={insertData}
                theme="snow"
                modules={{
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['image', 'code-block']
                ]
                }}
                formats={[
                'header', 'font', 'list', 'bold', 'italic', 'underline', 'image', 'code-block'
                ]}
            />
    );
};

export default QuillEditor;