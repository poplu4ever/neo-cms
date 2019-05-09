import React                from 'react';
import PageTitle            from "../../../component/page-title/index.jsx";
import Product              from "../../../service/product-service.jsx";
import Util                 from "../../../util/utils.jsx";
import CategorySelector     from "./index-selector.jsx";
import FileUploader         from '../../../util/file-uploader/index.jsx';
import RichEditor           from "../../../util/rich-editor/index.jsx";

import './save.scss';


const _product  = new Product();
const _mm       = new Util();

class ProductSave extends React.Component{
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
        console.log("检查",this.state);

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
                res.defaultDetail = res.detail;
                this.setState(res);
                console.log("检查2",this.state);

            },errMsg=>{
                _mm.errorTips(errMsg);
            })
        }
    }

    onCategoryChange(categoryId,parentCategoryId){
        this.setState({
            categoryId,
            parentCategoryId
        })
    }

    onImageDelete(e){
        let index     = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
        subImages.splice(index,1);
        this.setState({
            subImages
        })
    }

    //上传图片成功
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages : subImages
        })
    }

    onDetailValueChange(value){
        this.setState({
            detail  : value
        })
    }


    onValueChange(e){
        let name = e.target.name,
            value= e.target.value.trim();
        this.setState({
            [name]:value
        })

    }

    onUploadError(err){
        _mm.errorTips(err.message || '上传图片失败')
    }


    getSubImagesString(){
        return this.state.subImages.map((image)=> image.uri).join(',');
    }

    onSubmit(){
        let product = {
            name            : this.state.name,
            subtitle        : this.state.subtitle,
            categoryId      : parseInt(this.state.categoryId),
            subImages       : this.getSubImagesString(),
            detail          : this.state.detail,
            price           : parseFloat(this.state.price),
            stock           : parseInt(this.state.stock),
            status          : this.state.status
        },
        // console.log(product);
        productResult = _product.checkProduct(product);
        if(this.state.id){
           product.id = this.state.id;
        }

        // console.log('product',product)

        if(productResult.status){
            _product.saveProduct(product).then((res)=>{
                _mm.successTips(res);
                this.props.history.push('/product/index');
            },errMsg=>{
                _mm.errorTips(errMsg);
            })
        }else{
            _mm.errorTips(productResult.msg);
        }
    }

    render(){

        return(
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑商品': '添加商品'}/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入名称"
                                   name='name'
                                   value={this.state.name}
                                   onChange={e=>this.onValueChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入描述"
                                   name='subtitle'
                                   value={this.state.subtitle}
                                   onChange={e=>this.onValueChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品类别</label>
                        <CategorySelector
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={
                                (categoryId,parentCategoryId)=> this.onCategoryChange(categoryId,parentCategoryId)} />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                       placeholder="价格"
                                       name='price'
                                       value={this.state.price}
                                       onChange={e=>this.onValueChange(e)}
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
                                       placeholder="库存"
                                       name='stock'
                                       value={this.state.stock}
                                       onChange={e=>this.onValueChange(e)}
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
                                        <i className="fa fa-close" index={index}
                                            onClick={e=>this.onImageDelete(e)}
                                        ></i>
                                    </div>
                                    )
                            ):(<div>请上传图片</div>)}
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-uploader">
                            <FileUploader
                                onSuccess={res => {this.onUploadSuccess(res)}}
                                onError={err=>{this.onUploadError(err)}}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <RichEditor
                                detail={this.state.detail}
                                defaultDetail={this.state.defaultDetail}
                                onValueChange={(value)=>{this.onDetailValueChange(value)}}
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
        )
    }
}

export default ProductSave;