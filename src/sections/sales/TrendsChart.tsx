import PropTypes from 'prop-types';
import React from 'react';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts"
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// components
import { BaseOptionChart } from '../../components/charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

TrendsChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

interface TrendsChartProps { 
  title: string, 
  subheader?: string, 
  chartColors: string[], 
  chartData: { label: string, value: number }[] 
  productNames: { code: string, name: string }[] 
}

export default function TrendsChart({ title, subheader, chartColors, chartData, productNames, ...other }: TrendsChartProps) {
  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = merge(BaseOptionChart(), {
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName: string) => `${seriesName} sold`,
        title: {
          formatter: (seriesName: string) => `${productNames.find(p => p.code === seriesName).name}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={chartSeries} options={chartOptions as unknown as ApexOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}