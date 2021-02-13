import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddCategoryForm from './AddCategoryForm';

const FormModal = (props) => {
    const {
        buttonLabel,
        className,
        formType
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    let form;
    if (formType == "item") {
        form = <AddItemForm item={props.item} toggle={toggle} />;
    } if (formType == "categories") {
        form = <AddCategoryForm toggle={toggle} />;
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