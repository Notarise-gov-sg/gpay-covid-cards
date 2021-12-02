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

  if (!testResultDict[testResultCode]) {
    throw new Error(
      `Invalid testResultCode (${testResultCode}) received. Should be one of these values: ${JSON.stringify(
        Object.keys(testResultDict)
      )}`
    );
  }

  if (testResultDict[testResultCode].toLowerCase() !== testResultDescription.toLowerCase()) {
    throw new Error(
      `Mismatched testResultCode & testResultDescription. Expected: ${testResultCode} - ${testResultDict[testResultCode]}. Received ${testResultCode} - ${testResultDescription}.`
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
