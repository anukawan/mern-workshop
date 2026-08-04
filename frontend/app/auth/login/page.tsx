
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginResponse {
    message?: string;
    error?: string;
    jwtToken?: string;
    token?: string;
    data?: {
        user?: {
            _id: string;
            name: string;
            email: string;
            createdAt?: string;
        };
        jwtToken?: string;
    };
}

export default function loginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data: LoginResponse = await response.json();

            console.log("Login response:", data);

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    data.error ||
                    "Login failed"
                );
            }

            // Get user from backend response
            const userData = data.data?.user;

            // Save user in localStorage
            if (userData) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(userData)
                );
            }

            // Get JWT token
            const token =
                data.jwtToken ||
                data.token ||
                data.data?.jwtToken;

            // Save JWT token
            if (token) {
                localStorage.setItem("token", token);
            }

            // Go to dashboard
            router.push("/auth/dashboard");

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An error occurred during login");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4">

            <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md">

                {/* Header */}
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>

                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Enter your email and password
                    </p>
                </div>

                {/* Login Form */}
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit}
                >

                    {/* Error Message */}
                    {error && (
                        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                            <p className="text-sm text-red-800 dark:text-red-400">
                                {error}
                            </p>
                        </div>
                    )}

                    <div className="space-y-3">

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="sr-only"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email address"
                                value={email}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setEmail(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-800"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="sr-only"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-800"
                            />
                        </div>

                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign in"}
                    </button>

                </form>

                {/* Signup */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}

                    <button
                        type="button"
                        onClick={() =>
                            router.push("/auth/signUp")
                        }
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Sign up
                    </button>
                </p>

            </div>
        </div>
    );
}
