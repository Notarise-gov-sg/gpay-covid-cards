import { genTestingRecord } from "./pdt";
import { TestingRecord } from "../types";

const validTestingRecord: TestingRecord = {
  administrationDateTime: "27 September 2020, 2:15 pm SGT",
  contactInfo: "MacRitchie Hospital, Thomson Road, Singapore 123000",
  provider: "MacRitchie Medical Clinic",
  reportDateTime: "28 September 2020, 2:15 pm SGT",
  testCode: "94531-1",
  testDescription: "SARS-CoV-2 (COVID-19) RNA panel - Respiratory specimen by NAA with probe detection",
  testResultCode: "260385009",
  testResultDescription: "Negative",
  specimen: "Nasopharyngeal swab",
};

describe("genTestingRecord()", () => {
  it("should produce valid TestingRecord for Negative record", () => {
    const valid: TestingRecord = {
      ...validTestingRecord,
      testResultCode: "260385009", // The correct Negative code
      testResultDescription: "Negative", // The correct Negative string
    };

    expect(() => genTestingRecord(valid)).not.toThrowError();
    expect(genTestingRecord(valid)).toStrictEqual(valid);
  });

  it("should produce valid TestingRecord for Negative record (regardless of upper/lower case)", () => {
    const valid: TestingRecord = {
      ...validTestingRecord,
      testResultCode: "260385009", // The correct Negative code
      testResultDescription: "nEgAtIve" as any, // An acceptable Negative string
    };

    expect(() => genTestingRecord(valid)).not.toThrowError();
    expect(genTestingRecord(valid)).toStrictEqual(valid);
  });

  it("should produce valid TestingRecord for Positive record", () => {
    const valid: TestingRecord = {
      ...validTestingRecord,
      testResultCode: "10828004", // The correct Positive code
      testResultDescription: "Positive", // The correct Positive string
    };

    expect(() => genTestingRecord(valid)).not.toThrowError();
    expect(genTestingRecord(valid)).toStrictEqual(valid);
  });

  it("should produce valid TestingRecord for Positive record  (regardless of upper/lower case)", () => {
    const valid: TestingRecord = {
      ...validTestingRecord,
      testResultCode: "10828004", // The correct Positive code
      testResultDescription: "pOsItIvE" as any, // An acceptable Positive string
    };

    expect(() => genTestingRecord(valid)).not.toThrowError();
    expect(genTestingRecord(valid)).toStrictEqual(valid);
  });

  it("should throw error there is an invalid testResultCode", () => {
    const invalid: TestingRecord = {
      ...validTestingRecord,
      testResultCode: "123456" as any, // Invalid test code
      testResultDescription: "Positive",
    };

    expect(() => genTestingRecord(invalid)).toThrowError(
      `Invalid testResultCode (123456) received. Should be one of these values: ["10828004","260385009"]`
    );
  });

  it("should throw error there is a mismatched between testResultCode and testResultDescription (Negative)", () => {
    const invalid: TestingRecord = {
      ...validTestingRecord,
      testResultCode: "260385009", // The correct Negative code
      testResultDescription: "Positive", // An incorrect string
    };

    expect(() => genTestingRecord(invalid)).toThrowError(
      `Mismatched testResultCode & testResultDescription. Expected: 260385009 - Negative. Received 260385009 - Positive.`
    );
  });

  it("should throw error there is a mismatched between testResultCode and testResultDescription (Positive)", () => {
    const invalid: TestingRecord = {
      ...validTestingRecord,
      testResultCode: "10828004", // The correct Positive code
      testResultDescription: "Negative", // An incorrect string
    };

    expect(() => genTestingRecord(invalid)).toThrowError(
      `Mismatched testResultCode & testResultDescription. Expected: 10828004 - Positive. Received 10828004 - Negative.`
    );
  });
});
