import { useEffect, useState } from 'react'
import './Header.css';
import HeaderNavButton from './NavButton';
import HeaderButton from './HeaderButton';
import Logo from '../../images/logo.png';
import ProfileVector from '../../images/user.png';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const [activePage, setActivePage] = useState(null);
    var location = useLocation();
    var navigate = useNavigate();
    useEffect(function () {
        setActivePage(getPageId(location.pathname));
    });
    function navItemClick(id) {
        navigate(id);
    }
    function onSignUpButtonClick() {
        navigate("/signup"); // This will navigate to the SignUp page when the button is clicked
    }
    function onLoginButtonClick() {
        navigate("/login");// This will navigate to the Login page when the button is clicked
    }

    function onSignOutClick() {
        navigate("/signout");
    }
    function onProfileButtonClick() {
        navigate("/profile");
    }
    return (
        <div className="header">
            <div className="header-top">
            <div className="logo">
                    <img src={Logo} />
                </div>
                <div className="header-right">
                    <>
                        <div className='div-btn' id="login" onClick={onLoginButtonClick}>
                            <button className='signin-button'>Login</button>
                        </div>
                        <div className='div-btn' id="signup" onClick={onSignUpButtonClick}>
                            <button className='signup-button'>Sign Up</button>
                        </div>
                    </>
                    <>
                        <div className='div-btn' id="signout" onClick={onSignOutClick}>
                            <button className='signout-button'>Sign Out</button>
                        </div>
                       
                        <div className="profile" onClick={onProfileButtonClick}>
                            <div className="profile-picture">
                                <img src={ProfileVector} />
                            </div>
                        </div>
                    </>
                </div>
            </div>
            <div className="header-nav">
                <HeaderNavButton id="" activeId={activePage} name="Home" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="about" activeId={activePage} name="About" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="appointments" activeId={activePage} name="Appointments" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="payment" activeId={activePage} name=" Payment" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="contact" activeId={activePage} name="Contact" onClick={(id) => { navItemClick(id) }} />
            </div>
        </div>
    );
}
function getPageId(path) {
    path = path.substring(1, path.length);
    const firstIndex = path.indexOf("/");
    if (firstIndex == -1) {
        return path;
    } else {
        return path.substring(0, firstIndex);
    }
}
export default Header;