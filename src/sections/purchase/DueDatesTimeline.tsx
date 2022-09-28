// @mui
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';

// ----------------------------------------------------------------------

DueDateTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export type TimelineColor = "inherit" | "grey" | "secondary" | "primary" | "error" | "info" | "success" | "warning"

interface TimelineItems {
    time: Date,
    title: string,
    type: TimelineColor,
    amount: number
}

interface TimelineProps {
    title: string,
    subheader: string
    list: TimelineItems[]
}

export default function DueDateTimeline({ title, subheader, list, ...other }: TimelineProps) {
  return (
    <Card {...other} sx={{ height: 450 }}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
          maxHeight: 420,
          overflowY: 'auto'
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <OrderItem key={item.title} item={item} isLast={index === list.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};

interface OrderItemProps {
    item: TimelineItems
    isLast: boolean
}

function OrderItem({ item, isLast }: OrderItemProps) {
  const { type, title, time, amount } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={type} />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {`${new Date(time).toLocaleDateString()} | ₱ ${amount.toFixed(2)}`}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
