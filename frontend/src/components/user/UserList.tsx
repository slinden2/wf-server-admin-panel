import React from "react";
import {
  useGetUsersQuery,
  useGetServersQuery,
} from "../../generated/apolloComponents";
import { UserRow } from "../../types/UserRow";
import UserServers from "./UserServers";

const UserList: React.FC = () => {
  const users = useGetUsersQuery();
  const servers = useGetServersQuery();

  const userData = users.data?.getUsers;
  const serverData = servers.data?.getServers;

  if (users.loading || servers.loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  if (!serverData) {
    return <div>No server data available</div>;
  }

  const userList: UserRow[] = userData.map((user) => {
    return {
      id: user.id,
      username: user.username,
      role: user.role as "USER" | "ADMIN",
      servers: <UserServers user={user} servers={serverData} />,
    };
  });

  return (
    <div>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>
            <div>
              <span>{user.username}</span>
              <span>{user.role}</span>
            </div>
            <div>{user.servers}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
