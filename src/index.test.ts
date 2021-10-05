import jwt from "jsonwebtoken";
import { generateKeyPairSync } from "crypto";
import GPay from "./index";
import { TEST_IAT } from "../fixtures/config";

const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 3072 });
const priKey = privateKey.export({ type: "pkcs1", format: "pem" });
const pubKey = publicKey.export({ type: "spki", format: "pem" });

const gpay = GPay(priKey);

describe("Main Helper Functions", () => {
  it("should contain all exported functions", () => {
    expect(gpay).toMatchObject({
      genPatientDetails: expect.any(Function),
      genTestingRecord: expect.any(Function),
      genVaccinationRecord: expect.any(Function),
      genGPayCovidCard: expect.any(Function),
      signPayload: expect.any(Function),
      generateFullUrl: expect.any(Function),
      getUrlPrefix: expect.any(Function),
    });
  });

  it("should be able to decode and verify a signed payload", () => {
    const payload = { foo: "bar", iat: TEST_IAT };
    const signedPayload = gpay.signPayload(payload);
    const decodedPayload = jwt.decode(signedPayload);

    expect(decodedPayload).toEqual(payload);
    expect(() => jwt.verify(signedPayload, pubKey)).not.toThrowError();
  });

  it("should be able to generate full url", () => {
    const payload = "some_payload";

    expect(gpay.generateFullUrl(payload)).toEqual(`https://pay.google.com/gp/v/save/${payload}`);
  });

  it("should return correct url prefix", () => {
    expect(gpay.getUrlPrefix()).toEqual(`https://pay.google.com/gp/v/save/`);
  });
});
