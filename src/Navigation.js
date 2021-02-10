import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavMenu from './NavMenu';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';

const Navigation = (props) => {
  const { currUser } = useSelector(st => st.currUser);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="text-primary" href="/">Amy's Costume Shop</NavbarBrand>
        {currUser ? <NavMenu /> : null}
      </Navbar>
    </div>
  );
};

export default Navigation;