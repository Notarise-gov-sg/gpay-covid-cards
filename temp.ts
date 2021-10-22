// import KMS from "aws-sdk/clients/kms";
// const kms = new KMS();

import GPay from "./src/index";

import staging from "./secrets/notarise-gpay-covid-cards-b1242043e700.json";
import sample from "./fixtures/notarise-examples/vac-multi-record.json";

const gpay = GPay(staging.private_key);

(async () => {
  //   const signed = await gpay.signWithKms(sample, "alias/gpay-covid-cards-api-vaccine", kms);
  const signed = gpay.signPayload(sample);
  console.log(signed);
})();
