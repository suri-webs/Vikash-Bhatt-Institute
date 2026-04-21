import axios from "axios";
import { useEffect, useState } from "react";
import { getServerUrl } from "../utils/config";
import { Search } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@base-ui/react/button";

export interface User {
    _id: string;
    name: string;
    rollNumber: number;
    className: string;
    batch: string;
    result: string;
    gmail: string;
}

export default function AdminSection() {
    const [total, setTotal] = useState<number>();
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<User | null>(null);

    const filteredUsers = users.filter((user) =>
        (user.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (user.rollNumber?.toString() || "").includes(search)
    );

    const handleEdit = (user: User) => {
        setEditingId(user._id);
        setFormData({ ...user });
    };

    const handleDelete = async (user: User) => {
        try {
            await axios.delete(`${getServerUrl()}/users`, {
                data: { rollNumber: user.rollNumber },
                withCredentials: true,
            });
            setUsers((prev) => prev.filter((u) => u._id !== user._id));
            setTotal((prev) => (prev ?? 1) - 1);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChangeField = (field: keyof User, value: string) => {
        if (!formData) return;
        setFormData({
            ...formData,
            [field]: field === "rollNumber" ? Number(value) : value,
        });
    };
const handleSave = async () => {
    if (!formData) return;
    try {
        await axios.put(
            `${getServerUrl()}/users`,
            { ...formData, id: formData._id }, // send target user id in body
            { withCredentials: true }
        );
        setUsers((prev) =>
            prev.map((u) => (u._id === formData._id ? formData : u))
        );
        setEditingId(null);
        setFormData(null);
    } catch (err) {
        console.log(err);
    }
};
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${getServerUrl()}/users`, {
                    withCredentials: true,
                });
                setUsers(response.data.users);
                setTotal(response.data.users.length);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className="flex w-full justify-center mb-4">
                <div className="w-full max-w-6xl border border-gray-200 p-4 shadow-sm rounded-2xl">

                    <div className="grid grid-cols-4 p-5 lg:gap-5 justify-items-center">
                        <div className="h-30 w-full max-w-50 flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-amber-100">
                            <div>{total}</div>
                            <div>Total Students</div>
                        </div>
                        <div className="h-30 w-full max-w-50 flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-amber-100">
                            Total Teachers
                        </div>
                        <div className="h-30 w-full max-w-50 flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-amber-100">
                            Active Batches
                        </div>
                        <div className="h-30 w-full max-w-50 flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-amber-100">
                            Add Users
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Enter Student Roll Number..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                </div>
            </div>
            <div className="w-full max-w-6xl mt-4 max-h-185 overflow-y-auto p-4  border border-gray-200  rounded-2xl" style={{ scrollbarWidth: "none" }}>
                <div className="grid grid-cols-3 gap-4">
                    {filteredUsers.map((user) => {
                        const isEditing = editingId === user._id;
                        const values = isEditing && formData ? formData : user;

                        return (
                            <Card key={user._id} className="w-full max-w-xs p-3">
                                <CardHeader className="p-2">
                                    <CardTitle className="text-base">{user.name}</CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="w-24 text-gray-500">Roll No:</span>
                                        <input
                                            value={values.rollNumber || ""}
                                            disabled={!isEditing}
                                            onChange={(e) => handleChangeField("rollNumber", e.target.value)}
                                            className="flex-1 border p-1 rounded-md disabled:bg-gray-100"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-24 text-gray-500">Class:</span>
                                        <input
                                            value={values.className || ""}
                                            disabled={!isEditing}
                                            onChange={(e) => handleChangeField("className", e.target.value)}
                                            className="flex-1 border p-1 rounded-md disabled:bg-gray-100"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-24 text-gray-500">Batch:</span>
                                        <input
                                            value={values.batch || ""}
                                            disabled={!isEditing}
                                            onChange={(e) => handleChangeField("batch", e.target.value)}
                                            className="flex-1 border p-1 rounded-md disabled:bg-gray-100"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-24 text-gray-500">Result:</span>
                                        <input
                                            value={values.result || ""}
                                            disabled={!isEditing}
                                            onChange={(e) => handleChangeField("result", e.target.value)}
                                            className="flex-1 border p-1 rounded-md disabled:bg-gray-100"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-24 text-gray-500">Email:</span>
                                        <input
                                            value={values.gmail || ""}
                                            disabled={!isEditing}
                                            onChange={(e) => handleChangeField("gmail", e.target.value)}
                                            className="flex-1 border p-1 rounded-md disabled:bg-gray-100"
                                        />
                                    </div>
                                </CardContent>

                                <CardFooter className="p-2 flex w-full gap-2">
                                    {isEditing ? (
                                        <>
                                            <Button className="w-full" onClick={() => { setEditingId(null); setFormData(null); }}>
                                                Cancel
                                            </Button>
                                            <Button className="w-full" onClick={handleSave}>
                                                Save
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button className="w-full" onClick={() => handleEdit(user)}>
                                                Edit
                                            </Button>
                                            <Button className="w-full" onClick={() => handleDelete(user)}>
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}