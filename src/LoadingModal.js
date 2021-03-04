import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const LoadingModal = ({ modal }) => {

    return (
        <div>
            <Modal isOpen={modal} >
                <ModalBody className="row justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};
export default LoadingModal;