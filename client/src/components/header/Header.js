import { useEffect, useState } from "react";
import "./Header.css";
import HeaderNavButton from "./NavButton";
import Logo from "../../images/logo.png";
import ProfileVector from "../../images/user.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { USER_ROLES } from "../../constants/roles";

function Header() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  //
  const [activePage, setActivePage] = useState(
    getPageId(useLocation().pathname)
  ); // Initialize with the correct active page
  const location = useLocation();
  const navigate = useNavigate();

  // Update active page when location changes
  useEffect(() => {
    setActivePage(getPageId(location.pathname));
  }, [location.pathname]);

  const handleNavigation = (path) => navigate(path);

  const navigationButtons = [
    { id: "", name: "Home" },
    { id: "about", name: "About" },
    { id: "appointments", name: "Appointments" },
    { id: "payment", name: "Payment" },
    { id: "contact", name: "Contact" },
    { id: "patientList", name: "Patient List" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header-top">
        <div className="logo" onClick={() => handleNavigation("/")}>
          <img src={Logo} alt="Logo" />
        </div>
        <div
          className="header-right"
          style={{
            marginTop: "30px",
          }}
        >
          {!isAuthenticated && (
            <>
              <div
                className="div-btn"
                onClick={() => handleNavigation("/login")}
              >
                <button className="signin-button">Login</button>
              </div>
              <div
                className="div-btn"
                onClick={() => handleNavigation("/signup")}
              >
                <button className="signup-button">Sign Up</button>
              </div>
            </>
          )}

          {isAuthenticated && (
            <>
              <div className="div-btn" onClick={handleLogout}>
                <button className="signout-button">Sign Out</button>
              </div>
              <div
                className="profile"
                onClick={() => handleNavigation("/profile")}
              >
                <div className="profile-picture">
                  <img src={ProfileVector} alt="Profile" />
                </div>
                {/* role */}
                <div>{user?.role}</div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="header-nav">
        {navigationButtons.map((button) =>
          user?.role === USER_ROLES.PATIENT &&
          button.id === "patientList" ? null : !isAuthenticated &&
            button.id === "patientList" ? null : (
            <HeaderNavButton
              key={button.id}
              id={button.id}
              activeId={activePage}
              name={button.name}
              onClick={handleNavigation}
            />
          )
        )}
      </div>
    </div>
  );
}

function getPageId(path) {
  return path.split("/")[1] || ""; // Simplified path extraction logic
}

export default Header;
