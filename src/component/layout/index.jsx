import React,{Component} from 'react';
import './theme.css';
import SideNav from '../nav-side/index.jsx';
import TopNav from '../nav-top/index.jsx';

class Layout extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div id='wrapper'>
                <TopNav />
                <SideNav />
                {this.props.children}
            </div>
        )
    }
}

export default Layout;