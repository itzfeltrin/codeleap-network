import { DeleteIcon } from "../icons/Delete";
import { EditIcon } from "../icons/Edit";
import classes from "./Header.module.css";

type HeaderProps = {
    title?: string;
    showActions?: boolean;
    onAction?: (action: string) => void;
};

export const Header = ({
    title = "CodeLeap Network",
    showActions = false,
    onAction,
}: HeaderProps): JSX.Element => {
    return (
        <header className={classes.container}>
            <div className={classes.row}>
                <h1 className={classes.title}>{title}</h1>
                {showActions && (
                    <div className={classes.actions}>
                        <button
                            onClick={() => onAction && onAction("delete")}
                            className={classes.iconButton}
                        >
                            <DeleteIcon />
                        </button>
                        <button
                            onClick={() => onAction && onAction("edit")}
                            className={classes.iconButton}
                        >
                            <EditIcon />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};
