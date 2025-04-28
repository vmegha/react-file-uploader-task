export interface PreviewFilesProps {
    filesToPreview?: File[];
}
export const PreviewFiles = (props: PreviewFilesProps) => {
    const { filesToPreview } = props;
    const previewSelectedFiledToUpload = () => {
        return (
            <div className="kb-attach-box">
                {
                    filesToPreview?.map((file, index) => {
                        return (
                            <div className="file-atc-box" key={index}>
                                {
                                    file.name.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                        <div aria-label='file image' className="file-image"> <img src={URL.createObjectURL(file)} alt="" /></div> :
                                        <div aria-label='file image' className="file-image"><i className="far fa-file-alt"></i></div>
                                }
                                <div aria-label='selected file details' className="file-detail">
                                    <h6>{file.name}</h6>
                                    <p><span>Size : {file.size}</span><span>Modified Time : {file.lastModified}</span></p>
                                    <div className="file-actions">
                                        <button aria-label='delete selected file' aria-description='delete button is currently disabled to be implemented as TODO' type="button" className="file-action-btn" disabled>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    };

    return filesToPreview ? <div aria-live="polite" className="preview">{previewSelectedFiledToUpload()}</div> : null;
};
