import { encode, TAlgorithm } from "jwt-simple";
import { Session } from "../types/Session";
import { PartialSession } from "../types/PartialSession";
import { EncodeResult } from "../types/EncodeResult";
import config from "../config";

export const encodeSession = (
  secretKey: string,
  partialSession: PartialSession
): EncodeResult => {
  const algorithm: TAlgorithm = "HS512";
  const issued = Date.now();
  const expires = issued + config.token.expirationTime;
  const session: Session = {
    ...partialSession,
    issued: issued,
    expires: expires,
  };

  return {
    token: encode(session, secretKey, algorithm),
    issued: issued,
    expires: expires,
  };
};
