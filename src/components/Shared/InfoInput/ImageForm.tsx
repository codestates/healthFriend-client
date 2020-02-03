import React from 'react';
import { Button, message } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import Loading from '../Loading';
import '../../../css/imageInput.css';
import { DELETE_PROFILE_IMAGE, GET_USERINFO } from '../../../graphql/queries';

type ImageFormProps = {
  profileImageUpload: any;
  dataImg: any;
  loadingImg: boolean | undefined;
  dataI: any;
  visible: boolean;
  setVisible: Function;
  totalCheckArr: any[];
  setTotalCheckArr: Function;
  order: number;
  subject: string;
};

export default function ImageForm({
  profileImageUpload,
  dataImg,
  loadingImg,
  dataI,
  visible,
  setVisible,
  totalCheckArr,
  setTotalCheckArr,
  order,
  subject,
}: ImageFormProps) {
  const [deleteProfileImg] = useMutation(DELETE_PROFILE_IMAGE, {
    refetchQueries: [{ query: GET_USERINFO }],
    onCompleted: (data) => {
      if (data) message.success('처리되었습니다');
      setVisible(false);
      setTotalCheckArr(
        totalCheckArr.map((elm, idx) =>
          idx + 1 === order &&
          subject === 'openImageChoice' &&
          !(dataI && dataI.me && dataI.me.profileImage)
            ? [false, false, true]
            : elm,
        ),
      );
    },
    onError: (error) => {
      console.log(error);
      // redirectWhenError({ history, client });
    },
  });
  let url;
  if (dataImg && dataImg.profileImageUpload) {
    url = dataImg.profileImageUpload.Location;
  }
  if (
    dataI &&
    dataI.me &&
    dataI.me.profileImage &&
    dataI.me.profileImage.length > 0
  )
    url = dataI.me.profileImage[0].filename;

  return (
    <>
      {loadingImg && <Loading />}
      {visible && dataImg && dataImg.profileImageUpload && (
        <img
          src={`${dataImg.profileImageUpload.Location}`}
          alt="s3"
          height="100"
          width="100"
        />
      )}
      {visible &&
        (!dataImg || (dataImg && !dataImg.profileImageUpload)) &&
        dataI &&
        dataI.me &&
        dataI.me.profileImage &&
        dataI.me.profileImage.length > 0 && (
          <img
            src={`${dataI.me.profileImage[0].filename}`}
            alt="s3"
            height="100"
            width="100"
          />
        )}
      <br />
      <br />
      <form
        onSubmit={() => {
          console.log('Submitted');
        }}
        encType="multipart/form-data"
      >
        <div className="filebox">
          <label htmlFor="ex_file">업로드</label>
          <input
            type="file"
            id="ex_file"
            name="document"
            onChange={({ target: { files } }) => {
              const file = files![0];
              if (file) profileImageUpload({ variables: { file } });
            }}
          />
          &nbsp;
          {(visible && dataImg && dataImg.profileImageUpload) ||
          (visible &&
            dataI &&
            dataI.me &&
            dataI.me.profileImage &&
            dataI.me.profileImage.length > 0) ? (
            <Button
              className="button-fix"
              onClick={() => deleteProfileImg({ variables: { url } })}
            >
              {' '}
              지우기{' '}
            </Button>
          ) : null}
        </div>
      </form>
    </>
  );
}
