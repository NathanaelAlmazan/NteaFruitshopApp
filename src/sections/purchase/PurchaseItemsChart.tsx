import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
// components
import { BaseOptionChart } from '../../components/charts';
import { ApexOptions } from 'apexcharts';

// ----------------------------------------------------------------------

PurchaseItemsStats.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

interface Props {
  title: string,
  subheader: string,
  chartData: { label: string, value: number }[]
}

export default function PurchaseItemsStats({ title, subheader, chartData, ...other }: Props) {
  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName: string) => seriesName,
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions as unknown as ApexOptions} height={364} />
      </Box>
    </Card>
  );
}
