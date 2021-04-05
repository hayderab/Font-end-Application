import React from 'react';
import { Col, Row } from 'antd';
import PostCard from './cardview';
import { Pagination, Table, Button, Space } from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import SearchBar from "./searchbar.js";

class GridView extends React.Component {

  pageSatate = { page: 0 };

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      current:0,
      limit:0
        };
}

  onChange = page => {
    // console.log(page);
    // console.log(this.state.test);
    this.componentDidMount(page);
    this.setState({
      current: page,
      test:page
    });
  };

  componentDidMount(page) {
      this.limit = 3;
      console.log(page);
      // const url = 'http://localhost:5000/api/dogs/?page='+this.page+'&limit=2&type=bulldog&name=luccy&avilable=false'
      const url = `http://localhost:5000/api/dogs/?page=${page}&limit=${this.limit}`
      fetch(url)
      // .then(response => response.status())
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ posts: data })
      })
      .catch(err => console.log("Error fetching articles"));

  }
  render() {
    // console.log(this.state.data.length); 
    if (!this.state.posts.length) {
      return <LoadingOutlined />

    }
    // <Col>
    //       <>
    //       <Space style={{ marginBottom: 16 }}>
    //         <Button onClick={this.setAgeSort}>Sort age</Button>
    //         <Button onClick={this.clearFilters}>Clear filters</Button>
    //         <Button onClick={this.clearAll}>Clear filters and sorters</Button>
    //       </Space>
    //     </>
    //      </Col>

    // the next line does the Array.map() operation on the posts
    // to create an array of React elements to be rendered
    const cardList = this.state.posts.map(post => {
      return (
        <div style={{padding:"10px"}} key={post._id}>
          <Col span={2}>
            <PostCard {...post} />  
          </Col>
          
        </div>
      )
    });
    return (
      // <Row type="flex" justify="space-around">
      //   {cardList}
      //   <Pagination current={this.state.current} onChange={this.onChange} total={30} />
      // </Row>
      <div>
        <Col>
        <>

           <Space style={{ marginBottom: 16 }}>

             <Button onClick={this.setAgeSort}>Sort Date</Button>
             <Button onClick={this.clearFilters}>Clear filters</Button>
             <Button onClick={this.clearAll}>Clear filters and sorters</Button>
             <SearchBar/>

           </Space>
         </>
        </Col>
        <Row type="flex" justify="space-around">
        {cardList}
        </Row>
        <Col>
        <Pagination current={this.state.current} onChange={this.onChange} total={30} />
        </Col>
      </div>
    );
  }
}

export default GridView;
