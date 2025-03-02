import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { format } from "date-fns";
import Badge from "../ui/badge/Badge";
import FormatDistanceDate from "../../lib/FormatDistanceDate";
import Switch from "../form/switch/Switch";
import Select from "../form/Select";

export default function BasicTableOne({ TABLE_HEAD, TABLE_BODY, handleFunction, loading }: any) {
    const roleOptions = [
        {
            value: "admin",
            label: "Admin",
        },
        {
            value: "manager",
            label: "Manager",
        },
        {
            value: "user",
            label: "User",
        },
    ];

    const zoneOptions = [
        { value: "Tân Uyên", label: "Tân Uyên" },
        { value: "Thuận An", label: "Thuận An" },
        { value: "Dĩ An", label: "Dĩ An" },
        { value: "Bến Cát", label: "Bến Cát" },
        { value: "Phú Giáo", label: "Phú Giáo" },
        { value: "Bầu Bàng", label: "Bầu Bàng" },
        { value: "Bắc Tân Uyên", label: "Bắc Tân Uyên" },
        { value: "Dầu Tiếng", label: "Dầu Tiếng" },
        { value: "Thủ Dầu Một", label: "Thủ Dầu Một" },
    ];
    const renderTableCell = (columnId: string, objValue: any) => {
        switch (columnId) {
            case "info":
                return (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                            <img src={objValue.profilePicture} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{objValue.displayName || "Chưa đặt tên"}</span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">Tham gia: {FormatDistanceDate(objValue.createdAt)}</span>
                        </div>
                    </div>
                );
            case "role":
                return (
                    <Select
                        disabled={loading}
                        options={roleOptions}
                        defaultValue={objValue.roles}
                        placeholder="Select an option"
                        onChange={(value) => handleFunction({ id: objValue.id, roles: value })}
                        className="dark:bg-dark-900 py-[1px]"
                    />
                );
            case "zone":
                return (
                    <Select
                        disabled={loading}
                        options={zoneOptions}
                        defaultValue={objValue.zone}
                        placeholder="Select an option"
                        onChange={(value) => handleFunction({ id: objValue.id, zone: value })}
                        className="dark:bg-dark-900 py-[1px]"
                    />
                );
            case "status":
                return (
                    <Badge size="sm" color={objValue === true ? "success" : "warning"}>
                        {objValue === true ? "Open" : "Locked"}
                    </Badge>
                );
            case "updatedAt":
                return format(new Date(objValue), "dd/MM/yyyy");
            case "feature":
                return <Switch disabled={loading} label="" defaultChecked={objValue.status} onChange={(checked: boolean) => handleFunction({ id: objValue.id, status: checked })} />;
            default:
                return objValue;
        }
    };
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                {TABLE_HEAD.map((head: any) => (
                                    <TableCell key={head.id} isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        {head.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {TABLE_BODY.map((row: any) => (
                                <TableRow key={row.id}>
                                    {TABLE_HEAD.map((column: any) => (
                                        <TableCell key={`${row.id}-${column.id}`} className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {renderTableCell(column.id, row[column.id])}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
