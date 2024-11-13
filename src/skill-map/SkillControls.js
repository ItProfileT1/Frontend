import React, { useEffect, useRef } from "react";

const SkillControls = ({
    moveSensitivity,
    zoomSensitivity,
    setMoveSensitivity,
    setZoomSensitivity,
}) => {
    const sliderRefs = useRef([]);

    const updateSliderBackground = (slider) => {
        const percent =
            ((slider.value - slider.min) * 100) / (slider.max - slider.min);
        slider.style.backgroundSize = `${percent}% 100%`;
    };

    useEffect(() => {
        sliderRefs.current.forEach((slider) => {
            if (slider) updateSliderBackground(slider);
        });
    }, [moveSensitivity, zoomSensitivity]);

    const handleSliderChange = (setSensitivity) => (e) => {
        const value = parseFloat(e.target.value);
        setSensitivity(value);
    };

    return (
        <div className="skill-controls">
            <div className="skill-controls-sliders">
                <SliderControl
                    label="Чувствительность<br/>перемещения"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={moveSensitivity}
                    onChange={handleSliderChange(setMoveSensitivity)}
                    sliderRef={(el) => (sliderRefs.current[0] = el)}
                />
                <ZoomHelpText />
                <SliderControl
                    label="Чувствительность<br/>масштабирования"
                    min="0.05"
                    max="0.5"
                    step="0.05"
                    value={zoomSensitivity}
                    onChange={handleSliderChange(setZoomSensitivity)}
                    sliderRef={(el) => (sliderRefs.current[1] = el)}
                />
            </div>
        </div>
    );
};

const SliderControl = ({
    label,
    min,
    max,
    step,
    value,
    onChange,
    sliderRef,
}) => (
    <div className="skill-map-slider">
        <label>
            <div dangerouslySetInnerHTML={{ __html: label }}></div>
            <div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={onChange}
                    ref={sliderRef}
                />
                <div>
                    <span style={{ fontSize: "18px" }}>{value}</span>
                </div>
            </div>
        </label>
    </div>
);

const ZoomHelpText = () => (
    <div className="skill-controls-help">
        Для масштабирования карты
        <br />
        удерживайте клавишу <span>Alt</span>
        <br />и прокрутите <span>колесо мыши</span>
    </div>
);

export default SkillControls;
