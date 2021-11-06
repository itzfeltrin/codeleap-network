import { useCallback, useState } from "react";
import classes from "./PostForm.module.css";

type PostFormProps = {
    editing?: boolean;
};

export const PostForm = ({ editing = false }: PostFormProps): JSX.Element => {
    const [values, changeValues] = useState({
        title: "",
        content: "",
    });

    const handleChangeValue =
        (key: keyof typeof values) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            changeValues((prev) => ({
                ...prev,
                [key]: event.target.value,
            }));
        };

    const handleSubmit = useCallback<React.FormEventHandler>((event) => {
        event.preventDefault();
    }, []);

    return (
        <div className={classes.container}>
            <h3 className={classes.title}>
                {editing ? "Edit item" : "What's on your mind?"}
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="title">
                        <span>Title</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Hello world"
                        value={values.title}
                        onChange={handleChangeValue("title")}
                        className="field"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="content">
                        <span>Content</span>
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Content here"
                        value={values.content}
                        onChange={handleChangeValue("content")}
                        className="field"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={Object.keys(values)
                        .map((key) => values[key as keyof typeof values])
                        .some((value) => value === "")}
                    className="primary"
                >
                    <span>CREATE</span>
                </button>
            </form>
        </div>
    );
};
