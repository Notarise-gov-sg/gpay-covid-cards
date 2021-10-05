import { VaccinationRecord } from "../types";

/**
 * Helper function to generate a Vaccination record.
 * @param vaccinationRecord
 * @returns
 */
export const genVaccinationRecord = ({
  code,
  contactInfo,
  description,
  doseDateTime,
  doseLabel,
  lotNumber,
  manufacturer,
  provider,
}: VaccinationRecord): VaccinationRecord => {
  return { code, contactInfo, description, doseDateTime, doseLabel, lotNumber, manufacturer, provider };
};
