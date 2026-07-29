import User from "./schema";

export const createUserService = async (
    name: string,
    email: string,
    password: string
) => {
    if (!name || !email || !password) {
        throw new Error("Name, email, and password are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    return {
        statusCode: 201,
        success: true,
        data: {
            user,
        },
    };
};

export const updateUserService = async (params: any) => {
    const user = await User.findOneAndUpdate(
        { _id: params._id },
        params,
        { new: true }
    );

    return {
        user,
    };
};