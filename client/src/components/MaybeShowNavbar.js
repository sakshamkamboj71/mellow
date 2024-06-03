import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MaybeShowNavbar = ({ children, validity }) => {
  const location = useLocation();

  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (
      location.pathname.startsWith("/login") ||
      location.pathname.startsWith("/register") ||
      !validity
    ) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location, validity]);
  return <div>{showNavbar && children}</div>;
};

export default MaybeShowNavbar;
