import React from 'react';
import Modal from "../../common/modal/Modal";
import ModalTheme from '../ledger/ModalTheme';
import MobileActionSheet from '../../common/modal/MobileActionSheet';
import FormButton from '../../common/FormButton';
import { Translate } from 'react-localize-redux';
import TwoFactorVerifyInput from './TwoFactorVerifyInput';

const TwoFactorVerifyModal = ({ open, onClose }) => {
    return (
        <Modal
            id='two-factor-verify-modal'
            isOpen={open}
            onClose={onClose}
            closeButton='desktop'
        >
            <ModalTheme/>
            <MobileActionSheet/>
            <h2><Translate id='twoFactor.verify.title'/></h2>
            <p className='font-bw'><Translate id='twoFactor.verify.desc'/></p>
            <p className='color-black font-bw' style={{ marginTop: '-10px', fontWeight: '500' }}>email@email.com</p>
            <TwoFactorVerifyInput/>
            <FormButton>
                <Translate id='button.continueSetup'/>
            </FormButton>
            <button className='link color-red' id='close-button'><Translate id='button.cancel'/></button>
        </Modal>
    );
}

export default TwoFactorVerifyModal;