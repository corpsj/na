"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { toast } from "sonner";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || '로그인에 실패했습니다.');
                toast.error('로그인 실패');
                return;
            }

            toast.success('로그인 성공!');
            router.push("/admin/dashboard");
            router.refresh();
        } catch (err) {
            console.error('Login error:', err);
            setError('서버 오류가 발생했습니다.');
            toast.error('서버 오류');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center text-center">
                    <Logo />
                    <h2 className="mt-6 text-2xl font-serif text-white">
                        Admin Access
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        관리자 페이지 접근을 위해 로그인해주세요.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                disabled={isLoading}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-800 bg-gray-900/50 placeholder-gray-500 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors rounded-t-md disabled:opacity-50"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                disabled={isLoading}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-800 bg-gray-900/50 placeholder-gray-500 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors rounded-b-md border-t-0 disabled:opacity-50"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-xs text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-primary hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? '로그인 중...' : 'Login'}
                        </button>
                    </div>
                </form>

                <div className="text-center text-xs text-gray-500 mt-6">
                    <p>Supabase Authentication을 사용합니다.</p>
                    <p className="mt-1">관리자 계정은 Supabase Dashboard에서 생성하세요.</p>
                </div>
            </div>
        </div>
    );
}
