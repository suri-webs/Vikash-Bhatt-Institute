"use server";

import { callBackend } from "./client";

export async function getUsersAction(rollNumber?: string) {
    try {
        const path = rollNumber ? `/users?rollNumber=${rollNumber}` : "/users";
        return await callBackend(path, "GET");
    } catch (error) {
        console.error("getUsersAction Error:", error);
        return { success: false, message: "Failed to fetch users" };
    }
}

export async function getUserByIdAction(id: string) {
    try {
        return await callBackend(`/users/${id}`, "GET");
    } catch (error) {
        console.error("getUserByIdAction Error:", error);
        return { success: false, message: "Failed to fetch user by id" };
    }
}

export async function registerAction(data: any) {
    try {
        return await callBackend("/users", "POST", data);
    } catch (error) {
        console.error("registerAction Error:", error);
        return { success: false, message: "Failed to register user" };
    }
}

export async function updateUserAction(data: any) {
    try {
        return await callBackend("/users", "PUT", data);
    } catch (error) {
        console.error("updateUserAction Error:", error);
        return { success: false, message: "Failed to update user" };
    }
}

export async function deleteUserAction(rollNumber: string) {
    try {
        return await callBackend("/users", "DELETE", { rollNumber });
    } catch (error) {
        console.error("deleteUserAction Error:", error);
        return { success: false, message: "Failed to delete user" };
    }
}
