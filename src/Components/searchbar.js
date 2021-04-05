import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    float:"right",
    background:"#f1f2f5"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
      width:"30px",
    }}
  />
);
export default function SearchAppBar() {
  const classes = useStyles();
  const onSearch = value => console.log(value);

  return (
    <div className={classes.root}>
      <AppBar position="static">
       
 
      </AppBar>

      <Toolbar>
      {/* <Typography className={classes.title} variant="h6" noWrap>
           Dogs Sanctuary
          </Typography> */}
        <Space direction="vertical" float="right">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
         </Space>
        </Toolbar>


    </div>

  );
}