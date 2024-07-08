import { useEffect, useRef } from 'react';
import ProgressBar from 'progressbar.js';

export const getColorByStatus = (status) => {
    switch (status) {
        case "Good":
            return ["#adf2ca", "#02DB5C"];
        case "Moderate":
            return ["#fcf4ce", "#FFDE30"];
        case "Unhealthy for Sensitive Groups":
            return ["#ffe6c8", "#FEB156"];
        case "Unhealthy":
            return ["#eab6b5", "#E53935"];
        case "Very Unhealthy":
            return ["#d7a0a0", "#D32F2F"];
        case "Hazardous":
            return ["#ba8888", "#B71C1C"];
        default:
            return ["#adf2ca", "#02DB5C"];
    }
};

const ProgressBarComponent = ({ progress, status }) => {
    const barRef = useRef(null);

    useEffect(() => {
        const container = barRef.current;
        if (!container) return;

        if (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }

        const color = getColorByStatus(status);

        const bar = new ProgressBar.SemiCircle(container, {
            strokeWidth: 4,
            color: "white",
            trailColor: color[0],
            trailWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            svgStyle: {
                width: '240px',
                height: '140px',
                fill: 'none',
                stroke: color[1],
                strokeWidth: 5,
                strokeLinecap: 'round',
                filter: 'drop-shadow(-3px -2px 5px rgba(255, 255, 255, 0.5))',
            },
            text: {
                value: '',
                alignToBottom: false,
                className: 'progressbar__label',
            },
            step: (state, bar) => {
                bar.path.setAttribute('stroke', color);
                var value = Math.round(bar.value() * progress * 50 / 100);
                if (value === 0) {
                    bar.setText('');
                } else {
                    bar.setText(value);
                }
                bar.text.style.color = color;
            },
        });

        bar.animate(progress / 50);

        return () => {
            bar.destroy();
        };
    }, [progress, status]);

    return <div ref={barRef} />;
};

export default ProgressBarComponent;
