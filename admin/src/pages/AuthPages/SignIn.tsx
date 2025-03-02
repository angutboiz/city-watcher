import { useState } from "react";
import GridShape from "../../components/common/GridShape";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { data, Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Checkbox from "../../components/form/input/Checkbox";
import Button from "../../components/ui/button/Button";
import PageMeta from "../../components/common/PageMeta";
import axiosAPI from "../../services/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useUser } from "../../context/userContext";
export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const userContext = useUser();
    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const { data } = await axiosAPI.post("/auth/login", dataLogin);
            if (data.ok) {
                if (data.data.user.roles !== "user") {
                    Cookies.set("accessToken", data.data.accessToken, { expires: 1 / 24 });
                    Cookies.set("refreshToken", data.data.refreshToken, { expires: 7 });
                    toast.success("Đăng nhập thành công!");
                    userContext?.updateUser(data.data.user);

                    // window.location.href = "/";
                    navigate("/");
                } else {
                    toast.warning("Bạn không có quyền truy cập vào trang này!");
                }
            }
        } catch (err: any) {
            // Error already handled by axios interceptor
            return; // Prevent error from propagating
        }
    };
    return (
        <>
            <PageMeta
                title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="relative flex w-full h-screen px-4 py-6 overflow-hidden bg-white z-1 dark:bg-gray-900 sm:p-0">
                <div className="flex flex-col flex-1 p-6 rounded-2xl sm:rounded-none sm:border-0 sm:p-8">
                    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                        <div>
                            <div className="mb-5 sm:mb-8">
                                <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">Đăng nhập</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Nhập tài khoản và mật khẩu để Đăng nhập!</p>
                            </div>
                            <form onSubmit={handleLogin}>
                                <div className="relative py-3 sm:py-5">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <Label>
                                            Email <span className="text-error-500">*</span>{" "}
                                        </Label>
                                        <Input placeholder="info@gmail.com" value={dataLogin.email} onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <Label>
                                            Password <span className="text-error-500">*</span>{" "}
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                value={dataLogin.password}
                                                onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })}
                                            />
                                            <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                                                {showPassword ? <EyeIcon className="fill-gray-500 dark:fill-gray-400" /> : <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Checkbox checked={isChecked} onChange={setIsChecked} />
                                            <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">Keep me logged in</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Button className="w-full" size="sm">
                                            Đăng nhập
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="relative items-center justify-center flex-1 hidden p-8 z-1 bg-brand-950 dark:bg-white/5 lg:flex">
                    {/* <!-- ===== Common Grid Shape Start ===== --> */}
                    <GridShape />
                    <div className="flex flex-col items-center max-w-xs">
                        <Link to="/" className="block mb-4">
                            <img src="./images/logo/auth-logo.png" alt="Logo" />
                        </Link>
                        <p className="text-center text-gray-400 dark:text-white/60">Dự án hỗ trợ người dân báo cáo các sự cố trong cuộc sống</p>
                    </div>
                </div>
            </div>
        </>
    );
}
