import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const FormModal = (props) => {
    const {
        buttonLabel,
        className,
        formType
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    let form;
    if (formType == "addItem") {
        form = <AddItemForm toggle={toggle} />;
    }

    return (
        <div>
            <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{buttonLabel}</ModalHeader>
                <ModalBody>
                    {form}
                </ModalBody>

            </Modal>
        </div>
    );
};

export default FormModal;