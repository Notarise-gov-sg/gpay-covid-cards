import { genVaccinationRecord } from "./vac";
import { VaccinationRecord } from "../types";

const validVaccinationRecord: VaccinationRecord = {
  code: "1234",
  contactInfo: "123 Forever Rd. 12345 Infinity, CA",
  description: "Q4NTL6",
  doseDateTime: "2014-01-12",
  doseLabel: "1st Dose",
  lotNumber: "92681",
  manufacturer: "Moderna",
  provider: "Healthgenics",
};

describe("genVaccinationRecord()", () => {
  it("should produce valid VaccinationRecord", () => {
    expect(() => genVaccinationRecord(validVaccinationRecord)).not.toThrowError();
    expect(genVaccinationRecord(validVaccinationRecord)).toStrictEqual(validVaccinationRecord);
  });
});
