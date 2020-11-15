import config from "../config";
import { ExpirationStatus } from "../types/ExpirationStatus";
import { Session } from "../types/Session";

export function checkExpirationStatus(token: Session): ExpirationStatus {
  const now = Date.now();

  if (token.expires > now) return "active";

  // Find the timestamp for the end of the token's grace period
  const threeHoursAfterExpiration = token.expires + config.token.gracePeriod;

  if (threeHoursAfterExpiration > now) return "grace";

  return "expired";
}
