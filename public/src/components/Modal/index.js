import React from 'react'
import './Modal.css'

export const ModalWindow = ({ showModal, addNewList, name, children }) => (
  <div className="ModalStyle">
    <div className="CloseButton" onClick={showModal}>
      <i className="fa fa-times" aria-hidden="true" />
    </div>
    <div className="form-group">{children}</div>
    <button className="btn btn-block btn-success" onClick={addNewList}>
      {name}
    </button>
  </div>
)
export const NormalModal = ({ children }) => (
  <div className="NormalModal">
      {children}
  </div>
)

const ModalComp = ({ showModal, addNewList, name, children }) => <div className="Modal">
  <ModalWindow showModal={showModal}
  addNewList={addNewList}
  name={name}
  children={children}/>
</div>

export default ModalComp
