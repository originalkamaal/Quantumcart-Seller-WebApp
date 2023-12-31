import { GSTApiResponse, GSTVerificationResult } from "../types";


async function verifyGST(gstin: string): Promise<GSTVerificationResult> {
  try {
    const response = await fetch(
      `http://sheet.gstincheck.co.in/check/774807e79222bd9ccc8bc430883b5846/${gstin}`,
    );

    if (response.ok) {
      const data: GSTApiResponse = await response.json();

      if (data.flag) {
        const businessName: string = data.data.lgnm;
        const businessAddress: string = data.data.pradr.addr.adr;
        const businessPincode: string = data.data.pradr.addr.pncd;
        const gstStatus: string = data.data.sts;

        return { businessName, businessAddress, businessPincode, gstStatus };
      } else {
        throw new Error("Invalid GSTIN Number");
      }
    } else {
      throw new Error("Failed to fetch GST verification data");
    }
  } catch (error) {
    throw new Error(`An error occurred while fetching GST verification data: ${error}`);
  }
}

export default verifyGST;
