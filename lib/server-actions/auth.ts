"use server";

import { cookies } from "next/headers";
import { callBackend } from "./client";

export async function loginAction(credentials: any) {
    try {
        return await callBackend("/auth/login", "POST", credentials);
    } catch (error) {
        console.error("loginAction Error:", error);
        return { success: false, message: "Login failed" };
    }
}

export async function logoutAction() {
    try {
        const res = await callBackend("/auth/logout", "POST");
        
        // Explicitly clear cookies locally as well
        const cookieStore = await cookies();
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        return res;
    } catch (error) {
        console.error("logoutAction Error:", error);
        return { success: false, message: "Logout failed" };
    }
}

export async function refreshAction() {
    try {
        return await callBackend("/auth/refresh", "POST");
    } catch (error) {
        console.error("refreshAction Error:", error);
        return { success: false, message: "Refresh token failed" };
    }
}
