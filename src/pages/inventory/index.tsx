import React, { useState } from 'react'
// mui
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import AppBar from "@mui/material/AppBar"
import Card from "@mui/material/Card"
import { styled, useTheme } from '@mui/material/styles';
// project components
import { Header } from "../../components/PageHeaders"
import ItemTab from "../../sections/inventory/ItemTab"

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Card sx={{ borderTopLeftRadius: 0 }}>{children}</Card>
      )}
    </div>
  );
}

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});


interface StyledTabProps {
  label: string;
}

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    width: 150,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: "#FFFFF"
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }),
);


export default function InventoryPage() {
  const theme = useTheme();
  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue)
  
  return (
    <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Header title="Inventory" />
        <Box sx={{ width: 500 }}>
          <AppBar 
            position="static" 
            sx={{ 
                bgcolor: 'background.paper', 
                pt: 1,
                borderTopLeftRadius: Number(theme.shape.borderRadius) * 2 
              }}
            >
            <AntTabs value={value} onChange={handleChange} aria-label="ant example">
              <AntTab label="Items" />
              <AntTab label="Purchased" />
              <AntTab label="Reports" />
            </AntTabs>
          </AppBar>
        </Box>
        <TabPanel value={value} index={0}>
          <ItemTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
    </Container>
  )
}

export interface InventoryItem {
  itemId: number
  itemName: string
  brandName: string
  units: string
  inStock: number
  unitPrice: number
  lastUpdated: Date
}