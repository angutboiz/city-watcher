import { formatDistance } from "date-fns";
import { vi } from "date-fns/locale";

const FormatDistanceDate = (date: Date) => {
    return formatDistance(date, new Date(), { locale: vi, addSuffix: true });
};

export default FormatDistanceDate;
