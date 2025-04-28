export interface ResetFilesProps {
    clearAll: () => void;
}
export const ResetFilesButton = (props: ResetFilesProps) => {
    const { clearAll } = props;

    return (<button  aria-label='resetSelectionButton' className="reset-button" onClick={() => clearAll()}>
        Reset selection
    </button>)
};
