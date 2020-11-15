import React from "react";
import { useLocation } from "react-router-dom";

import { useLoginMutation } from "../../generated/apolloComponents";

const Auth = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const code = queryParams.get("code");

  const [login] = useLoginMutation({
    variables: { code: code || "" },
  });

  React.useEffect(() => {
    const callLogin = async () => {
      const res = await login();
      if (res.data?.login?.token) {
        localStorage.setItem("token", res.data.login.token);
      }
      window.location.href = "/";
    };

    callLogin();
  }, [login]);

  return <div>Authenticating...</div>;
};

export default Auth;
