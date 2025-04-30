import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'BCA' },
            { id: 1, value: 12, label: 'Bsc. CSIT' },
            { id: 2, value: 2, label: 'OTHER' },
          ],
        },
      ]}
      width={400}
      height={300}
    />
  );
}
