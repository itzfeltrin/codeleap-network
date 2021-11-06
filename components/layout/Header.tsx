import Image from "next/image";
import classes from "./Header.module.css";

type HeaderProps = {
    title?: string;
    showActions?: boolean;
};

export const Header = ({
    title = "CodeLeap Network",
    showActions = false,
}: HeaderProps): JSX.Element => {
    return (
        <header className={classes.container}>
            <div className="row">
                <h1 className={classes.title}>{title}</h1>
                {showActions && (
                    <div className="actions">
                        <button className="unstyled">
                            <Image
                                src="/img/delete.svg"
                                alt="Remove Post"
                                width={24}
                                height={24}
                            />
                        </button>
                        <button className="unstyled">
                            <Image
                                src="/img/edit.svg"
                                alt="Edit Post"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};
