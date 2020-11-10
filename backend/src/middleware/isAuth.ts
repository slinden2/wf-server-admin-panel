import { AuthenticationError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";
import config from "../config";
import { DecodeResult } from "../types/DecodeResult";
import { ExpirationStatus } from "../types/ExpirationStatus";
import { Context } from "../types/Context";
import { Session } from "../types/Session";
import { checkExpirationStatus } from "../utils/checkExpirationStatus";
import { decodeSession } from "../utils/decodeSession";
import { encodeSession } from "../utils/encodeSession";

export const isAuth = (role: "ADMIN" | "USER"): MiddlewareFn<Context> => {
  return async (resolverData, next) => {
    const { req, res } = resolverData.context;

    const requestHeader = "X-JWT-Token";
    const responseHeader = "X-Renewed-JWT-Token";
    const header = req.header(requestHeader);

    if (!header) {
      throw new AuthenticationError(
        `Required ${requestHeader} header not found.`
      );
    }

    const decodedSession: DecodeResult = decodeSession(
      config.auth.jwtSecret,
      header
    );

    if (
      decodedSession.type === "integrity-error" ||
      decodedSession.type === "invalid-token"
    ) {
      throw new AuthenticationError(
        `Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`
      );
    }

    const expiration: ExpirationStatus = checkExpirationStatus(
      decodedSession.session
    );

    if (expiration === "expired") {
      throw new AuthenticationError(
        `Authorization token has expired. Please create a new authorization token.`
      );
    }

    if (role === "ADMIN" && decodedSession.session.role !== "ADMIN") {
      throw new AuthenticationError(
        `You are not authorized to access this function.`
      );
    }

    let session: Session;

    if (expiration === "grace") {
      // Automatically renew the session and send it back with the response
      const { token, expires, issued } = encodeSession(
        config.auth.jwtSecret,
        decodedSession.session
      );
      console.log(token);
      session = {
        ...decodedSession.session,
        expires: expires,
        issued: issued,
      };

      res.setHeader(responseHeader, token);
    } else {
      session = decodedSession.session;
    }

    resolverData.context = {
      ...resolverData.context,
      session: session,
    };

    return next();
  };
};
