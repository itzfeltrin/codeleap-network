import { NextPage } from "next";
import classes from "../styles/Feed.module.css";

const Feed: NextPage = () => {
    return (
        <main className={classes.container}>
            <header className={classes.header}>
                <h1 className={classes.headerTitle}>CodeLeap Network</h1>
            </header>
            <div className="content"></div>
        </main>
    );
};

export default Feed;
