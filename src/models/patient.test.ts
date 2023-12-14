import { genPatientDetails } from "./patient";
import { PatientDetails } from "../types";

const validPatientDetails: PatientDetails = {
  dateOfBirth: "1881-05-19",
  identityAssuranceLevel: "IAL1.4",
  patientId: "123-456-ABC",
  patientIdLabel: "National ID",
  patientName: "John Doe",
};

describe("genPatientDetails()", () => {
  it("should produce valid PatientDetails", () => {
    expect(() => genPatientDetails(validPatientDetails)).not.toThrowError();
    expect(genPatientDetails(validPatientDetails)).toStrictEqual(validPatientDetails);
  });

  it("should produce valid PatientDetails without identityAssuranceLevel", () => {
    const valid: PatientDetails = { ...validPatientDetails, identityAssuranceLevel: undefined };

    expect(() => genPatientDetails(valid)).not.toThrowError();
    expect(genPatientDetails(valid)).toMatchInlineSnapshot(`
{
  "dateOfBirth": "1881-05-19",
  "patientId": "123-456-ABC",
  "patientIdLabel": "National ID",
  "patientName": "John Doe",
}
`);
  });
});
