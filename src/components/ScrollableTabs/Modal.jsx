import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

export default function Modal(props) {
  React.useEffect(() => {
    // adding blur filter on root div on modal open
    document.querySelector('#root').style.filter = 'blur(2px)';
    return () => {
      // removing blur filter on root div on modal open
      document.querySelector('#root').style.filter = 'none';
    }
  });

  const Button = ({ className, label, onClick }) => {
    return <button className={className} onClick={onClick}>{label}</button>
  }


  return ReactDOM.createPortal(
    <div className={`madal`}>
      <div className={'modalContainer'}>
        <div className={'modalContent'}>
          {props.modalDetial.description}
        </div>

        <div className={'modalBtnGroup'}>
          {props.modalDetial.onOk && <Button label={'Ok'} onClick={props.modalDetial.onOk} className={'primaryBtn'} />}
          {props.modalDetial.onCancle && <Button label={'Cancle'} onClick={props.modalDetial.onCancle} className={'secondaryBtn'} />}
        </div>

      </div>
    </div>
    , document.querySelector("#scrollableTab-modal-root"));
}
