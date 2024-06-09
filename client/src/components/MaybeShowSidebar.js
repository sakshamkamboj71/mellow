import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MaybeShowSidebar = ({ children, type }) => {
  const location = useLocation();

  const [showsidebar, setShowshowsidebar] = useState(true);

  useEffect(() => {
    if (
      location.pathname.startsWith("/login") ||
      location.pathname.startsWith("/register") ||
      type !== "user"
    ) {
      setShowshowsidebar(false);
    } else {
      setShowshowsidebar(true);
    }
  }, [location, type]);
  return <div>{showsidebar && children}</div>;
};

export default MaybeShowSidebar;
