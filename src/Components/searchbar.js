import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {withStyles } from '@material-ui/core/styles';

import { Input, Space } from 'antd';
const { Search } = Input;
const useStyles = (theme) => ({
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
});

class SearchBar extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
         value:0
        };
    }
    
  onSearch = value => {
    console.log(value);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static"> 
        </AppBar>
        <Toolbar>
          <Space direction="vertical" float="right">
          <Search placeholder="input search text" allowClear enterButton="Search" size="large"onSearch={this.onSearch}
          />
           </Space>
          </Toolbar>
      </div>
  
    );
    
  }
  
}

export default withStyles(useStyles)(SearchBar);
