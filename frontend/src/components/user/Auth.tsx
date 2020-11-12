import React from "react";
import { useLocation } from "react-router-dom";

import { useLoginMutation } from "../../generated/apolloComponents";

const Auth = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const code = queryParams.get("code");

  const [login, res] = useLoginMutation({ variables: { code: code || "" } });

  React.useEffect(() => {
    login().then(() => {
      // redirect to home
      window.location.href = "/";
    });
  }, [login]);

  return <div>Authenticating...</div>;
};

export default Auth;
