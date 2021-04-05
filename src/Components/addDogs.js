import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react'
// import { Form, Input } from 'antd';
import { Form, Input, Select } from 'antd';

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
    onFinish = (values) => {

        console.log('Received values of form: ', values);
        const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
        fetch('http://localhost:5000/api/dogs', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // TODO: display success message and/or redirect
                console.log(data);
                window.location.assign('/')
                alert("Dogs added")
            })
            .catch(error => {
                // TODO: show nicely formatted error message and clear form
                alert(`Error: error}`);
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Add Dogs
                    </Typography>
                    <Form {...layout} className={classes.form} name="register" onFinish={this.onFinish} scrollToFirstError >
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
                        <Form.Item {...tailLayout} >
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