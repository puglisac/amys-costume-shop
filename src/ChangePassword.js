import React, { useState, memo } from 'react';
import AddItemForm from './AddItemForm';
import { Link, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddCategoryForm from './AddCategoryForm';
import UserForm from './UserForm';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePassword = memo(({ user }) => {
    // a modal that displays a form

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <a href="#" onClick={toggle}>Change Password</a>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Change Password</ModalHeader>
                <ModalBody>
                    <ChangePasswordForm user={user} toggle={toggle} />
                </ModalBody>

            </Modal>
        </div>
    );
});

export default ChangePassword;