import {
  BasicDetails,
  TestingRecord,
  VaccinationRecord,
  GenericGPayCovidCardTemplate,
  PdtGPayCovidCardTemplate,
  VacGPayCovidCardTemplate,
  isTestingRecordArray,
  isVaccinationRecordArray,
} from "../types";
import { genPatientDetails } from "./patient";
import { genTestingRecord } from "./pdt";
import { genVaccinationRecord } from "./vac";

/**
 * Generates a Google Pay COVID Card payload depending on the type of record provided (i.e. TestingRecord or VaccinationRecord).
 *
 * @param basicDetails
 * @param record
 */
export function genGPayCovidCard(basicDetails: BasicDetails, record: TestingRecord[]): PdtGPayCovidCardTemplate;
export function genGPayCovidCard(basicDetails: BasicDetails, record: VaccinationRecord[]): VacGPayCovidCardTemplate;

export function genGPayCovidCard(
  basicDetails: BasicDetails,
  record: TestingRecord[] | VaccinationRecord[]
): PdtGPayCovidCardTemplate | VacGPayCovidCardTemplate {
  const { iss, uuid, issuerId, title, qr, expiration, patientDetails } = basicDetails;

  const baseTemplate: GenericGPayCovidCardTemplate = {
    aud: "google",
    iss,
    typ: "savetogooglepay",
    origins: [],
    payload: {
      covidCardObjects: [
        {
          id: `${issuerId}.${uuid}`,
          issuerId,
          cardColorHex: "#FFFFFF",
          title,
          barcode: {
            alternateText: "Scan this QR to verify your HealthCert",
            type: "qrCode",
            value: qr,
          },
          ...(expiration && { expiration }),
          logo: {
            sourceUri: {
              description: "HealthCerts",
              uri: "https://www.notarise.gov.sg/images/healthcerts-logo_gpay.png",
            },
          },
          patientDetails: genPatientDetails(patientDetails),
        },
      ],
    },
  };

  if (isTestingRecordArray(record)) {
    const final: PdtGPayCovidCardTemplate = {
      ...baseTemplate,
      payload: {
        // There's always only 1 item in covidCardObjects
        covidCardObjects: [
          {
            ...baseTemplate.payload.covidCardObjects[0],
            testingDetails: {
              testingRecord: record.map(genTestingRecord),
            },
          },
        ],
      },
    };
    return final;
  } else if (isVaccinationRecordArray(record)) {
    const final: VacGPayCovidCardTemplate = {
      ...baseTemplate,
      payload: {
        // There's always only 1 item in covidCardObjects
        covidCardObjects: [
          {
            ...baseTemplate.payload.covidCardObjects[0],
            vaccinationDetails: {
              vaccinationRecord: record.map(genVaccinationRecord),
            },
          },
        ],
      },
    };
    return final;
  } else {
    throw new Error("Please provide a valid testingRecord or vaccinationRecord.");
  }
}
