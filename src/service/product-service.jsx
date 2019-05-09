import MUtil from '../util/utils.jsx';

const _mm = new MUtil();

class Product{

    //获取商品列表
    getProductList(listParam){
        let url  = "",
            data = {};
        if(listParam.listType === 'list'){
            url = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/manage/product/search.do';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.searchKeyWord;
        }

        return _mm.request({
            type :'post',
            url  : url,
            data : data
        });
    }

    getProduct(productId){
        return _mm.request({
            type :'post',
            url  :'/manage/product/detail.do',
            data : {
                productId : productId || 0
            }
        });
    }

    setProductStatus(productInfo){
        return _mm.request({
            type :'post',
            url  :'/manage/product/set_sale_status.do',
            data : productInfo
        });
    }


    checkProduct(product) {
        let result = {
            status: true,
            msg: '验证通过'
        };

        if (typeof product.name !== 'string' || product.name.length === 0) {
            return {
                status: false,
                msg: " 产品名称不能为空"
            }
        }

        if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
            return {
                status: false,
                msg: " 产品描述不能为空"
            }
        }

        if (typeof product.categoryId !== 'number' || product.categoryId < 0) {
            return {
                status: false,
                msg: " 请选择商品品类"
            }
        }

        if (typeof product.price !== 'number' || product.price <= 0) {
            return {
                status: false,
                msg: " 请输入正确的价格"
            }
        }

        if (typeof product.stock !== 'number' || product.stock <= 0) {
            return {
                status: false,
                msg: " 请输入正确的库存数量"
            }
        }
        return result;

    }

    saveProduct(product){
        return _mm.request({
            type :'post',
            url  :'/manage/product/save.do',
            data : product
        });
    }

    /*
    * 品类相关
    * */

    getCategoryList(parentCategoryId){
        return _mm.request({
            type :'post',
            url  :'/manage/category/get_category.do',
            data : {
               categoryId: parentCategoryId || 0
            }
        });
    }

    updateCategoryName(category){
        return _mm.request({
            type :'post',
            url  :'/manage/category/set_category_name.do',
            data : category
        });
    }


    saveCategory(category){
        return _mm.request({
            type :'post',
            url  :'/manage/category/add_category.do',
            data : category
        });
    }

}


export default Product;