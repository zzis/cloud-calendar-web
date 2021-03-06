import { Upload, Button, Icon, message } from 'antd';
import React from 'react';
import { Bind } from 'lodash-decorators';
import { connect } from 'dva';
import { IUmiComponentProps } from '@/common/types/umi.type';
import { setCalendar } from '@/actions/calendar.action';
import style from './index.less';

interface IUploaderProps {}
interface IUplaoderState {}

type IUploaderRealProps = IUploaderProps & IUmiComponentProps;

@connect()
export default class Uploader extends React.Component<IUploaderRealProps, IUplaoderState> {
  private uploadProps = {
    name: 'file',
    action: '/api/calendar/upload',
    onChange: this.onUploadStatusChange,
    showUploadList: false,
  };

  @Bind
  public onUploadStatusChange(info) {
    if (info.file && info.file.status === 'done') {
      const { data, errno, errMsg } = info.file.response;
      if (errno) {
        message.error(errMsg, 10);
        return;
      }
      const { dispatch } = this.props;
      dispatch(setCalendar(data));
    }
  }

  public render() {
    return <div className={style.uploadComponent}>
      <Upload {...this.uploadProps}>
        <Button icon="upload">Click to upload</Button>
      </Upload>
    </div>;
  }
}
