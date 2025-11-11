import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// icons
import { DownOutlined, UpOutlined } from '@ant-design/icons';

// project import
import NavItem from './NavItem';
import { useGetMenuMaster } from 'api/menu';

// ==============================|| NAVIGATION - COLLAPSE ITEM ||============================== //

export default function NavCollapse({ item, level = 0 }) {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon
      style={{
        fontSize: drawerOpen ? '1rem' : '1.25rem'
      }}
    />
  ) : (
    false
  );

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return <NavCollapse key={menuItem.id} item={menuItem} level={level + 1} />;
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={level + 1} />;
      default:
        return false;
    }
  });

  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={(theme) => ({
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 0 ? 1.25 : 1,
          ...(drawerOpen && {
            '&:hover': { bgcolor: 'primary.lighter' },
            '&.Mui-selected': {
              bgcolor: 'primary.lighter',
              borderRight: '2px solid',
              borderColor: 'primary.main',
              color: iconSelectedColor,
              '&:hover': { color: iconSelectedColor, bgcolor: 'primary.lighter' }
            }
          })
        })}
      >
        {itemIcon && (
          <ListItemIcon
            sx={(theme) => ({
              minWidth: 28,
              color: textColor
            })}
          >
            {itemIcon}
          </ListItemIcon>
        )}
        {drawerOpen && (
          <>
            <ListItemText
              primary={item.title}
              secondary={item.caption}
              sx={{
                '& .MuiListItemText-secondary': {
                  mt: 0.5
                }
              }}
            />
            {open ? <UpOutlined style={{ marginLeft: 8, fontSize: '0.875rem' }} /> : <DownOutlined style={{ marginLeft: 8, fontSize: '0.875rem' }} />}
          </>
        )}
      </ListItemButton>
      {drawerOpen && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ py: 0 }}>
            {navCollapse}
          </List>
        </Collapse>
      )}
    </>
  );
}

NavCollapse.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};
