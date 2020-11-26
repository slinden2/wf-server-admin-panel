import axios from "axios";

import config from "../../config";
import { WFServerData } from "../../types/WFServerData";
import { WFServerDataRaw } from "../../types/WFServerDataRaw";
import { dnsLookup } from "../../utils/dnsLookup";

export const getLabbeServers = async () => {
  // Get all servers from Steam API
  const res = await axios.get(config.steam.serverEndpointUri);
  const wfServers = res.data.response.servers as WFServerDataRaw[];

  // Get the current ip address of LaBBes domain
  const ipAddress = await dnsLookup(config.servers.domain);

  const labbeServers: WFServerData[] = wfServers
    // Filter LaBBe's servers by ip.
    .filter((srv) => srv.addr.includes(ipAddress))
    // Format the data as we need it
    .map((srv) => ({
      gamePort: srv.gameport,
      players: srv.players,
      maxPlayers: srv.max_players,
    }));

  return labbeServers;
};
