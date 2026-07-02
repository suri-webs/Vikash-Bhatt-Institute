"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_URL || "http://localhost:8080/api";

function parseSetCookie(cookieStr: string) {
    const parts = cookieStr.split(';');
    const [namePair, ...directives] = parts;
    const eqIdx = namePair.indexOf('=');
    if (eqIdx === -1) return null;
    const name = namePair.substring(0, eqIdx).trim();
    const value = namePair.substring(eqIdx + 1).trim();

    const options: any = {
        path: '/',
        httpOnly: true,
    };
    for (const directive of directives) {
        const [dirName, dirVal] = directive.trim().split('=');
        const lowName = dirName.trim().toLowerCase();
        if (lowName === 'path') options.path = dirVal;
        else if (lowName === 'max-age') options.maxAge = parseInt(dirVal, 10);
        else if (lowName === 'httponly') options.httpOnly = true;
        else if (lowName === 'secure') options.secure = true;
        else if (lowName === 'samesite') {
            options.sameSite = dirVal.toLowerCase();
        }
    }
    return { name, value, options };
}

export async function callBackend(path: string, method: string, body?: any) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    const cookieHeaderParts = [];
    if (accessToken) cookieHeaderParts.push(`accessToken=${accessToken}`);
    if (refreshToken) cookieHeaderParts.push(`refreshToken=${refreshToken}`);
    if (cookieHeaderParts.length > 0) {
        headers["Cookie"] = cookieHeaderParts.join("; ");
    }

    const options: RequestInit = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${path}`, options);
        
        const setCookieHeaders = response.headers.getSetCookie ? response.headers.getSetCookie() : [];
        for (const cookieStr of setCookieHeaders) {
            const parsed = parseSetCookie(cookieStr);
            if (parsed) {
                cookieStore.set(parsed.name, parsed.value, parsed.options);
            }
        }

        const data = await response.json();
        if (!response.ok) {
            return { success: false, message: data.message || "Request failed" };
        }
        return { success: true, ...data };
    } catch (error: any) {
        console.error(`Error in callBackend for ${path}:`, error);
        return { success: false, message: error.message || "Network error" };
    }
}
