import classes from "./Modal.module.css";

type ModalProps = {
    open: boolean;
    onRequestClose(): void;
};

export const Modal: React.FC<ModalProps> = ({
    children,
    open,
    onRequestClose,
}): JSX.Element | null => {
    return open ? (
        <div onClick={onRequestClose} className={classes.backdrop}>
            <div
                className={classes.content}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    ) : null;
};
