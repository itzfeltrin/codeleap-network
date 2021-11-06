import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usernameSlice } from "../../redux/usernameSlice";
import { DeleteIcon } from "../icons/Delete";
import { EditIcon } from "../icons/Edit";
import { LogoutIcon } from "../icons/Logout";
import classes from "./Header.module.css";

type HeaderProps = {
    title?: string;

    showActions?: "post" | "session" | null;
    onAction?: (action: string) => void;
};

export const Header = ({
    title = "CodeLeap Network",
    showActions = null,
    onAction,
}: HeaderProps): JSX.Element => {
    const username = useSelector<{ username: string }>(
        (state) => state.username
    );

    const dispatch = useDispatch();

    const signOut = useCallback(() => {
        dispatch(usernameSlice.actions.signOut());
    }, [dispatch]);

    return (
        <header className={classes.container}>
            <div className={classes.row}>
                <h1 className={classes.title}>{title}</h1>
                {showActions === "post" && (
                    <div className={classes.actions}>
                        <button
                            onClick={() => onAction && onAction("delete")}
                            aria-label="Delete Post"
                            className={classes.iconButton}
                        >
                            <DeleteIcon />
                        </button>
                        <button
                            onClick={() => onAction && onAction("edit")}
                            aria-label="Edit Post"
                            className={classes.iconButton}
                        >
                            <EditIcon />
                        </button>
                    </div>
                )}
                {showActions === "session" && (
                    <div className={classes.actions}>
                        <span className={classes.username}>@{username}</span>
                        <button
                            onClick={signOut}
                            aria-label="Sign Out"
                            className={classes.iconButton}
                        >
                            <LogoutIcon
                                width={24}
                                height={24}
                                fill="#fff"
                                style={{ marginBottom: -4 }}
                            />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};
