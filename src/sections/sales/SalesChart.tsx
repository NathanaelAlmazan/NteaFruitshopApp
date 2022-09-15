import PropTypes from 'prop-types';
import React from 'react';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts"
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { BaseOptionChart } from '../../components/charts';

// ----------------------------------------------------------------------

SalesChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

interface ChartData {
    name: string,
    type: string,
    fill: string,
    data: number[],
  }

interface SalesChartProps { title: string, subheader: string, chartLabels: string[], chartData: ChartData[] }

export default function SalesChart({ title, subheader, chartLabels, chartData, ...other }: SalesChartProps) {
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return `₱ ${y.toFixed(2)}`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions as unknown as ApexOptions} height={364} />
      </Box>
    </Card>
  );
}