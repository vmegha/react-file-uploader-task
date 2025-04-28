/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Example to Upload Single file
import { type FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './UploadFileUsage.css';
import { FileUploader, ResultStatus, ResultStatusEnum } from '../../../Components';
import { handleSingleFileSubmission, validateSingleDocumentFileSize, validateSingleDocumentFileFormat } from '.';

export type FormSingleFileValues = {
    documentFile: File;
};
export const UploadSingleFile: FunctionComponent = () => {
    const [status, setStatus] = useState<ResultStatusEnum>(ResultStatusEnum.INITIAL);
    const [isFileToUploadSelected, setIsFileToUploadSelected] = useState<boolean>(false);
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        clearErrors,
    } = useForm<FormSingleFileValues>({
        mode: "onBlur",
    });

    useEffect(() => {
        if (isFileToUploadSelected) {
            setStatus(ResultStatusEnum.INITIAL);
        }
    }, [isFileToUploadSelected])

    const handleFileSubmission = async (files: FormSingleFileValues) => {
        setStatus(ResultStatusEnum.UPLOADING);
        const result = handleSingleFileSubmission(files);
        result.then((response) => {
            console.log(response);
            setStatus(ResultStatusEnum.SUCCESS);
            setIsFileToUploadSelected(false);
            reset();
        })
            .catch((error) => {
                console.log(error);
                setStatus(ResultStatusEnum.FAIL);
                setIsFileToUploadSelected(false);
                reset();
            });
    };

    const resetFileUpload = () => {
        reset();
        setStatus(ResultStatusEnum.INITIAL);
    };

    return (
        <div className='wrapper'>
            <div className='file-upload-heading' aria-label='fileUploadHeading'>Single File Upload With Preview</div>
            <FileUploader
                multiple={false}
                label={'Upload your brand’s guideline'}
                accept={"application/pdf"}
                reset={resetFileUpload}
                clearErrors={clearErrors}
                setIsFileToUploadSelected={setIsFileToUploadSelected}
                preview={true}
                errors={errors}
                register={register('documentFile', {
                    validate: {
                        lessThan1MB: (file) => {
                            return validateSingleDocumentFileFormat(file)
                        },
                        acceptedFormats: (file) => {
                            return validateSingleDocumentFileSize(file)
                        },
                    },
                })}
            >
                <button
                    aria-label='Submit'
                    className="submit-button"
                    onClick={handleSubmit(handleFileSubmission)}
                    disabled={!isFileToUploadSelected}
                >
                    Submit your document
                </button>
                {status !== ResultStatusEnum.INITIAL && <ResultStatus status={status} />}
            </FileUploader>
        </div>
    );
};
