import React, { useState, memo } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

const AreYouSure = memo((props) => {

    const {
        buttonLabel,
        className,
        onClick
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    return (
        <div>
            <Button color="danger" onClick={toggle} >{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Are you sure?</ModalHeader>
                <ModalBody>
                    <Button className="m-2" onClick={toggle}>Cancel</Button>
                    <Button className="m-2" onClick={onClick}>Delete</Button>
                </ModalBody>
            </Modal>
        </div>
    );
});
export default AreYouSure;