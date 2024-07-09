import { FaFaceSmile, FaFaceMeh, FaFaceFrownOpen } from "react-icons/fa6";

export const getIcon = (status) => {
    let Icon;
    let textColor;
    switch (status) {
        case "Good":
            Icon = <FaFaceSmile size={20} color="#02DB5C" className="mb-[7px]" />;
            textColor = "#02DB5C";
            break;
        case "Moderate":
            Icon = <FaFaceMeh size={20} color="#FFDE30" className="mb-[7px]" />;
            textColor = "#FFDE30";
            break;
        case "Unhealthy for Sensitive Groups":
            Icon = <FaFaceFrownOpen size={20} color="#FEB156" className="mb-[7px]" />;
            textColor = "#FEB156";
            break;
        case "Unhealthy":
            Icon = <FaFaceFrownOpen size={20} color="#E53935" className="mb-[7px]" />;
            textColor = "#E53935";
            break;
        case "Very Unhealthy":
            Icon = <FaFaceFrownOpen size={20} color="#D32F2F" className="mb-[7px]" />;
            textColor = "#D32F2F";
            break;
        case "Hazardous":
            Icon = <FaFaceFrownOpen size={20} color="#B71C1C" className="mb-[7px]" />;
            textColor = "#B71C1C";
            break;
        default:
            Icon = null;
            textColor = "inherit";
    }

    return [Icon, textColor];
}

const AQIstatus = ({ aqi, status }) => {

    const [icon, color] = getIcon(status);

    return (
        <>
            <p className="absolute top-[42%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-lighter flex items-center gap-2 text-base">
                <span className="text-3xl font-semibold">{aqi}</span>
                AQI
            </p>
            <div className="w-full h-[70%] flex items-end justify-center gap-4">
                {icon}
                <span className="text-center font-bold text-2xl" style={{ color: color }}>
                    {status}
                </span>
            </div>
        </>
    );
};

export default AQIstatus;
