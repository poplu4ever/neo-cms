import React, { Component } from 'react';
import PageTitle            from '../../component/page-title/index.jsx';
import {Link}               from 'react-router-dom';

class Error extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div id="page-wrapper">
                <PageTitle title='出错啦'/>
                <div className='row'>
                    <div className='col-md-12'>
                        找不到该路径
                        <Link to="/">返回首页</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;