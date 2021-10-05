import { PatientDetails } from "../types";

/**
 * Helper function to generate Patient details.
 * @param patientDetails
 * @returns
 */
export const genPatientDetails = ({
  dateOfBirth,
  identityAssuranceLevel,
  patientId,
  patientIdLabel,
  patientName,
}: PatientDetails): PatientDetails => ({
  dateOfBirth,
  ...(identityAssuranceLevel && { identityAssuranceLevel: "IAL1.4" }),
  patientId,
  patientIdLabel,
  patientName,
});
