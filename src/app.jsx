import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from 'react-router-dom';



//Page
import Home from './page/home/index.jsx';
import Layout from './component/layout/index.jsx';
import "font-awesome/css/font-awesome.min.css";


class App extends React.Component{
    render(){
        return(
                <Router>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/product" component={Home}/>
                            <Route path="/product-category" component={Home}/>
                            <Route path="/order" component={Home}/>
                            <Route path="/user" component={Home}/>
                            {/*<Redirect from = "*" to = "/"/>*/}
                        </Switch>
                    </Layout>
                </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')

);