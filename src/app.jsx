import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from 'react-router-dom';

//Page
import Home             from './page/home/index.jsx';
import Layout           from './component/layout/index.jsx';
import Login            from './page/login/index.jsx';
import Error            from './page/error/index.jsx';
import OrderList        from './page/order/index.jsx';
import OrderDetail      from './page/order/detail.jsx';
import UserList         from './page/userList/index.jsx';
import ProductRouter    from './page/product/router.jsx';


import "font-awesome/css/font-awesome.min.css";


class App extends React.Component{

    render(){

        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/product" component={ProductRouter}/>
                    <Route path="/product-category" component={ProductRouter}/>
                    <Route path="/order/index" component={OrderList}/>
                    <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
                    <Route path="/user/index" component={UserList}/>
                    <Redirect exact from='/user' to="/user/index"/>
                    <Redirect exact from='/order' to="/order/index"/>
                    <Route component={Error}/>
                </Switch>
            </Layout>);


        return(
                <Router>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/' render={ props => LayoutRouter} />
                    </Switch>
                </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')

);