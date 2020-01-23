import React from 'react';
import Loading from './Loading';
import '../../css/imageInput.css';

type ImageFormProps = {
  profileImageUpload: any;
  dataImg: any;
  loadingImg: boolean | undefined;
};

export default function ImageForm({
  profileImageUpload,
  dataImg,
  loadingImg,
}: ImageFormProps) {
  return (
    <>
      {loadingImg && <Loading />}
      {dataImg && dataImg.profileImageUpload && (
        <img
          src={`${dataImg.profileImageUpload.Location}`}
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
        </div>
        {/* <input
          name="document"
          type="file"
          onChange={({ target: { files } }) => {
            const file = files![0];
            if (file) profileImageUpload({ variables: { file } });
          }}
        /> */}
      </form>
    </>
  );
}
