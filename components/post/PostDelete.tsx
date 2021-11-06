import classes from "./PostDelete.module.css";

type PostDeleteProps = {
    onCancel(): void;
    onConfirm(): void;
};

export const PostDelete = ({ onCancel, onConfirm }: PostDeleteProps) => {
    return (
        <div className={classes.container}>
            <h6 className={classes.title}>
                Are you sure you want to delete this item?
            </h6>
            <div className={classes.row}>
                <button
                    type="button"
                    aria-label="Cancel Deletion"
                    onClick={onCancel}
                    className={classes.button}
                >
                    <span>Cancel</span>
                </button>
                <button
                    type="button"
                    aria-label="Confirm Deletion"
                    onClick={onConfirm}
                    className={classes.button}
                >
                    <span>OK</span>
                </button>
            </div>
        </div>
    );
};
