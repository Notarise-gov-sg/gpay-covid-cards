import { TestingRecord } from "../types";

/**
 * Helper function to generate a Testing record and ensures that testResultCode has correct corresponding testResultDescription.
 * @param testingRecord
 * @returns
 */
export const genTestingRecord = ({
  administrationDateTime,
  contactInfo,
  provider,
  reportDateTime,
  testCode,
  testDescription,
  testResultCode,
  testResultDescription,
  specimen,
}: TestingRecord): TestingRecord => {
  const testResultDict: Record<string, string> = {
    "260385009": "Negative",
    "10828004": "Positive",
  };

  if (testResultDict[testResultCode] !== testResultDescription) {
    throw new Error(
      `testResultCode (${testResultCode}) has an incorrect testResultDescription - ${testResultCode} should equal ${testResultDict[testResultCode]}`
    );
  }

  return {
    administrationDateTime,
    contactInfo,
    provider,
    reportDateTime,
    testCode,
    testDescription,
    testResultCode,
    testResultDescription,
    specimen,
  };
};
