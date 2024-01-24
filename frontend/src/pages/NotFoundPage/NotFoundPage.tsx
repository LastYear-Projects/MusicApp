import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  const [fileName, setFileName] = React.useState<File | null>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
        console.log(event.target.files[0]);
      setFileName(event.target.files[0]);
    }
  };

  const saveImage =async ()=>{
    if(fileName){
        const formData = new FormData();
        formData.append('file', fileName);
        const res = await axios.post('http://localhost:6969/uploadFiles/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log("RES: ",res);
    }
}
  return (
    <>
    <Button  component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <VisuallyHiddenInput type="file" onChange={handleChange}/>
    </Button>
    <Button onClick={saveImage}>Submit</Button>
    </>
  );
}