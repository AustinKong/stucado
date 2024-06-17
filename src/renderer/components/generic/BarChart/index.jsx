import { useState, useEffect, useRef } from 'react';

import styles from './styles.module.css';

const BarChart = ({ data, height = 400, xKey, yKey }) => {
  const [tooltip, setTooltip] = useState({ display: false, x: 0, y: 0, value: null });
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // const xValues = data.map((d) => d[xKey]);
  const yValues = data.map((d) => d[yKey]);

  const xScale = (index) => (index / data.length) * innerWidth;
  const yMax = Math.max(...yValues);
  const yScale = (d) => innerHeight - (d / yMax) * innerHeight;

  const barWidth = innerWidth / data.length - 10;

  const handleMouseMove = (_, index) => {
    const svgX = xScale(index) + barWidth / 2 + margin.left;
    const svgY = yScale(data[index][yKey]) + margin.top;
    setTooltip({
      display: true,
      x: svgX,
      y: svgY,
      value: data[index],
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ display: false, x: 0, y: 0, value: null });
  };

  const getXAxisLabels = () => {
    const labelCount = 10; // Maximum number of labels to display
    const step = Math.ceil(data.length / labelCount);
    return data.filter((_, index) => index % step === 0);
  };

  return (
    <div className={styles.barChart} ref={containerRef}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className={styles.barChart__chart}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* X Axis */}
          <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="black" />
          {getXAxisLabels().map((d, index) => (
            <text key={index} x={xScale(data.indexOf(d)) + barWidth / 2} y={innerHeight + 20} textAnchor="middle">
              {d[xKey]}
            </text>
          ))}

          {/* Y Axis */}
          <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="black" />
          {[0, yMax / 2, yMax].map((value, index) => (
            <text key={index} x={-10} y={yScale(value)} dy=".35em" textAnchor="end">
              {value}
            </text>
          ))}

          {/* Bars */}
          {data.map((d, index) => (
            <rect
              key={index}
              x={xScale(index)}
              y={yScale(d[yKey])}
              width={barWidth}
              height={innerHeight - yScale(d[yKey])}
              fill="blue"
              onMouseMove={(event) => handleMouseMove(event, index)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </g>
      </svg>
      {tooltip.display && (
        <div
          className={styles.barChart__tooltip}
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 40}px`,
          }}
        >
          <div>
            <strong>{xKey}:</strong> {tooltip.value[xKey]}
          </div>
          <div>
            <strong>{yKey}:</strong> {tooltip.value[yKey]}
          </div>
        </div>
      )}
    </div>
  );
};

export default BarChart;
