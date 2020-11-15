import React from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Auth = () => {
  const { loginUser } = useAuthContext();

  const queryParams = new URLSearchParams(useLocation().search);
  const code = queryParams.get("code");

  React.useEffect(() => {
    const callLogin = async () => {
      await loginUser(code);
      window.location.href = "/";
    };

    callLogin();
  }, []);

  return <div>Authenticating...</div>;
};

export default Auth;
