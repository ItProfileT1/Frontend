import React, { useState } from 'react';
import './SkillMap.css';
import SkillContainer from './SkillContainer';
import SkillControls from './SkillControls';

const SkillMap = ({initialSkillsData, onSkillSelect, isEdit}) => {
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

    const [moveSensitivity, setMoveSensitivity] = useState(0.5); 
    const [zoomSensitivity, setZoomSensitivity] = useState(0.1); 

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setLastMousePosition({ x: event.clientX, y: event.clientY }); 
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;

        const dx = (event.clientX - lastMousePosition.x) * moveSensitivity; 
        const dy = (event.clientY - lastMousePosition.y) * moveSensitivity; 

        setTranslate((prev) => ({
            x: prev.x + dx,
            y: prev.y + dy,
        }));

        setLastMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false); 
    };

    const handleWheel = (event) => {
        if (event.altKey) { 
            event.preventDefault(); 
          
            if (event.deltaY < 0) {
                setScale((prevScale) => prevScale + zoomSensitivity);
            } else {
                setScale((prevScale) => Math.max(prevScale - zoomSensitivity, 0.1)); 
            }
        }
    };

    return (
        <div className="skill-map">
            <div 
                className="view-port" 
                onMouseDown={handleMouseDown} 
                onMouseMove={handleMouseMove} 
                onMouseUp={handleMouseUp} 
                onMouseLeave={handleMouseUp} 
                onWheel={handleWheel}
            >
                <div 
                    className="large-area" 
                    style={{ 
                        transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`, 
                        cursor: isDragging ? 'grabbing' : 'grab' 
                    }}
                >
                    <SkillContainer skillsData={initialSkillsData} onSkillSelect={onSkillSelect} isEdit={isEdit} />
                </div>
            </div>

            <SkillControls 
                moveSensitivity={moveSensitivity} 
                zoomSensitivity={zoomSensitivity} 
                setMoveSensitivity={setMoveSensitivity} 
                setZoomSensitivity={setZoomSensitivity}
            />
        </div>
    );
};

export default SkillMap;