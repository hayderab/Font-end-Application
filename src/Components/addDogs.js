import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


const onFinish = (values) => {
    console.log('Success:', values); // makesure the name each json object key is the same with backend
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo); // makesure the name each json object key is the same with backend
};

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class AddDogs extends Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }

    state = {
        fileSelected: null
    }

    SelectFile = event => {
        this.setState({
            fileSelected: event.target.files[0]
        });
    }

    // fileUpload = () =>{
    //     console.log(this.state.fileSelected)
    //     const fd = new FormData();
    //     // fd.append("name", values.name)
    //     // fd.append("type", type)
    //     // fd.append("location", location)
    //     // fd.append("avilable", avilable)
    //     // fd.append("imageUrl", imageUrl)
    //     fd.append("imageUrl", this.state.fileSelected, this.state.fileSelected.name);
    //     fetch('http://localhost:5000/api/dogs', {
    //         credentials: 'include',
    //         method: 'POST',
    //         body: fd ,
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             // TODO: display success message and/or redirect
    //             console.log(data);
    //             window.location.assign('/')
    //             alert("Dogs added")
    //         })
    //         .catch(error => {
    //             // TODO: show nicely formatted error message and clear form
    //             alert(`Error: error}`);
    //         });

    // }
    // imageprops = {
    //     name: 'file',
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     headers: {
    //       authorization: 'authorization-text',
    //     },
    //     onChange(info) {
    //       if (info.file.status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //       }
    //       if (info.file.status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully`);
    //       } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //       }
    //     },
    //   };
    
    onFinish = (values) => {
        const fd = new FormData();
        console.log('Received values of form: ', values);
        fd.append("name", values.name)
        fd.append("type", values.type)
        fd.append("location", values.location)
        fd.append("avilable", values.avilable)
        fd.append("imageUrl", this.state.fileSelected)
        console.log(fd)
        const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
        // fd.append("imageUrl", this.state.fileSelected, this.state.fileSelected.name);
        fetch('http://localhost:5000/api/dogs',{
            credentials: 'include',
            method: 'POST',
            body: fd
        })
        .then(response => response.json())
        .then(data => {
                // TODO: display success message and/or redirect
                if(data.status== 403){
                    alert("errr")
                }
                console.log(data);
                window.location.assign('/')
                alert("Dogs added")
            })
            .catch(error => {
                // TODO: show nicely formatted error message and clear form
                alert(`Error: error}`);
            });
    };

    // onFinish = (values) => {
    //     const fd = new FormData();
    //     console.log('Received values of form: ', values);
    //     // console.log(fd)
    //     const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    //     fd.append("imageUrl", this.state.fileSelected, this.state.fileSelected.name);
    //     fetch('http://localhost:5000/api/dogs',{
    //         credentials: 'include',
    //         method: 'POST',
    //         // 
    //         body: fd, 
    //         body: JSON.stringify(data),
    //         // body: data, fd,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }).then(response => response.json())
    //         .then(data => {
    //             // TODO: display success message and/or redirect
    //             if(data.status== 403){
    //                 alert("errr")
    //             }
    //             console.log(data);
    //             window.location.assign('/')
    //             alert("Dogs added")
    //         })
    //         .catch(error => {
    //             // TODO: show nicely formatted error message and clear form
    //             alert(`Error: error}`);
    //         });
    // };
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Add Dogs
                    </Typography>
                    <Form {...layout} className={classes.form} name="register" onFinish={this.onFinish} scrollToFirstError encType="multipart/form-data">
                        <Form.Item name="name" label="Name"  >
                            <Input />
                        </Form.Item>
                        <Form.Item name="type" label="Type"  >
                            <Input />
                        </Form.Item>
                        <Form.Item name="location" label="Location">
                            <Input />
                        </Form.Item>
                        <Form.Item name="avilable" label="Select">
                            <Select>
                                <Select.Option value="true">True</Select.Option>
                                <Select.Option value="false">False</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item >
                            <input
                            type="file" 
                            fileName="imgeUrl" 
                            onChange={this.SelectFile} 
                            className="form-control-file"
                             />
                            {/* <Button onClick={this.fileUpload}>test</Button> */}
                        </Form.Item>
                        <Form.Item {...tailLayout} >
                            {/* <Upload {...this.imageprops} {...tailLayout}>
                                <Button icon={<UploadOutlined/>}>Click to Upload Image</Button>
                            </Upload> */}
                            <Button type="primary" fullWidth variant="contained" htmlType="submit" color="Black" className={classes.submit}>
                                Add Dog
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </Container>
        );
    }
}
export default withStyles(useStyles)(AddDogs);