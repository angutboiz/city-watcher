import React, { useEffect } from "react";
import BasicTableOne from "../components/tables/BasicTableOne";
import axiosAPI from "../services/axiosInstance";
import { toast } from "react-toastify";
import { IUser } from "../types/type";

export default function Account() {
    const [accounts, setAccounts] = React.useState<IUser[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    useEffect(() => {
        const fetchAllAccount = async () => {
            try {
                const { data } = await axiosAPI.get("/profile/admin");
                toast.success(data.message);
                setAccounts(data.data);
            } catch (error: any) {
                toast.error(error.response);
                return;
            }
        };
        fetchAllAccount();
    }, []);
    const TABLE_HEAD = [
        { id: "info", label: "Thông tin" },
        { id: "email", label: "Email" },
        { id: "role", label: "Vai trò" },
        { id: "zone", label: "Khu vực QL" },
        { id: "status", label: "Trạng thái" },
        { id: "updatedAt", label: "Ngày cập nhật" },
        { id: "feature", label: "Tính năng" },
    ];

    const TABLE_BODY = accounts.map((account) => ({
        info: { profilePicture: account.profilePicture, displayName: account.displayName, createdAt: account.createdAt },
        email: account.email,
        role: { id: account._id, roles: account.roles },
        zone: { id: account._id, zone: account.zone },
        status: account.status,
        updatedAt: account.updatedAt,
        feature: { id: account._id, status: account.status },
    }));

    const handleChangeAccount = (valueChange: any) => {
        setAccounts((prev) => {
            return prev.map((account) => {
                if (account._id === valueChange._id) {
                    return { ...account, valueChange };
                }
                return account;
            });
        });
    };

    const handleFunction = async (valueChange: boolean) => {
        console.log(valueChange);
        try {
            setLoading(true);
            const { data } = await axiosAPI.patch(`/profile`, valueChange);
            if (data.ok) {
                toast.success(data.message);
                handleChangeAccount(data.data);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return <BasicTableOne TABLE_HEAD={TABLE_HEAD} TABLE_BODY={TABLE_BODY} handleFunction={handleFunction} loading={loading} />;
}
