import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

export default function Modal(props) {

  console.log(props);

  React.useEffect(() => {
    document.querySelector('#root').style.filter = 'blur(2px)';
    return () => {
      document.querySelector('#root').style.filter = 'none';
    }
  });

  return ReactDOM.createPortal(
    <div className={`madal`}>
      <div className={'modalContainer'}>
        <div className={'modalContent'}>
          {props.modalDetial.description}
        </div>
        <div className={'modalBtnGroup'}>
          <button onClick={props.onOk}>Ok</button>
          <button onClick={props.onCancle}>Cancle</button>
        </div>

      </div>
    </div>
    , document.querySelector("#scrollableTab-modal-root"))
}
