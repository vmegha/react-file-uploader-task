import { UploadSingleFile, UploadMultipleFiles } from "./Shared"

export const BrandUploads = () => {
    return (
        <div className='brand-uploads'>
            <UploadMultipleFiles />
            <UploadSingleFile />
        </div>
    )
}
