import React from 'react';
import { ReactComponent as Logo } from "../../assets/crown.svg"
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors.js";
import { SignOutStart } from "../../redux/user/user.actions";

import { HeaderConteiner, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from "./header.styles.jsx";

const Header = ({ currentUser, hidden, SignOutStart }) => (
    <HeaderConteiner>
        <LogoContainer to="/" >
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/shop">
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionDiv onClick={SignOutStart}>SIGN OUT</OptionDiv>
                :
                <OptionLink to="/signin">SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        { hidden ? null : <CartDropdown /> }
    </HeaderConteiner>
);


// createStructuredSelector pass state as parameter automatically.
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    SignOutStart: () => dispatch(SignOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);