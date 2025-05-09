import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({ departmentCounts }) {
  const pieData = [
    { id: 0, value: departmentCounts["BCA"], label: 'BCA' },
    { id: 1, value: departmentCounts["Bsc. CSIT"], label: 'Bsc. CSIT' },
    { id: 2, value: departmentCounts["Other"], label: 'OTHER' },
  ];

  return (
    <PieChart
      series={[{ data: pieData }]}
      width={400}
      height={300}
    />
  );
}
