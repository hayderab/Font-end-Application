import React from 'react'; 
import PostCard from './cardview';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { PageHeader } from 'antd';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Layout, Menu, Breadcrumb } from 'antd';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

// import DynamicGridLayout from "./egridlayout";
import GridView from "./gridView";

import SearchBar from "./searchbar";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;


// Stacture of the component.
const home =  () => {
  
  // {      fetch('http://localhost:5000/api/dogs/')
  //         .then(response => response.json())
  //         .then(data => console.log(data))
  //         .catch( err => "failed")
  // }
  return (
    <div className="App">
      <header className="App-header">
        {/* <Bar /> */}
        {/* {PostCard} */}
       
      </header>
      <Layout className="layout">
      <React.Fragment    >
      {/* <SearchBar/> */}

          <CssBaseline />
            <Container maxWidth="fixed">
            <GridView />

              {/* {<DynamicGridLayout/>} */}
          </Container >
      </React.Fragment>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
    </div>

    
  );
}

export default home;
// export it to use it anywere else.