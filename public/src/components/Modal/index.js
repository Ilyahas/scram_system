import React from 'react'
import './Modal.css';

const ModalComp = ({
  showModal,
  addNewList,
  name,
  children,
}) => (
  <div className="Modal">
    <div className="ModalStyle">
      <div className="CloseButton" onClick={showModal}>
        <i className="fa fa-times" aria-hidden="true" />
      </div>
      <div className="form-group">
      {children}
      </div>
      <button className="btn btn-block btn-success" onClick={addNewList}>
        {name}
      </button>
    </div>
  </div>
);

export default ModalComp;
