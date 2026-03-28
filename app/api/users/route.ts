import connectDB from "@/db/connectDB";
import { UserModel } from "@/models/User";

// ✅ GET - Fetch all users
export async function GET() {
    try {
        await connectDB();

        const users = await UserModel.find();

        return Response.json({ success: true, users });

    } catch (error: any) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}


// ✅ POST - Create new user
export async function POST(request: Request) {
    try {
        await connectDB();

        const formData = await request.formData();

        const username = formData.get('username');
        const gmail = formData.get('gmail');
        const password = formData.get('password');
        const rollNumber = formData.get('rollNumber');

        if (!username || !gmail || !password || !rollNumber) {
            return Response.json(
                { success: false, message: "All fields required" },
                { status: 400 }
            );
        }

        const user = new UserModel({
            username,
            gmail,
            password,
            rollNumber,
            role: "student" // ✅ force role
        });

        await user.save();

        return Response.json({ success: true, user });

    } catch (error: any) {

        // ✅ Handle duplicate error cleanly
        if (error.code === 11000) {
            return Response.json(
                { success: false, error: "User already exists" },
                { status: 400 }
            );
        }

        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}


// ✅ PUT - Update user
export async function PUT(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { id, username, gmail, password, rollNumber } = body;

        if (!id) {
            return Response.json(
                { success: false, message: "User ID required" },
                { status: 400 }
            );
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { username, gmail, password, rollNumber },
            { new: true }
        );

        if (!updatedUser) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return Response.json({ success: true, user: updatedUser });

    } catch (error: any) {
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}


// ✅ DELETE - Delete user
export async function DELETE(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { id } = body;

        if (!id) {
            return Response.json(
                { success: false, message: "User ID required" },
                { status: 400 }
            );
        }

        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: "User deleted"
        });

    } catch (error: any) {
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}