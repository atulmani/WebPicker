import React, { useState } from 'react'
// import Alert from './Alert';
export default function InputForm(props) {
    // const [alert, setAlert] = useState(null);

    const upperCaseClicked = () => {
        console.log("function upperCaseClicked clicked", myText);
        setText(myText.toUpperCase());
        props.showAlert("Converted to Uppercase", "success");
    }
    const onChangeclicked = (event) => {
        console.log("function onChangeclicked clicked");
        setText(event.target.value);
    }
    const [myText, setText] = useState("Enter Text Here");
    // setText("my new test");
    return (
        <div>
            <h1>{props.heading}</h1>
            <div className='mb-3'>
                <textarea className='form-control' onChange={onChangeclicked} value={myText} id="myText" rows="8"></textarea>
            </div>
            <button className='btn btn-primary' onClick={upperCaseClicked}>Convert to Uppercase </button>
        </div>
    )
}
