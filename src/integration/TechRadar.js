import React, { useState } from 'react';
 
export const mockElements = [
  {
    id: 1,
    name: 'Amazon1 Platforms',
    type: 0,
    level: 'Hold',
  },
  {
    id: 2,
    name: 'DataRobot1 Databases',
    type: 2,
    level: 'Hold',
  },
  {
    id: 3,
    name: 'Amazon1 Tools',
    type: 3,
    level: 'Trial',
  },
  {
    id: 4,
    name: 'Amazon2 Platforms',
    type: 0,
    level: 'Trial',
  },
  {
    id: 5,
    name: 'DataRobot2 Databases',
    type: 2,
    level: 'Assess',
  },
  {
    id: 6,
    name: 'Amazon2 Tools',
    type: 3,
    level: 'Assess',
  },
  {
    id: 7,
    name: 'Amazon3 Platforms',
    type: 0,
    level: 'Adopt',
  },
  {
    id: 8,
    name: 'DataRobot3 Databases',
    type: 2,
    level: 'Trial',
  },
  {
    id: 9,
    name: 'Amazon3 Tools',
    type: 3,
    level: 'Trial',
  },
  {
    id: 10,
    name: 'Amazon1 Languages',
    type: 1,
    level: 'Trial',
  },
  {
    id: 11,
    name: 'Amazon2 Languages',
    type: 1,
    level: 'Adopt',
  },
  {
    id: 12,
    name: 'Amazon3 Languages',
    type: 1,
    level: 'Hold',
  },
]; // моканые данные, можешь у себя потестить с ними пока бэк не готов
 
const IntegrationTechRadar = () => {
  const [loading, setLoading] = useState(true);
 
  document
    .getElementById('iframe')
    ?.contentWindow.postMessage({ type: 'setData', data: mockElements }, '*'); // вот тут type: 'setData' не менять
 
  return (
    <>
      {loading ? <div>Loading...</div> : null}
      <iframe
        id="iframe"
        src="http://localhost:5173/share" // тоже не менять
        onLoad={() => setLoading(false)}
        width="1500px"
        height="800px"
      />
    </>
  );
};
 
export default IntegrationTechRadar;