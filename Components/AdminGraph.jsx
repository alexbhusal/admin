import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export default function CustomGauge({ totalStudents ,presentCount}) {
  return (
    <Gauge
      value={presentCount} 
      valueMax={totalStudents} 
      startAngle={-110}
      endAngle={110}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          transform: 'translate(0px, 0px)',
        },
      }}
      text={({ value, valueMax }) => `${value} / ${valueMax}`}
      width={400}
      height={300}
    />
  );
}
