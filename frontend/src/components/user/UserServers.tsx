import React from "react";
import {
  GetUsersDocument,
  Server,
  User,
  useSetUserServersMutation,
} from "../../generated/apolloComponents";
import { buttonStyles } from "../../styles/buttonStyles";

interface Props {
  servers: ({
    __typename?: "Server" | undefined;
  } & Server)[];
  user: {
    __typename?: "User" | undefined;
  } & User & {
      servers: ({
        __typename?: "Server" | undefined;
      } & Server)[];
    };
}

const UserServers: React.FC<Props> = ({ servers, user }) => {
  const [setUserServers] = useSetUserServersMutation({
    refetchQueries: [{ query: GetUsersDocument }],
  });
  const checkboxRef = React.useRef(
    servers.map(() => React.createRef<HTMLInputElement>())
  );

  const handleSaveServers = async () => {
    const accessedServers: Server[] = [];

    checkboxRef.current.forEach((ref, i) => {
      if (ref.current?.checked) {
        accessedServers.push(servers[i]);
      }
    });

    const serverIds = accessedServers.map((srv) => srv.id);

    await setUserServers({ variables: { userId: user.id, serverIds } });
  };

  const serverData = servers.map((srv, index) => {
    const curRef = checkboxRef.current && checkboxRef.current[index];
    const isChecked = !!user.servers.find((usrv) => usrv.id === srv.id);

    return (
      <div key={srv.id} className="flex mr-4 my-2 items-center">
        <label className="mr-2">{srv.name}</label>
        <input
          ref={curRef}
          type="checkbox"
          defaultChecked={isChecked}
          disabled={user.role === "ADMIN"}
        />
      </div>
    );
  });

  return (
    <div>
      <div className="flex">{serverData}</div>
      {user.role !== "ADMIN" && (
        <button
          className={`${buttonStyles} block my-4`}
          onClick={() => handleSaveServers()}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default UserServers;
