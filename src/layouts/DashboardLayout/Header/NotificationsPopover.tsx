import { sub } from 'date-fns';
import { noCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, ReactNode } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  useTheme
} from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import { useQuery, useAppSelector, useAppDispatch } from '../../../custom-hooks'
import { addNotification } from "../../../redux/slice/search"
import { DuePurchaseOrders } from '../../../pages/purchase';
import { InventoryItem } from '../../../pages/inventory';
// Icons
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ReceiptIcon from '@mui/icons-material/Receipt';

interface Notifications {
    id: number;
    title: string;
    description: string;
    avatar: string;
    type: string;
    createdAt: Date;
    isUnRead: boolean;
}


export default function NotificationsPopover() {
  const theme = useTheme();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { search } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const [purchaseNotif, setPurchaseNotif] = useState<Notifications[]>([])
  const [inventoryNotif, setInventoryNotif] = useState<Notifications[]>([])
  const [totalUnread, setTotalUnread] = useState<number>(0)
  const { data: unpaidPurchases } = useQuery<DuePurchaseOrders[]>("/purchase/unpaid")
  const { data: inventory } = useQuery<InventoryItem[]>("/ingredients")

  React.useEffect(() => {
      if (unpaidPurchases) {
        const criticalDueDate: Notifications[] = []

        unpaidPurchases.forEach(purchase => {
          const today = new Date().getTime()
          const due = new Date(purchase.dueDate).getTime()
          const diff = Math.floor((due - today)/(24*3600*1000))

          if (diff < 7) {
            const purchaseUid = `${Array(5 - purchase.purchaseOrder.purchaseId.toFixed(0).length).fill(0).map(() => "0").join("")}${purchase.purchaseOrder.purchaseId}`

            criticalDueDate.push({
              id: criticalDueDate.length,
              title: `Order #${purchaseUid} from ${purchase.purchaseOrder.supplier}`,
              description: 'Your have less than 7 days before the due date',
              avatar: null,
              type: 'unpaid_order',
              createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
              isUnRead: !search.notification.includes(`Order #${purchaseUid} from ${purchase.purchaseOrder.supplier}`),
            })
          }
        })

        setPurchaseNotif(criticalDueDate)
      }
  }, [unpaidPurchases, search])

  React.useEffect(() => {
    if (inventory) {
      const criticalSupply: Notifications[] = []

      inventory.forEach(item => {
        if (item.inStock <= 5) {
          criticalSupply.push({
            id: criticalSupply.length,
            title: `Item ${item.itemName} is in critical level`,
            description: `You have only ${item.inStock} in stock.`,
            avatar: null,
            type: 'critical_stock',
            createdAt: sub(new Date(), { days: 1, hours: 8, minutes: 10 }),
            isUnRead: !search.notification.includes(`Item ${item.itemName} is in critical level`),
          })
        }
      })

      setInventoryNotif(criticalSupply)
    }
  }, [inventory, search])

  React.useEffect(() => {
    const notifs = inventoryNotif.concat(purchaseNotif)
    setTotalUnread(notifs.filter(n => n.isUnRead).length)
  }, [purchaseNotif, inventoryNotif])

  const [open, setOpen] = useState(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
   const readInventory = inventoryNotif.map(n => n.title)
   const readPurchase = purchaseNotif.map(p => p.title)
   dispatch(addNotification(readPurchase.concat(readInventory)))
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        color="inherit"
        sx={{
          borderRadius: '8px',
          width: '34px',
          height: '34px',
          fontSize: '1.2rem',
          transition: 'all .2s ease-in-out',
          background: theme.palette.secondary.light,
          color: theme.palette.secondary.dark,
          '&[aria-controls="menu-list-grow"],&:hover': {
              background: theme.palette.secondary.dark,
              color: theme.palette.secondary.light
          }
        }}
      >
        <Badge badgeContent={totalUnread} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnread} unread messages
            </Typography>
          </Box>

          {totalUnread > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          {purchaseNotif.length > 0 && (
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Due Dates
                </ListSubheader>
              }
            >
              {purchaseNotif.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </List>
          )}

          {inventoryNotif.length > 0 && (
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Out of Stock
                </ListSubheader>
              }
            >
              {inventoryNotif.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </List>
          )}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

interface Notification {
  createdAt: Date,
  id: number,
  isUnRead: boolean,
  title: string,
  description: string,
  type: string,
  avatar: string | ReactNode,
}

function NotificationItem({ notification }: { notification: Notification}) {
  const navigate = useNavigate()
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      onClick={() => navigate(notification.type === "critical_stock" ? "/admin/inventory" : "/admin/purchase")}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {new Date(notification.createdAt).toLocaleString()}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification: Notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'critical_stock') {
    return {
      avatar: <AllInboxIcon color="primary" />,
      title,
    };
  }
  if (notification.type === 'unpaid_order') {
    return {
      avatar: <ReceiptIcon  color="primary" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar as string} /> : null,
    title,
  };
}
