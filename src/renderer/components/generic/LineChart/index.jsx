import { useState, useEffect, useRef } from 'react';
import { Warning } from '@phosphor-icons/react';
import styles from './styles.module.css';

const LineChart = ({ data, height = 400, xKey, yKey, yUnits = '', labels }) => {
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

  const margin = { top: 16, right: 16, bottom: 32, left: 32 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xValues = data.map((d) => d[xKey]);
  const yValues = data.map((d) => d[yKey]);

  // const xMin = Math.min(...xValues);
  // const xMax = Math.max(...xValues);
  const yMin = 0;
  const yMax = Math.max(...yValues) * 1.5;

  const xScale = (d) => (data.findIndex((p) => p[xKey] === d) / (data.length - 1)) * innerWidth;
  const yScale = (d) => innerHeight - ((d - yMin) / (yMax - yMin)) * innerHeight;

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(d[xKey])},${yScale(d[yKey])}`).join(' ');

  const areaPath = `${data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(d[xKey])},${yScale(d[yKey])}`)
    .join(' ')} L${xScale(xValues[xValues.length - 1])},${innerHeight} L${xScale(xValues[0])},${innerHeight} Z`;

  const handleMouseMove = (event) => {
    const svgRect = event.currentTarget.getBoundingClientRect();
    const svgX = event.clientX - svgRect.left - margin.left;
    // const svgY = event.clientY - svgRect.top - margin.top;
    const closestIndex = xValues.reduce(
      (prev, curr, index) => (Math.abs(xScale(curr) - svgX) < Math.abs(xScale(xValues[prev]) - svgX) ? index : prev),
      0
    );
    setTooltip({
      display: true,
      x: xScale(xValues[closestIndex]),
      y: yScale(yValues[closestIndex]),
      value: data[closestIndex],
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ display: false, x: 0, y: 0, value: null });
  };

  const getXAxisLabels = () => {
    const labelCount = labels || width / 70; // if no. of labels is specified use it, else calculate based on width
    const step = Math.ceil(xValues.length / labelCount);
    return xValues.filter((_, index) => index % step === 0);
  };

  if (data.length === 0) {
    return (
      <div className={styles.error}>
        <Warning size={24} /> &nbsp;No data to render
      </div>
    );
  }

  try {
    return (
      <div className={styles.lineChart} ref={containerRef}>
        <svg
          width={width}
          height={height}
          className={styles.lineChart__chart}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--background-brand)" stopOpacity={0.3} />
              <stop offset="90%" stopColor="var(--background-brand)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {/* X Axis */}
            {/* <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="black" /> */}
            {getXAxisLabels().map((value, index) => (
              <text
                key={index}
                x={xScale(value)}
                y={innerHeight + 15}
                textAnchor="middle"
                className={styles.lineChart__xKey}
              >
                {value}
              </text>
            ))}

            {/* Y Axis (Optional) */}
            {/*
            <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="black" />
            {[yMin, yMax].map((value, index) => (
              <text key={index} x={-10} y={yScale(value)} dy=".35em" textAnchor="end" className={lineChart__y-key">
                {value}
              </text>
            ))}
          */}

            {/* Gradient Area Path */}
            <path d={areaPath} fill="url(#gradient)" />

            {/* Line Path */}
            <path d={linePath} className={styles.lineChart__path} />

            {/* Tooltip */}
            {tooltip.display && (
              <>
                <line
                  x1={tooltip.x}
                  y1={0}
                  x2={tooltip.x}
                  y2={innerHeight}
                  stroke="var(--border-input)"
                  strokeDasharray="5, 5"
                />
                <circle cx={tooltip.x} cy={tooltip.y} r={5} className={styles.lineChart__tooltipCircle} />
              </>
            )}
          </g>
        </svg>

        {tooltip.display && (
          <div
            className={styles.lineChart__tooltip}
            style={{
              left: `${tooltip.x + margin.left}px`,
              top: `${tooltip.y + margin.top - 48}px`,
            }}
            data-testid="tooltip"
          >
            <div
              data-testid="tooltipKey"
            >
              <strong>{xKey}:</strong> {tooltip.value[xKey]}
            </div>
            <div
            data-testid="tooltipValue"
            >
              <strong>{yKey}:</strong> {tooltip.value[yKey]}
              {yUnits}
            </div>
          </div>
        )}
      </div>
    );
  } catch (e) {
    return (
      <div className={styles.error}>
        <Warning size={24} /> &nbsp;No data to render
      </div>
    );
  }
};

export default LineChart;
