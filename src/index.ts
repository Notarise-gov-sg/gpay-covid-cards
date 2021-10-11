import jwt, { Secret } from "jsonwebtoken";
import { genPatientDetails } from "./models/patient";
import { genTestingRecord } from "./models/pdt";
import { genVaccinationRecord } from "./models/vac";
import { genGPayCovidCard } from "./models/gpay-covid-card";

const GPAY_URL_PREFIX = `https://pay.google.com/gp/v/save/`;

export default (secret: Secret) => {
  return {
    genPatientDetails,
    genTestingRecord,
    genVaccinationRecord,
    genGPayCovidCard,

    /**
     * Returns a signed payload using the provided secret.
     * @param payload
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    signPayload: (payload: string | object | Buffer) => jwt.sign(payload, secret, { algorithm: "RS256" }),

    /**
     * Returns the full URL with the provided signedPayload.
     * @param signedPayload
     * @returns
     */
    generateFullUrl: (signedPayload: string) => GPAY_URL_PREFIX + signedPayload,

    getUrlPrefix: () => GPAY_URL_PREFIX,
  };
};

export * from "./types";
