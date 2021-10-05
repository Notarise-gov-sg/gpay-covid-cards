# Google Pay COVID Cards

A helper library for Google Pay COVID Cards.

## Getting Started

```bash
npm i @notarise-gov-sg/gpay-covid-cards
```

### 1. Import

```javascript
import GPay from "@notarise-gov-sg/gpay-covid-cards";
const gpay = GPay(private_key);
```

### 2. Prepare records

```javascript
// Notarise PDT (Testing Record)
const testingRecord = gpay.genTestingRecord({
  administrationDateTime: "27 September 2020, 2:15 pm SGT",
  contactInfo: "MacRitchie Hospital, Thomson Road, Singapore 123000",
  provider: "MacRitchie Medical Clinic",
  reportDateTime: "28 September 2020, 2:15 pm SGT",
  testCode: "94531-1",
  testDescription: "SARS-CoV-2 (COVID-19) RNA panel - Respiratory specimen by NAA with probe detection",
  testResultCode: "260385009",
  testResultDescription: "Negative",
  specimen: "Nasopharyngeal swab",
});

// Notarise Vaccination (Vaccination Record)
const vaccinationRecord = gpay.genVaccinationRecord({
  code: "1234",
  contactInfo: "123 Forever Rd. 12345 Infinity, CA",
  description: "Q4NTL6",
  doseDateTime: "2014-01-12",
  doseLabel: "1st Dose",
  lotNumber: "92681",
  manufacturer: "Moderna",
  provider: "Healthgenics",
});
```

### 3. Generate and sign the JWT payload

```javascript
const payload = gpay.genGPayCovidCard(basicDetails, [testingRecord]);
const signedPayload = gpay.signPayload(payload);
```

### 4. Get the full URL

```javascript
const fullUrl = gpay.generateFullUrl(signedPayload);
```
