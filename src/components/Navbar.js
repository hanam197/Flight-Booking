// Trong component NavBar:
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => {
    setClick(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Xử lý đăng xuất, xóa token từ localStorage và đặt trạng thái đăng nhập về false
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            ABAY <i className="fab fa-typo3"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                Liên hệ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search-booking"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Chuyến bay của tôi
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                {/* Nếu đã đăng nhập, hiển thị nút profile và đăng xuất */}
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={handleLogout}>
                    Đăng Xuất
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Nếu chưa đăng nhập, hiển thị nút đăng nhập và đăng ký */}
                <li className="nav-item">
                  <Link
                    to="/sign-in"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Đăng Nhập
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/sign-up"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Đăng Ký
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
