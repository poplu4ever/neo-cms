import React, { Component } from 'react';
import PageTitle from '../../component/page-title/index.jsx';
import './index.css';

class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id='page-wrapper'>
                <PageTitle title='首页'/>
                <button className='btn btn-default'>Test App</button>
            </div>
        )
    }
}


export default Home;