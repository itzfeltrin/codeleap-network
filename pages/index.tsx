import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useCallback, useState } from "react";
import classes from "../styles/Home.module.css";

const Home: NextPage = () => {
    const [username, changeUsername] = useState("");

    const router = useRouter();

    const handleSubmit = useCallback<React.FormEventHandler>(
        (event) => {
            event.preventDefault();

            localStorage.setItem("username", username);

            router.push("/feed");
        },
        [router, username]
    );

    return (
        <main className={classes.container}>
            <div className={classes.box}>
                <h3 className={classes.title}>Welcome to CodeLeap network!</h3>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">
                            <span>Please enter your username</span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="John Doe"
                            value={username}
                            onChange={(e) => changeUsername(e.target.value)}
                            className="field"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={username === ""}
                        className="primary"
                    >
                        <span>ENTER</span>
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Home;
