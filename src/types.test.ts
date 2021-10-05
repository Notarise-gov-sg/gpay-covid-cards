import { isTestingRecordArray, isVaccinationRecordArray } from "./types";
import testSingleRecord from "../fixtures/google-examples/test-single-record.json";
import vaccinationSingleRecord from "../fixtures/google-examples/vaccination-single-record.json";

const { testingRecord } = testSingleRecord.payload.covidCardObjects[0].testingDetails;
const { vaccinationRecord } = vaccinationSingleRecord.payload.covidCardObjects[0].vaccinationDetails;

describe("types", () => {
  it("should pass TestingRecord[] type check", () => {
    expect(isTestingRecordArray(testingRecord)).toBe(true);
  });

  it("should fail TestingRecord[] type check", () => {
    expect(isTestingRecordArray([{ ...testingRecord[0], administrationDateTime: undefined }])).toBe(false);
    expect(isTestingRecordArray([{ ...testingRecord[0], foo: "bar" }])).toBe(false);
  });

  it("should pass VaccinationRecord[] type check", () => {
    expect(isVaccinationRecordArray(vaccinationRecord)).toBe(true);
  });

  it("should fail VaccinationRecord[] type check", () => {
    expect(isTestingRecordArray([{ ...vaccinationRecord[0], code: undefined }])).toBe(false);
    expect(isTestingRecordArray([{ ...vaccinationRecord[0], foo: "bar" }])).toBe(false);
  });
});
