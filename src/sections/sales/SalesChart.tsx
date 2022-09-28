import PropTypes from 'prop-types';
import React from 'react';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts"
// @mui
import { Card, CardHeader, Box, Stack, IconButton, Typography } from '@mui/material';
// components
import { BaseOptionChart } from '../../components/charts';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

interface SalesChartProps { 
  title: string, 
  subheader: string, 
  chartLabels: string[], 
  chartData: ChartData[],
  page: number,
  contentLength: number,
  onSeek: () => void,
  onBack: () => void,
  inventory?: string
}

export default function SalesChart({ title, subheader, chartLabels, chartData, page, contentLength, inventory, onSeek, onBack, ...other }: SalesChartProps) {

  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '25%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return inventory ? `${y} ${inventory}` : `₱ ${y.toFixed(2)}`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader}
        action={
          <Stack direction="row" alignItems="center">
            <IconButton disabled={page === 0} onClick={onBack}>
              <ArrowBackIosIcon />
            </IconButton>
            {inventory && (
              <Typography variant="subtitle1">{`Units in (${inventory})`}</Typography>
            )}
            <IconButton disabled={Boolean(!inventory && (page + 7) === contentLength) || Boolean(inventory && page === contentLength)} onClick={onSeek}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Stack>
        }
      />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions as unknown as ApexOptions} height={364} />
      </Box>
    </Card>
  );
}