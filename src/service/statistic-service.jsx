import MUtil from '../util/utils.jsx';

const _mm = new MUtil();

class Statistic{

    //用户登陆
    getHomeCount(){
        return _mm.request({
            url: "/manage/statistic/base_count.do",
        })
    }
}

export default Statistic;