import React, { useEffect, useRef } from 'react';
import { getColorByStatus } from './ProgressBar';

const GasesBar = ({ name, value, status }) => {
    const color = getColorByStatus(status);
    const percentage = value;
    const barRef = useRef(null);

    useEffect(() => {
        if (barRef.current) {
            barRef.current.style.height = `${percentage / 40}%`;
        }
    }, [percentage]);

    return (
        <div className="basis-[35%] py-4 flex justify-center">
            <div className="h-full w-[10px] rounded-lg z-0 relative overflow-y-hidden" style={{ backgroundColor: color[0] }}>
                <div
                    ref={barRef}
                    className="w-full absolute bottom-0 h-0 right-0 rounded-full transition-all duration-1000 ease-in-out"
                    style={{
                        backgroundColor: color[1],
                    }}
                ></div>
            </div>
            <div className="flex flex-col gap-1 pl-3 pt-2 w-20">
                <p className="text-[10px]">{name} (ppm)</p>
                <p className="font-bold text-xl">{value}</p>
            </div>
        </div>
    );
};

export default GasesBar;
