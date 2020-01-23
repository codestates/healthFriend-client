import React from 'react';

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
      <form
        onSubmit={() => {
          console.log('Submitted');
        }}
        encType="multipart/form-data"
      >
        <input
          name="document"
          type="file"
          onChange={({ target: { files } }) => {
            const file = files![0];
            file && profileImageUpload({ variables: { file } });
          }}
        />
        {loadingImg && <p>Loading.....</p>}
      </form>
      {dataImg && dataImg.profileImageUpload && (
        <img src={`${dataImg.profileImageUpload.Location}`} alt="s3" />
      )}
    </>
  );
}
