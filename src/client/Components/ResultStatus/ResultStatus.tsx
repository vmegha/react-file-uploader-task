import { ResultStatusEnum } from './Enums';

export interface UploadResultStatusProps {
    status?: ResultStatusEnum;
}

export const ResultStatus = (props: UploadResultStatusProps) => {
    const { status } = props;
    const getResultStatus = () => {
        if (status === ResultStatusEnum.SUCCESS) {
            return <p>✅ File uploaded successfully!</p>;
        } else if (status === ResultStatusEnum.FAIL) {
            return <p>❌ File upload failed!</p>;
        } else if (status === ResultStatusEnum.UPLOADING) {
            return <p>⏳ Uploading selected file...</p>;
        } else {
            return null;
        }
    };

    return <div className="status" aria-label='file uploaded to server status'>{getResultStatus()}</div>;
};
