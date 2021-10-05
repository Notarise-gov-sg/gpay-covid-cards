import { arrayEquals } from "./util";

export interface PatientDetails {
  dateOfBirth: string;
  identityAssuranceLevel?: "IAL1.2" | "IAL1.4" | "IAL2" | "IAL3"; // Source: http://build.fhir.org/ig/dvci/vaccine-credential-ig/branches/main/#identity-assurance
  patientId: string;
  patientIdLabel: string;
  patientName: string;
}

export interface TestingRecord {
  administrationDateTime: string;
  contactInfo: string;
  provider: string;
  reportDateTime: string;
  testCode: string;
  testDescription: string;
  testResultCode: "260385009" | "10828004";
  testResultDescription: "Negative" | "Positive";
  specimen: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTestingRecordArray(x: any): x is TestingRecord[] {
  const keys = [
    "administrationDateTime",
    "contactInfo",
    "provider",
    "reportDateTime",
    "testCode",
    "testDescription",
    "testResultCode",
    "testResultDescription",
    "specimen",
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return x.every((obj: any) => {
    const _keys = Object.keys(obj);
    return arrayEquals(_keys, keys) && _keys.every((k) => typeof obj[k] === "string");
  });
}

export interface VaccinationRecord {
  code: string;
  contactInfo: string;
  description: string;
  doseDateTime: string;
  doseLabel: string;
  lotNumber: string;
  manufacturer: string;
  provider: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isVaccinationRecordArray(x: any): x is VaccinationRecord[] {
  const keys = [
    "code",
    "contactInfo",
    "description",
    "doseDateTime",
    "doseLabel",
    "lotNumber",
    "manufacturer",
    "provider",
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return x.every((obj: any) => {
    const _keys = Object.keys(obj);
    return arrayEquals(_keys, keys) && _keys.every((k) => typeof obj[k] === "string");
  });
}

export interface GenericGPayCovidCardTemplate {
  aud: "google";
  iss: string;
  typ: "savetogooglepay";
  origins: [];
  payload: {
    covidCardObjects: {
      id: string;
      issuerId: string;
      cardColorHex: "#FFFFFF";
      title: string;
      barcode: {
        alternateText: "Scan this QR to verify your HealthCert";
        type: "qrCode";
        value: string;
      };
      expiration?: string;
      logo: {
        sourceUri: {
          description: "HealthCerts";
          uri: "https://www.notarise.gov.sg/images/healthcerts-logo_gpay.png";
        };
      };
      patientDetails: PatientDetails;
    }[];
  };
}

export type PdtGPayCovidCardTemplate = GenericGPayCovidCardTemplate & {
  payload: {
    covidCardObjects: {
      testingDetails: {
        testingRecord: TestingRecord[];
      };
    }[];
  };
};

export type VacGPayCovidCardTemplate = GenericGPayCovidCardTemplate & {
  payload: {
    covidCardObjects: {
      vaccinationDetails: {
        vaccinationRecord: VaccinationRecord[];
      };
    }[];
  };
};

export interface BasicDetails {
  iss: string;
  uuid: string;
  issuerId: string;
  title: string;
  qr: string;
  expiration?: string;
  patientDetails: PatientDetails;
}
