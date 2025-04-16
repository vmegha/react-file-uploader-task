import { type ChangeEvent, type FunctionComponent, useRef, useState } from 'react';

const STATUS_IDLE = 0;
const STATUS_UPLOADING = 1;
const API_URL = 'http://localhost:3000/api/upload-single';
const API_METHOD = 'POST';

export const UploadFile: FunctionComponent = () => {
    const [selectedFilesToUpload, setSelectedFilesToUpload] = useState<File[] | undefined>(undefined);
    const [status, setStatus] = useState(STATUS_IDLE);
    const inputRef = useRef(null);

    const packFiles = (files: File[]) => {
        const formData = new FormData();

        for (const [index, selectedFileToUpload] of [...files].entries()) {
            formData.append(`file-${index}`, selectedFileToUpload, selectedFileToUpload.name);
        }

        return formData;
    };

    const uploadFiles = (data: FormData) => {
        setStatus(STATUS_UPLOADING);
        console.log(data);

        fetch(API_URL, {
            method: API_METHOD,
            body: data,
        })
            .then((res) => res.json())
            .then((data) => console.log(`api data is. .....${data}`))
            .catch((error) => console.error(error))
            .finally(() => setStatus(STATUS_IDLE));
    };

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length > 0) {
            setSelectedFilesToUpload([...files]);
            const data = packFiles([...files]);
            uploadFiles(data);
        }
        // Create an object of formData
        // const formData = new FormData();

        // Update the formData object
        // formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name);

        // Details of the uploaded file
        // console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        // axios.post("api/uploadfile", formData);
    };

    // const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const files = (event.target as HTMLInputElement).files;
    //     if (files) {
    //         setSelectedFilesToUpload([...files]);
    //     }
    // };

    const renderFileList = () => {
        return (
            <ol>
                {selectedFilesToUpload?.map((file, i) => (
                    <li key={i}>
                        {file.name} - {file.type}
                    </li>
                ))}
            </ol>
        );
    };
    // const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     if (!inputRef || !inputRef.current) {
    //         return;
    //     }

    //     (inputRef.current as HTMLInputElement).click();
    // };

    return (
        <div>
            <label htmlFor="uploadInput">Browse</label>
            <input id="uploadInput" ref={inputRef} type="file" onChange={handleFileUpload} hidden />
            {/* <button onClick={handleButtonClick} disabled={status === STATUS_UPLOADING}>
                Upload your file
            </button> */}
            <div className="preview">
                <p>No files currently selected for upload</p>
            </div>
            {renderFileList()}
        </div>
    );
};
