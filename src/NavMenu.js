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
    // menu items displayed in the navigation header
    const dispatch = useDispatch();
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const logoutUser = () => {
        dispatch(logout());
        history.push("/");
    };

    return (
        <div className="nav-menu">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink className={window.location.pathname == "/items" ? "active" : null} href="/items">Items</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={window.location.pathname == "/categories" ? "active" : null} href="/categories">Categories</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            {userEmail}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <NavLink className={window.location.pathname == `/${userEmail}` ? "active" : null} href={`/${userEmail}`}>My Info</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink className={window.location.pathname == `/pull-list/${userEmail}` ? "active" : null} href={`/pull-list/${userEmail}`}>My Pull List</NavLink>
                            </DropdownItem>
                            {isAdmin ? <DropdownItem>
                                <NavLink className={window.location.pathname == `/users` ? "active" : null} href="/users">Manage Users</NavLink>
                            </DropdownItem> : null}
                            <DropdownItem divider />
                            <DropdownItem>
                                <NavLink className="btn btn-primary text-light" onClick={logoutUser}
                                    color="primary">Logout</NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </div>
    );
};

export default NavMenu;