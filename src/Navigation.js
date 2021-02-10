import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavMenu from './NavMenu';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import { GET_CURR_USER } from './actions/actionTypes';

const Navigation = (props) => {

  const { currUser } = useSelector(st => st.currUser);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="text-primary" href="/">Amy's Costume Shop</NavbarBrand>
        {currUser ? <NavMenu userEmail={currUser.email} isAdmin={currUser.is_admin} /> : null}
      </Navbar>
    </div>
  );
};

export default Navigation;