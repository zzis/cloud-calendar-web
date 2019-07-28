import { Upload, Button, Icon } from 'antd';
import React from 'react';
import { Bind } from 'lodash-decorators';

interface IUploaderProps {}
interface IUplaoderState {}

export default class Uploader extends React.Component<IUploaderProps, IUplaoderState> {
  private uploadProps = {
    name: 'file',
    action: '/api/calendar/upload',
    onChange: this.onUploadStatusChange,
  };

  @Bind()
  public onUploadStatusChange(info) {
    if (info.file && info.file.status === 'done') {
      // console.log('upload done');
    }
  }

  public render() {
    return <Upload {...this.uploadProps}>
      <Icon type={'upload'} /><Button>Click to upload</Button>
    </Upload>;
  }
}
