import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        contentLabel="Selected Option"
        onRequestClose={props.handleClearSelectedOption} // this needs to be set in order for escape/clicking on background to close the modal
        closeTimeoutMS={200}
        className="modal"
        appElement={document.getElementById('app')}
    >
        <h3 className="modal__title">Selected Option</h3>
        {(props.selectedOption && <p className="modal__body">{props.selectedOption}</p>)}
        <button className="button" onClick={props.handleClearSelectedOption}>Okay</button>
    </Modal>
);

export default OptionModal;