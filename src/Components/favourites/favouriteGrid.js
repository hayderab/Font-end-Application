import React from 'react';
// import { Col, Row ,Space} from 'antd';
import FavCard from './favCard';
import {Space, Col, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';




class FavGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      current: 0,
      limit: 0,
      serchValue: "",
      prevPage:1,
      prevValue:"",
      avilable:true,
      filteredInfo: null,
      sortedInfo: null,
    };

  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  onSearch = value => {
    this.componentDidMount(value, this.state.prevPage)
    this.setState({
        prevValue:value,
    });

  };
  onChange = page => {
    this.componentDidMount(this.state.prevValue, page)

    this.setState({
      current: page,
      prevPage: page
    });
  };
  clearFilters = () => {
    this.setState({ avilable: "true" });
    this.componentDidMount();
  };
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };
  checkIfAvilable = () => {
    // console.log(this.state.avilable)

    this.componentDidMount(this.state.prevValue, this.state.prevPage, this.state.avilable);

    this.setState({
      avilable: "false"
    });
  };
  componentDidMount() {
    this.limit = 4;
    // console.log(this.state.cookie)
    const url = `http://localhost:5000/api/users/getfav`
    fetch(url, {credentials:"include"})
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
    // the next line does the Array.map() operation on the posts
    // to create an array of React elements to be rendered
    const cardList = this.state.posts
    .map(post => {
      return (
        <div style={{ padding: "10px" }} key={post._id}>
          <Col span={2}>
            <FavCard {...post} />
          </Col>
        </div>
      )
    });
    return (
      <div>
        <Col>
          <>
            <Space style={{ marginBottom: 16 }}>
            <h1 float="center">Favourites</h1>
            </Space>
          </>
        </Col>
        <Row type="flex" justify="space-around">
          {cardList}
        </Row>
      </div>
    );
  }
}

export default FavGrid;
