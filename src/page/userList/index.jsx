import React, { Component } from 'react';
import PageTitle            from '../../component/page-title/index.jsx';
import Pagination           from '../../util/pagination/index.jsx';
import {Link}               from 'react-router-dom';
import User                 from "../../service/user-service.jsx";
import Util                 from "../../util/utils.jsx";
import TableList            from "../../util/table-list/index.jsx";



const _user = new User();
const _mm = new Util();

class UserList extends Component{
    constructor(props){
        super(props);
        this.state = {
            list        :[],
            pageNum     :1,
            firstLoading :true
        }
    }

    componentDidMount() {
        this.loadUserList();
    }

    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res,()=>{
                this.setState({
                    firstLoading:false
                })
            });
            // console.log('查看res',res);
            // console.log('查看state',this.state);
        },errMsg =>{
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg);
        });
    }

    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadUserList();
        })
    }

    render() {

        let listBody = this.state.list.map((user,index)=>{
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
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
                <PageTitle title='用户列表'/>
                <TableList tableHeads={['ID','用户名','邮箱','电话','注册时间']}>
                    {listBody}
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total}
                            onChange={pageNumber => this.onPageNumChange(pageNumber)}/>
            </div>
        );
    }
}

export default UserList;