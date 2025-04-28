/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Example to Upload Multiple files
import { type FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './UploadFileUsage.css';
import { FileUploader, ResultStatus, ResultStatusEnum } from '../../../Components';
import { handleMultipleFileSubmission, validateImageFileFormat, validateImageFileSize } from '.';

export type FormMultipleFileValues = {
    imageFiles: File[];
};
export const UploadMultipleFiles: FunctionComponent = () => {
    const [status, setStatus] = useState<ResultStatusEnum>(ResultStatusEnum.INITIAL);
    const [isFileToUploadSelected, setIsFileToUploadSelected] = useState<boolean>(false);
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        clearErrors,
    } = useForm<FormMultipleFileValues>({
        mode: "onBlur",
    });

    useEffect(() => {
        if (isFileToUploadSelected) {
            setStatus(ResultStatusEnum.INITIAL);
        }
    }, [isFileToUploadSelected])

    const handleFileSubmission = async (files: FormMultipleFileValues) => {
        setStatus(ResultStatusEnum.UPLOADING);
        const result = handleMultipleFileSubmission(files);
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
            <div className='file-upload-heading' aria-label='fileUploadHeading'>Multiple File Upload With Preview</div>
            <FileUploader
                multiple={true}
                label={'Upload your brand images'}
                accept={'image/png, image/jpeg'}
                reset={resetFileUpload}
                clearErrors={clearErrors}
                setIsFileToUploadSelected={setIsFileToUploadSelected}
                preview={true}
                errors={errors}
                register={register('imageFiles', {
                    validate: {
                        lessThan1MB: (files) => {
                            return validateImageFileSize(files)
                        },
                        acceptedFormats: (files) => {
                            return validateImageFileFormat(files)
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
                    Submit images
                </button>
                {status !== ResultStatusEnum.INITIAL && <ResultStatus status={status} />}
            </FileUploader>
        </div>
    );
};
