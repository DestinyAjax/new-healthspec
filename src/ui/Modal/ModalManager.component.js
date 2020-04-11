import React from 'react';
import { connect } from 'react-redux';

import { TakePicture } from './TakePicture';
import TakePictureModal from './TakePicture';

import { ClaimQuestion } from './index';
import ClaimQuestionModal from './ClaimQuestion';


import { EncounterService } from './index';
import EncounterServiceModal from './EncounterService';


import { TransactionSearch } from './index';
import TransactionSearchModal from './TransactionSearch';


const MODAL_COMPONENTS = {
    TakePicture: TakePictureModal,
    ClaimQuestion: ClaimQuestionModal,
    EncounterService: EncounterServiceModal,
    TransactionSearch: TransactionSearchModal,
}

const mapStateToProps = state => {
    return {
        currentModal: state.modalReducer
    }
}

const ModalManager = ({ currentModal }) => {
    let renderedModal = null;

    if (currentModal.modalType) {
        const { modalType, modalProps } = currentModal;
        const ModalComponent = MODAL_COMPONENTS[modalType];

        renderedModal = <ModalComponent {...modalProps} />
    }

    return renderedModal;
}


export default connect(mapStateToProps)(ModalManager);