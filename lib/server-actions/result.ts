"use server";

import { callBackend } from "./client";

export async function getResultsAction(rollNumber: string) {
    try {
        return await callBackend(`/results?rollNumber=${rollNumber}`, "GET");
    } catch (error) {
        console.error("getResultsAction Error:", error);
        return { success: false, message: "Failed to fetch results" };
    }
}

export async function createResultAction(data: any) {
    try {
        return await callBackend("/results", "POST", data);
    } catch (error) {
        console.error("createResultAction Error:", error);
        return { success: false, message: "Failed to create result" };
    }
}

export async function deleteResultAction(id: string) {
    try {
        return await callBackend("/results", "DELETE", { id });
    } catch (error) {
        console.error("deleteResultAction Error:", error);
        return { success: false, message: "Failed to delete result" };
    }
}
