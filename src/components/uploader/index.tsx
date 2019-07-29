import { Upload, Button, Icon } from 'antd';
import React from 'react';
import { Bind } from 'lodash-decorators';
import { connect } from 'dva';
import { IUmiComponentProps } from '@/common/types/umi.type';
import { addCalendar } from '@/actions/calendar.action';

interface IUploaderProps {}
interface IUplaoderState {}

type IUploaderRealProps = IUploaderProps & IUmiComponentProps;

@connect()
export default class Uploader extends React.Component<IUploaderRealProps, IUplaoderState> {
  private uploadProps = {
    name: 'file',
    action: '/api/calendar/upload',
    onChange: this.onUploadStatusChange,
  };

  @Bind()
  public onUploadStatusChange(info) {
    if (info.file && info.file.status === 'done') {
      // console.log('upload done');
      const { data } = info.file.response;
      const { dispatch } = this.props;
      dispatch(addCalendar(data));
    }
  }

  public render() {
    return <Upload {...this.uploadProps}>
      <Icon type={'upload'} /><Button>Click to upload</Button>
    </Upload>;
  }
}
