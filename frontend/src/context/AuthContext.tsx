import { QueryResult, useApolloClient } from "@apollo/client";
import React, { createContext, useContext } from "react";
import {
  MeQuery,
  MeQueryVariables,
  useLoginMutation,
  useMeQuery,
} from "../generated/apolloComponents";

export type AuthContextProps = {
  token: string | null;
  user: QueryResult<MeQuery, MeQueryVariables>;
  loginUser: (code: string | null) => Promise<void>;
  logoutUser: () => void;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextProps>(undefined!);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem("token")
  );
  const [isAdmin, setAdmin] = React.useState<boolean>(false);
  const user = useMeQuery({
    errorPolicy: "all",
  });
  const [login] = useLoginMutation();
  const client = useApolloClient();

  React.useEffect(() => {
    if (user.data?.me) {
      if (user.data.me.role === "ADMIN" && !isAdmin) {
        setAdmin(true);
      }
      if (user.data.me.role === "USER" && isAdmin) {
        setAdmin(false);
      }
    }
  }, [user.data?.me, isAdmin]);

  const loginUser = async (code: string | null) => {
    if (code) {
      const loginResult = await login({ variables: { code } });
      const newToken = loginResult.data?.login?.token;
      if (newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
      }
      await user.refetch();
    } else {
      console.error("No auth code provided");
    }
  };

  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    client.resetStore();
    window.location.pathname = "/";
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, logoutUser, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
