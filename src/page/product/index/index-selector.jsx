import React from 'react';

import './category-selector.scss';
import Product              from "../../../service/product-service.jsx";
import Util                 from "../../../util/utils.jsx";

const _product  = new Product();
const _mm       = new Util();

class CategorySelector extends React.Component{
    constructor(props){
        super(props)
        this.state={
            firstCategoryList   : [],
            firstCategoryId     :  0,
            secondCategoryList  : [],
            secondCategoryId    :  0
        }
    }

    componentDidMount() {
        console.log('加载一级分类');
        this.loadFirstCategory();
    }


    componentWillReceiveProps(nextProps) {
        let categoryIdChange        = this.props.categoryId       !== nextProps.categoryId,
            parentCategoryIdChange  = this.props.parentCategoryId !== nextProps.parentCategoryId;
        //判断传入的品类是否有变化
        if(!categoryIdChange && !parentCategoryIdChange){
            return;
        }
        //只有一级品类
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId :nextProps.categoryId,
                secondCategoryId:0
            })
        }
        //有两级品类
        else{
            this.setState({
                firstCategoryId :nextProps.parentCategoryId,
                secondCategoryId:nextProps.categoryId
            },()=>{
                parentCategoryIdChange && this.loadSecondCategory();
            })
        }
    }

    loadFirstCategory(){
        _product.getCategoryList().then(res=>{
            this.setState({
                firstCategoryList:res
            })
        },errMsg=>{
            _mm.errorTips(errMsg);
        })
    }

    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res=>{
            this.setState({
                secondCategoryList:res
            })
        },errMsg=>{
            _mm.errorTips(errMsg);
        })
    }


    onFirstCategoryChange(e){
        if(this.props.readOnly){
            return;
        }
        let firstId = e.target.value;
        this.setState({
            firstCategoryId    :firstId,
            secondCategoryId   :0,
            secondCategoryList :[]
        },()=>{
            //加载第二品类
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
        console.log('选中',firstId);
    }

    onSecondCategoryChange(e){
        if(this.props.readOnly){
            return;
        }
        let secondId = e.target.value;
        this.setState({
            secondCategoryId  :secondId
        },()=>{
            this.onPropsCategoryChange();
        })
    }

    //传给父组件选中的结果
    onPropsCategoryChange(){
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        //如果是有二级品类
        if(this.state.secondCategoryId){
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId);
            //如果只有一级品类
        }else{
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId,0);
        }
    }

    render(){
        console.log("渲染");
        return(
                <div className="col-md-10">
                    <select className="form-control cate-select"
                        value={this.state.firstCategoryId}
                        onChange={e=>this.onFirstCategoryChange(e)}
                        readOnly={this.props.readOnly}
                    >
                        <option>请选择一级分类</option>
                        {this.state.firstCategoryList.map((category,index)=>
                            <option value={category.id} key={index}>{category.name}</option>
                        )}
                    </select>
                    {this.state.secondCategoryList.length ?
                        (<select name="" className="form-control cate-select"
                            value={this.state.secondCategoryId}
                            onChange={e=>this.onSecondCategoryChange(e)}
                        >
                            <option>请选择二级分类</option>
                            {this.state.secondCategoryList.map((category,index)=>
                                <option value={category.id} key={index}>{category.name}</option>
                            )}
                        </select>): null
                    }
                </div>
        )
    }
}

export default CategorySelector;