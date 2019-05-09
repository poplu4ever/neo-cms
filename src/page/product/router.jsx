import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from 'react-router-dom';

import "font-awesome/css/font-awesome.min.css";

import ProductList from '../product/index/index.jsx';
import ProductSave from "../product/index/save.jsx";
import ProductDetail from "../product/index/detail.jsx";
import CategoryList from "./category/index.jsx";
import CategoryAdd from "./category/add.jsx";


class ProductRouter extends React.Component{

    render(){
        return(
            <Switch>
                <Route path='/product/index' component={ProductList}/>
                <Route path='/product/save/:pid?' component={ProductSave}/>
                <Route path='/product/detail/:pid' component={ProductDetail}/>
                <Route path='/product-category/index/:categoryId?' component={CategoryList}/>
                <Route path='/product-category/add' component={CategoryAdd}/>


                <Redirect exact from='/product' to="/product/index" />
                <Redirect exact from='/product-category' to="/product-category/index" />

            </Switch>
        )
    }
}

export default ProductRouter;