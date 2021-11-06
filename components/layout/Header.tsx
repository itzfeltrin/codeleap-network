import classes from "./Header.module.css";

type HeaderProps = {
    title?: string;
};

export const Header = ({
    title = "CodeLeap Network",
}: HeaderProps): JSX.Element => {
    return (
        <header className={classes.container}>
            <h1 className={classes.title}>{title}</h1>
        </header>
    );
};
