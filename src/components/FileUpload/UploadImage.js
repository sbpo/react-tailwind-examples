import React, { Component } from "react";
import imageCompression from "browser-image-compression";
import Dropzone from "./Dropzone";
import uuid from "uuid";
import MaterialIcon from "@material/react-material-icon";
import { SmallButton } from "../basic/buttons";

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploadStatus: new Map()
    };
    this.onFileAdded = this.onFileAdded.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.uploadStatusChanged = this.uploadStatusChanged.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.supportedFileTypes = ["image/jpeg", "image/png"];
  }

  removeFile(id) {
    this.setState({ files: this.state.files.filter(file => file.id !== id) });
  }

  uploadStatusChanged(id, status) {
    return new Promise(res => {
      const newStatus = new Map(this.state.uploadStatus);
      this.setState(
        {
          uploadStatus: newStatus.set(id, {
            ...this.state.uploadStatus.get(id),
            ...status
          })
        },
        res
      );
    });
  }

  async uploadImage(file) {
    this.uploadStatusChanged(file.id, {
      status: "compressing image"
    });
    const compressedImg = await compressImg(file, 1024, 1);
    this.uploadStatusChanged(file.id, {
      status: "uploading file"
    });
    await fakeFileUpload(compressedImg, progress => {
      this.uploadStatusChanged(file.id, { progress: progress });
    });
    this.uploadStatusChanged(file.id, {
      status: "file uploaded"
    });
  }

  async onFileAdded(files) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      file.id = uuid();
      await this.uploadStatusChanged(file.id, {
        status: "file added",
        progress: null
      });
      if (this.supportedFileTypes.includes(file.type)) {
        this.uploadImage(file);
      } else {
        this.uploadStatusChanged(file.id, {
          status: "file type not supported"
        });
      }
    }
    this.setState({
      files: [...this.state.files, ...files]
    });
  }

  render() {
    const { files, uploadStatus } = this.state;
    return (
      <Dropzone onFileAdded={this.onFileAdded}>
        {({ dropHovered, clickToAdd }) => (
          <div
            className={`flex bg-white flex-col rounded-lg items-center h-64 w-64
              ${dropHovered ? "shadow-2xl" : "shadow-lg"} 
            `}
          >
            <div
              className={`w-full h-48 flex p-2 flex-col overflow-auto
                ${files.length === 0 ? "justify-center" : ""}
              `}
            >
              {files.length > 0 ? (
                files.map(file => {
                  return (
                    <File
                      name={file.name}
                      uploadStatus={uploadStatus.get(file.id)}
                      key={file.id}
                      onRemove={() => this.removeFile(file.id)}
                    />
                  );
                })
              ) : (
                <span className="text-center text-sm text-gray-700 px-8 ">
                  Drag and drop to upload one or more images
                </span>
              )}
            </div>
            <SmallButton onClick={clickToAdd} text={"Upload"} />
          </div>
        )}
      </Dropzone>
    );
  }
}

UploadImage.propTypes = {};
export default UploadImage;

const File = props => {
  const { name, uploadStatus, onRemove } = props;
  console.log(uploadStatus);
  return (
    <div className={`my-1 w-full p-2 relative`}>
      <div className="flex w-full items-center">
        <div className="truncate z-10 flex-grow">
          <div className="text-sm font-bold">{name}</div>
          <div className="text-xs italic">
            {uploadStatus && uploadStatus.status}
          </div>
        </div>
        <div className="flex-none z-10">
          <MaterialIcon
            icon="close"
            className="text-sm cursor-pointer"
            onClick={onRemove}
          />
        </div>
      </div>
      {uploadStatus && (
        <div
          style={{ width: `${uploadStatus.progress}%` }}
          className={`absolute top-0 left-0 h-full 
            ${uploadStatus.progress ? "bg-gray-200" : ""}`}
        ></div>
      )}
    </div>
  );
};

const fakeFileUpload = (file, onProgress) => {
  return new Promise(async (resolve, reject) => {
    let progress = 0;
    while (progress < 100) {
      await sleep(15);
      progress++;
      onProgress(progress);
    }
    resolve();
  });
};
const sleep = ms => new Promise(r => setTimeout(r, ms));

const compressImg = (file, maxHeightWidth, maxSize) => {
  const options = {
    maxSizeMB: maxSize,
    maxWidthOrHeight: maxHeightWidth,
    useWebWorker: true
  };
  return new Promise(async (resolve, reject) => {
    try {
      const compressedFile = await imageCompression(file, options);
      resolve(compressedFile);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
