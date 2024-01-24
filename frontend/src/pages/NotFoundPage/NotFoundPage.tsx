import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { Typography } from '@mui/material';

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
  const [imageURL, setImageUrl] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
        console.log(event.target.files[0]);
      setFileName(event.target.files[0]);
      // const newUrl = URL.createObjectURL(event.target.files[0]);
      // setImageUrl(newUrl);
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
          }).then(res=>{
            console.log("RES: ",res.data.file.path);
            setImageUrl(`http://localhost:6969/${res.data.file.path}`);
          })

    }
}
  return (
    <>
    <Button  component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <VisuallyHiddenInput type="file" onChange={handleChange}/>
    </Button>
    <Button onClick={saveImage}>Submit</Button>
    <Typography sx={{color: "white"}}>{fileName?.name}</Typography>
    {imageURL && <img src={imageURL} alt="img" width="200px" height="200px"/>}
    </>
  );
}