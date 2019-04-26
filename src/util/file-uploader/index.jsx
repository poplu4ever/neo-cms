import FileUpload       from './FileUpload.jsx';
import React            from 'react';

class FileUploader extends React.Component{

    render(){
        /*指定参数*/
        const options = {
            baseUrl         :'/manage/product/upload.do',
            fileFieldName   :'upload_file',
            dataType        :'json',
            uploadSuccess   :(res)=>this.props.onSuccess(res.data),
            uploadError     :(err)=>this.props.onError(err.message || '上传图片出错了')
        }
        /*调用FileUpload,传入options。然后在children中*/
        /*传入两个dom(不一定是button)并设置其ref值。*/
        return(
            <FileUpload options={options}>
                <button className="btn btn-xs btn-default" ref="chooseBtn">choose</button>
                <button className="btn btn-xs btn-default" ref="uploadBtn">upload</button>
            </FileUpload>
        )
    }

}

export default FileUploader;