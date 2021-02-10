import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './actions/users';
import { useHistory } from 'react-router-dom';
import {
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
} from 'reactstrap';

const NavMenu = ({ userEmail, isAdmin }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const logoutUser = () => {
        dispatch(logout());
        history.push("/");
    };

    return (
        <div>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="#">Items</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Categories</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            {userEmail}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <NavLink href="#">My Info</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink href="#">My Pull List</NavLink>
                            </DropdownItem>
                            {isAdmin ? <DropdownItem>
                                <NavLink href="#">Manage Users</NavLink>
                            </DropdownItem> : null}
                            <DropdownItem divider />
                            <DropdownItem>
                                <Button onClick={logoutUser}
                                    color="primary">Logout</Button>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </div>
    );
};

export default NavMenu;