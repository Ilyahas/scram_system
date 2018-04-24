import React from 'react'
import './Modal.css';

const ModalComp = ({
  showModal,
  labelName,
  handleInputChange,
  value,
  addNewList,
  name,
}) => (
  <div className="Modal">
    <div className="ModalStyle">
      <div className="CloseButton" onClick={showModal}>
        <i className="fa fa-times" aria-hidden="true" />
      </div>
      <div className="form-group">
        <label htmlFor="usr">{labelName}</label>
        <input
          type="text"
          className="form-control"
          id="usr"
          value={value}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-block btn-success" onClick={addNewList}>
        {name}
      </button>
    </div>
  </div>
);

export default ModalComp;
