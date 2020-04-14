import React from 'react';
import { connect } from 'react-redux';
import TakePictureModal from './TakePicture';
import ClaimQuestionModal from './ClaimQuestion';
import EncounterServiceModal from './EncounterService';
import TransactionSearchModal from './TransactionSearch';

const mapStateToProps = state => {
    return {
        currentModal: state.modalReducer
    }
}

const ModalManager = ({ currentModal }) => {
    let renderedModal = null;
    

    if (currentModal.modalType) {
        const { modalType, modalProps, modalToggle } = currentModal;
        let ModalComponent = null;
        
        switch (modalType) {
            case 'TakePicture':
                ModalComponent = TakePictureModal;
                break;
            case 'ClaimQuestion':
                ModalComponent = ClaimQuestionModal;
                break;
            case 'EncounterService':
                ModalComponent = EncounterServiceModal;
                break;
            case 'TransactionSearch':
                ModalComponent = TransactionSearchModal;
                break;
            default:
                break;
        }

        renderedModal = <ModalComponent {...modalProps} />
    }

    return renderedModal;
}

export default connect(mapStateToProps)(ModalManager);