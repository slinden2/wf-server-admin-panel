import { decode, TAlgorithm } from "jwt-simple";
import { DecodeResult } from "../types/DecodeResult";
import { Session } from "../types/Session";

export function decodeSession(
  secretKey: string,
  sessionToken: string
): DecodeResult {
  const algorithm: TAlgorithm = "HS512";

  let result: Session;

  try {
    result = decode(sessionToken, secretKey, false, algorithm);
  } catch (_e) {
    const e: Error = _e;

    if (
      e.message === "No token supplied" ||
      e.message === "Not enough or too many segments"
    ) {
      return {
        type: "invalid-token",
      };
    }

    if (
      e.message === "Signature verification failed" ||
      e.message === "Algorithm not supported"
    ) {
      return {
        type: "integrity-error",
      };
    }

    if (e.message.indexOf("Unexpected token") === 0) {
      return {
        type: "invalid-token",
      };
    }

    throw e;
  }

  return {
    type: "valid",
    session: result,
  };
}
