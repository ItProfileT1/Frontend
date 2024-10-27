import React, { useEffect, useRef } from 'react';

const SkillControls = ({ moveSensitivity, zoomSensitivity, setMoveSensitivity, setZoomSensitivity }) => {
    const sliderRefs = useRef([]);

    const updateSliderBackground = (slider) => {
        const percent = ((slider.value - slider.min) * 100) / (slider.max - slider.min);
        slider.style.backgroundSize = `${percent}% 100%`;
    };

    useEffect(() => {
        sliderRefs.current.forEach(slider => updateSliderBackground(slider)); 
    }, []);

    const handleSliderChange = (setSensitivity) => (e) => {
        const value = parseFloat(e.target.value);
        setSensitivity(value);
        updateSliderBackground(e.target);
    };

    return (
        <div className="skill-controls">
            <div className="skill-controls-sliders">
                <div className="skill-map-slider">
                    <label>
                        <div>Чувствительность<br />перемещения</div>
                        <div>
                            <input 
                                type="range" 
                                min="0.1" 
                                max="2" 
                                step="0.1" 
                                value={moveSensitivity} 
                                onChange={handleSliderChange(setMoveSensitivity)} 
                                ref={el => (sliderRefs.current[0] = el)} 
                                onInput={(e) => updateSliderBackground(e.target)} 
                            />
                            <div>
                                <span style={{ fontSize: '18px' }}>{moveSensitivity}</span>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="skill-controls-help">
                    Для масштабирования карты<br />
                    удерживайте клавишу <span>Alt</span><br />
                    и прокрутите <span>колесо мыши</span>
                </div>
                <div className="skill-map-slider">
                    <label>
                        <div>Чувствительность<br />масштабирования</div>
                        <div>
                            <input 
                                type="range" 
                                min="0.05" 
                                max="0.5" 
                                step="0.05" 
                                value={zoomSensitivity} 
                                onChange={handleSliderChange(setZoomSensitivity)} 
                                ref={el => (sliderRefs.current[1] = el)} 
                                onInput={(e) => updateSliderBackground(e.target)} 
                            />
                            <div>
                                <span style={{ fontSize: '18px' }}>{zoomSensitivity}</span>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};
  


export default SkillControls;