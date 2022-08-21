import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

const AUTHORIZATION_HEADER = "Authorization";
const AUTHORIZATION_TOKEN = "authorization_token";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const classes = useStyles();
  const [file, setFile] = useState<any>();

  useEffect(() => {
    console.log(file);
  }, [file]);

  const onFileChange = (e: any) => {
    console.log(e);
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    setFile(files.item(0));
  };

  const removeFile = () => {
    setFile("");
  };

  const uploadFile = async (e: any) => {
    const headers: Record<string, any> = {};

    if (localStorage.getItem(AUTHORIZATION_TOKEN)) {
      headers[AUTHORIZATION_HEADER] = `Basic ${localStorage.getItem(
        AUTHORIZATION_TOKEN
      )}`;
    }
    // Get the presigned URL
    const response = await axios({
      method: "GET",
      url,
      params: {
        name: encodeURIComponent(file.name),
      },
    });
    // const formData = new FormData();
    // formData.append("file", file, file.name);
    // const response = await axios({
    //   method: "POST",
    //   url,
    //   params: {
    //     name: encodeURIComponent(file.name),
    //   },
    //   data: formData,
    // });
    console.log("File to upload: ", file.name);
    console.log("Uploading to: ", response.data.body);
    const result = await fetch(response.data.body, {
      method: "PUT",
      body: file,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log("Result: ", result);
    setFile("");
  };
  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </div>
  );
}
