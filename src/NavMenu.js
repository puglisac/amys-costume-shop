import React, { useState } from 'react';
import {
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

const NavMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

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
                            Options
              </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                Option 1
                </DropdownItem>
                            <DropdownItem>
                                Option 2
                </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Reset
                </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </div>
    );
};

export default NavMenu;