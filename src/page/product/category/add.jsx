import React, { Component } from 'react';
import PageTitle            from '../../../component/page-title/index.jsx';
import Product                 from "../../../service/product-service.jsx";
import Util                 from "../../../util/utils.jsx";


const _product = new Product();
const _mm = new Util();

class CategoryAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            categoryList                :[],
            parentId                    : 0,
            categoryName                :''
        }
    }

    componentDidMount() {
        this.loadCategoryList();
    }

    loadCategoryList(){
        _product.getCategoryList().then(res => {
            this.setState({
                categoryList : res
            },()=>{
                this.setState({
                    firstLoading:false
                })
            });
        },errMsg =>{
            _mm.errorTips(errMsg);
        });
    }

    onValueChange(e){
        let name = e.target.name,
            value= e.target.value.trim();
        this.setState({
            [name]:value
        })
    }

    onSubmit(e){
        let categoryName = this.state.categoryName.trim();
        if(categoryName){
            _product.saveCategory({
                parentId        :this.state.parentId,
                categoryName    :this.state.categoryName
            }).then(res=>{
                _mm.successTips(res);
                this.props.history.push('/product-category/index')
            },errMsg=>{
               _mm.errorTips(errMsg);
            })
        }else{
            _mm.errorTips('请输入品类名称');
        }
    }

    render() {

        return(
            <div id="page-wrapper">
                <PageTitle title='品类列表'/>
                <div className='row'>
                    <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属品类</label>
                        <div className="col-md-5">
                            <select name="parentId"
                                    className='form-control'
                                    onChange = {e => this.onValueChange(e)}>
                                <option value='0'>根品类/</option>
                                {
                                    this.state.categoryList.map((category,index)=>{
                                        return <option value={category.id} key={index}>根品类/{category.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">品类名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入品类名称"
                                   name='categoryName'
                                   value={this.state.categoryName}
                                   onChange={e => this.onValueChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary"
                                    onClick={e=>{this.onSubmit(e)}}
                            >提交</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryAdd;