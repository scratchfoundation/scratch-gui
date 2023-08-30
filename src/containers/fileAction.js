const FILE_UPLOAD = 'FILE_UPLOAD';


export const fileUpload = (files) => ({
    type: FILE_UPLOAD,
    payload: files,
  });

