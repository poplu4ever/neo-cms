import React, { Component } from 'react';
import PageTitle            from '../../../component/page-title/index.jsx';
import {Link}               from 'react-router-dom';
import Product                 from "../../../service/product-service.jsx";
import Util                 from "../../../util/utils.jsx";
import TableList            from "../../../util/table-list/index.jsx";



const _product = new Product();
const _mm = new Util();

class CategoryList extends Component{
    constructor(props){
        super(props);
        this.state = {
            list                :[],
            parentCategoryId    :this.props.match.params.categoryId || 0
        }
    }

    componentDidMount() {
        this.loadCategoryList();
    }

    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId   = this.props.match.params.categoryId;

        if(oldPath !== newPath){
            this.setState({
                parentCategoryId : newId
            },()=>{
                this.loadCategoryList();
            })
        }
    }

    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list : res
            },()=>{
                this.setState({
                    firstLoading:false
                })
            });
        },errMsg =>{
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg);
        });
    }

    onUpdateName(categoryId,categoryName){
        let newName = window.prompt('请输入新的品类名称',categoryName);
        if(newName){
            _product.updateCategoryName({
                categoryId : categoryId,
                categoryName : newName
            }).then(res => {
                _mm.successTips(res);
                this.loadCategoryList();
            },errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }

    render() {
        console.log('检查',this.state.list);

        let listBody = this.state.list.map((category,index)=>{
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className='opera'
                            onClick={ e => this.onUpdateName(category.id,category.name)}>修改名称</a>
                        {
                            category.parentId === 0 ?
                                <Link to={`/product-category/index/${category.id}`}
                                > 查看子品类</Link> :null
                        }
                    </td>
                </tr>
            )
        });

        let listError = (
            <tr>
                <td colSpan="5" className="text-center">
                    { this.state.firstLoading ? "正在加载数据..." :"没有找到结果" }
                </td>
            </tr>
        );

        return(
            <div id="page-wrapper">
                <PageTitle title='品类列表'>
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className='row'>
                    <div className='col-md-12'>
                        <p>父品类:{this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={['品类ID','品类名称','操作']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}

export default CategoryList;