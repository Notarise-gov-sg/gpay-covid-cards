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
      testResultCode: "260385009", // Negative
      testResultDescription: "Negative", // Negative
    };

    expect(() => genTestingRecord(valid)).not.toThrowError();
    expect(genTestingRecord(valid)).toStrictEqual(valid);
  });

  it("should produce valid TestingRecord for Positive record", () => {
    const valid: TestingRecord = {
      ...validTestingRecord,
      testResultCode: "10828004", // Positive
      testResultDescription: "Positive", // Positive
    };

    expect(() => genTestingRecord(valid)).not.toThrowError();
    expect(genTestingRecord(valid)).toStrictEqual(valid);
  });

  it("should throw error there is a mismatched between testResultCode and testResultDescription (Negative)", () => {
    const invalid: TestingRecord = {
      ...validTestingRecord,
      testResultCode: "260385009", // Negative
      testResultDescription: "Positive", // Positive
    };

    expect(() => genTestingRecord(invalid)).toThrowError(
      `testResultCode (260385009) has an incorrect testResultDescription - 260385009 should equal Negative`
    );
  });

  it("should throw error there is a mismatched between testResultCode and testResultDescription (Positive)", () => {
    const invalid: TestingRecord = {
      ...validTestingRecord,
      testResultCode: "10828004", // Positive
      testResultDescription: "Negative", // Negative
    };

    expect(() => genTestingRecord(invalid)).toThrowError(
      `testResultCode (10828004) has an incorrect testResultDescription - 10828004 should equal Positive`
    );
  });
});
