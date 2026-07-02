"use server";

import { callBackend } from "./client";

export async function createEnquiryAction(data: any) {
    try {
        return await callBackend("/enquiry", "POST", data);
    } catch (error) {
        console.error("createEnquiryAction Error:", error);
        return { success: false, message: "Failed to send enquiry" };
    }
}
