import { BasicDetails, PatientDetails, TestingRecord, VaccinationRecord } from "../types";
import { genGPayCovidCard } from "./gpay-covid-card";
import { genPatientDetails } from "./patient";
import { genTestingRecord } from "./pdt";
import { genVaccinationRecord } from "./vac";
import { TEST_IAT } from "../../fixtures/config";

import notarisePdtSingleRecord from "../../fixtures/notarise-examples/pdt-single-record.json";
import notariseVacSingleRecord from "../../fixtures/notarise-examples/vac-single-record.json";
import notarisePdtMultiRecord from "../../fixtures/notarise-examples/pdt-multi-record.json";
import notariseVacMultiRecord from "../../fixtures/notarise-examples/vac-multi-record.json";

export const patientDetails: PatientDetails = {
  dateOfBirth: "1990-01-15",
  identityAssuranceLevel: "IAL1.4",
  patientId: "E7831177G",
  patientIdLabel: "Passport Number",
  patientName: "Tan Chen Chen",
};

export const basicDetails: BasicDetails = {
  iss: "staging@notarise-gpay-covid-cards.iam.gserviceaccount.com",
  uuid: "some_uuid",
  issuerId: "3388000000016843803",
  title: "COVID-19 Test Result Card",
  qr: "https://www.verify.gov.sg/",
  expiration: "2021-10-01",
  patientDetails: genPatientDetails(patientDetails),
};

export const testingRecord: TestingRecord = {
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

export const vaccinationRecord: VaccinationRecord = {
  code: "1234",
  contactInfo: "123 Forever Rd. 12345 Infinity, CA",
  description: "Q4NTL6",
  doseDateTime: "2014-01-12",
  doseLabel: "1st Dose",
  lotNumber: "92681",
  manufacturer: "Moderna",
  provider: "Healthgenics",
};

describe("genGPayCovidCard() [Single record]", () => {
  it("TestingRecord", () => {
    const singleTestingRecord = genGPayCovidCard(basicDetails, [genTestingRecord(testingRecord)]);
    expect({ iat: TEST_IAT, ...singleTestingRecord }).toStrictEqual(notarisePdtSingleRecord);
  });

  it("VaccinationRecord", () => {
    const singleVaccinationRecord = genGPayCovidCard(basicDetails, [genVaccinationRecord(vaccinationRecord)]);
    expect({ iat: TEST_IAT, ...singleVaccinationRecord }).toStrictEqual(notariseVacSingleRecord);
  });
});

describe("genGPayCovidCard() [Multi record]", () => {
  it("TestingRecord", () => {
    const multiTestingRecord = genGPayCovidCard(basicDetails, [
      genTestingRecord(testingRecord),
      genTestingRecord(testingRecord),
    ]);
    expect({ iat: TEST_IAT, ...multiTestingRecord }).toStrictEqual(notarisePdtMultiRecord);
  });

  it("VaccinationRecord", () => {
    const multiVaccinationRecord = genGPayCovidCard(basicDetails, [
      genVaccinationRecord(vaccinationRecord),
      genVaccinationRecord(vaccinationRecord),
    ]);
    expect({ iat: TEST_IAT, ...multiVaccinationRecord }).toStrictEqual(notariseVacMultiRecord);
  });
});
