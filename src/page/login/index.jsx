import React, { Component } from 'react';
import User from '../../service/user-service.jsx';
import Util from '../../util/utils.jsx';
import './index.scss';


const _user = new User();
const _mm = new Util();

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            redirect:_mm.getUrlParam('redirect') || '/'
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        document.title = '登陆 - AUSELITE';
    }

    onSubmit(){

      let loginInfo = {
          username:this.state.username,
          password:this.state.password
      },
          checkResult =  _user.checkLoginInfo(loginInfo);

      if(checkResult.status){
          _user.login(loginInfo).then((res)=>{
              // console.log(this.state.redirect);
              _mm.setStorage('userInfo',res)
              this.props.history.push(this.state.redirect)
          },(errMsg)=>{
              _mm.errorTips(errMsg)
          });
      }else{
          _mm.errorTips(checkResult.msg);
      }

    }


    handleChange(e,value){
        // console.log(value);
        this.setState({
            [value]:e.target.value
        });
    }

    render(){
        return(
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className='panel-heading'>欢迎登陆 - AUS HR 管理系统</div>
                    <div className='panel-body'>
                        <form>
                            <div className="form-group">
                                <input type="email"
                                       className="form-control"
                                       placeholder="请输入用户名"
                                       onChange={(e) => this.handleChange(e,"username")}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className="form-control" id="exampleInputPassword1"
                                       placeholder="请输入密码"
                                       onChange={(e) =>this.handleChange(e,"password")}
                                />
                            </div>
                            <button type="submit"
                                    className="btn btn-primary btn-block"
                                    onClick={this.onSubmit}>登陆</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;