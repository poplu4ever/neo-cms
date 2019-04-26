import React                from 'react';
import PageTitle            from "../../../component/page-title/index.jsx";
import Product              from "../../../service/product-service.jsx";
import Util                 from "../../../util/utils.jsx";
import CategorySelector     from "./index-selector.jsx";

import './save.scss';

const _product  = new Product();
const _mm       = new Util();

class ProductDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id               :this.props.match.params.pid,
            name             :'',
            subtitle         :'',
            categoryId       : 0,
            parentCategoryId : 0,
            subImages        : [],
            price            :'',
            stock            :'',
            detail           :'',
            status           :1 //1为在售
        }
    }

    componentDidMount() {
        this.loadProduct();
    }

    loadProduct(){
        if(this.state.id){
            _product.getProduct(this.state.id).then(res=>{
                //有id的时候，是编辑功能
                let images = res.subImages ? res.subImages.split(","):[];
                res.subImages = images.map((img)=>{
                    return {
                        uri:img,
                        url:res.imageHost + res.imgUri
                    }
                });
                this.setState(res);
                console.log("检查",this.state);
            },errMsg=>{
                _mm.errorTips(errMsg);
            })
        }
    }

    render(){

        return(
            <div id="page-wrapper">
                <PageTitle title="添加商品"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品类别</label>
                        <CategorySelector
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                       value={this.state.price}
                                       readOnly
                                />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                       value={this.state.stock}
                                       readOnly
                                />
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {this.state.subImages.length ? this.state.subImages.map(
                                (image,index)=>(
                                    <div key={index} className="img-wrap">
                                        <img className="img" src={image.url}/>
                                    </div>
                                )
                            ):(<div>暂无图片</div>)}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div  className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;