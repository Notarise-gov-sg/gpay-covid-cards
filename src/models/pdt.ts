import { TestingRecord, notariseAcceptedTestResultCodes, euAcceptedTestResultCodes } from "../types";

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
  const acceptedTestResultCodes = [...notariseAcceptedTestResultCodes, ...euAcceptedTestResultCodes];
  if (!acceptedTestResultCodes.includes(testResultCode)) {
    throw new Error(
      `Invalid testResultCode (${testResultCode}) received. Should be one of these values: ${JSON.stringify(
        acceptedTestResultCodes
      )}`
    );
  }

  /**
   * What Notarise uses:
   * 260385009 (Negative) / 10828004 (Positive)
   */
  const notariseTestResultCodeToDesc: Record<
    typeof notariseAcceptedTestResultCodes[number],
    TestingRecord["testResultDescription"]
  > = {
    "260385009": "Negative",
    "10828004": "Positive",
  };

  /**
   * What EU DCC uses:
   * 260415000 (Not detected) / 260373001 (Detected)
   */
  const euDccToNotariseTestResultCode: Record<
    typeof euAcceptedTestResultCodes[number],
    typeof notariseAcceptedTestResultCodes[number]
  > = {
    "260415000": "260385009", // Not detected -> Negative
    "260373001": "10828004", // Detected -> Positive
  };

  // If EU DCC codes are used, map it to Notarise codes
  const isEuDccTestResultCode = (x: any): x is typeof euAcceptedTestResultCodes[number] =>
    euAcceptedTestResultCodes.includes(x);
  if (isEuDccTestResultCode(testResultCode)) {
    testResultCode = euDccToNotariseTestResultCode[testResultCode];
    testResultDescription = notariseTestResultCodeToDesc[testResultCode];
  }

  // Lastly, ensure Test Result Code matches the corresponding Test Result Description
  if (notariseTestResultCodeToDesc[testResultCode].toLowerCase() !== testResultDescription.toLowerCase()) {
    throw new Error(
      `Mismatched testResultCode & testResultDescription. Expected: ${testResultCode} - ${notariseTestResultCodeToDesc[testResultCode]}. Received ${testResultCode} - ${testResultDescription}.`
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
    testResultDescription: notariseTestResultCodeToDesc[testResultCode] || testResultDescription,
    specimen,
  };
};
