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

  const Button = ({ label, onClick }) => {
    return <button onClick={onClick}>{label}</button>
  }

  return ReactDOM.createPortal(
    <div className={`madal`}>
      <div className={'modalContainer'}>
        <div className={'modalContent'}>
          {props.modalDetial.description}
        </div>

        <div className={'modalBtnGroup'}>
          {props.modalDetial.onOk && <Button label={'Ok'} onClick={props.modalDetial.onOk} />}
          {props.modalDetial.onCancle && <Button label={'Cancle'} onClick={props.modalDetial.onCancle} />}
        </div>

      </div>
    </div>
    , document.querySelector("#scrollableTab-modal-root"));
}
