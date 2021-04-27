import React from 'react'; 
import 'antd/dist/antd.css';
import { Layout} from 'antd';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

// import DynamicGridLayout from "./egridlayout";
import GridView from "./gridView";


const {Footer } = Layout;



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
      <Footer style={{ textAlign: 'center' }}> ©2021 Created by Coventry student</Footer>
    </Layout>
    </div>

    
  );
}

export default home;
// export it to use it anywere else.