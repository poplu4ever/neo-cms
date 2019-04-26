import React, { Component } from 'react';
import PageTitle            from '../../../component/page-title/index.jsx';
import Pagination           from '../../../util/pagination/index.jsx';
import {Link}               from 'react-router-dom';
import Product              from "../../../service/product-service.jsx";
import Util                 from "../../../util/utils.jsx";
import TableList            from "../../../util/table-list/index.jsx";
import ListSearch           from "./index-list-search.jsx";

import "./index.scss";


const _product  = new Product();
const _mm       = new Util();

class ProductList extends Component{
    constructor(props){
        super(props);
        this.state = {
            list        :[],
            pageNum     :1,
            listType    :'list'
        }
    }

    componentDidMount() {
        console.log("加载数据");
        this.loadProductList();
    }

    //加载商品列表
    loadProductList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        //如果是搜索，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.searchKeyWord = this.state.searchKeyWord;
        }

        _product.getProductList(listParam).then(res => {
            this.setState(res)
            console.log('查看res',res);
            console.log('查看state',this.state);
        },errMsg =>{
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg);
        });
    }


    onSearch(searchType,searchKeyWord){
        let listType = searchKeyWord ===  '' ? 'list':'search';
        this.setState({
            listType      :listType,
            pageNum       :1,
            searchType    :searchType,
            searchKeyWord :searchKeyWord
        }, ()=>{
            this.loadProductList()
        })
    }

    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadUserList();
        })
    }

    //改变商品状态
    onSetProductStatus(e,productId,currentStatus){
        let newStatus   = currentStatus === 1 ? 2 : 1,
            confirmTips = currentStatus === 1 ? "确定下架商品？" : "确定上架该商品？";
        if(window.confirm(confirmTips)){
             _product.setProductStatus({
                 productId:productId,
                 status:newStatus
             }).then(res=>{
                 _mm.successTips(res);
                 this.loadProductList();

             },errMsg=>{
                 _mm.errorTips(errMsg);
             });
        }
    }

    render() {
        let tableHeads = [
            {name:"商品ID",width:'10%'},
            {name:"商品信息",width:'50%'},
            {name:"价格",width:'10%'},
            {name:"状态",width:'15%'},
            {name:"操作",width:'15%'},
        ];

        return(
            <div id="page-wrapper">
                <PageTitle title='商品列表'>
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType,searchKeyWord)=>this.onSearch(searchType,searchKeyWord)}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product,index)=>{
                        return (
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>
                                    <p>{product.name}</p>
                                    <p>{product.subtitle}</p>
                                </td>
                                <td>{product.price}</td>
                                <td>
                                    <p>{product.status === 1? "在售":"已下架"}</p>
                                    <button className="btn btn-xs btn-warning"
                                        onClick={e=>{this.onSetProductStatus(e,product.id,product.status)}}>{product.status === 1? "下架":"上架"}</button>
                                </td>
                                <td>
                                    <Link className="opear" to={`/product/detail/${product.id}`}>详情</Link>
                                    <Link className="opear" to={`/product/save/${product.id}`}>编辑</Link>
                                </td>
                            </tr>
                            )
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total}
                            onChange={pageNumber => this.onPageNumChange(pageNumber)}/>
            </div>
        );
    }
}

export default ProductList;