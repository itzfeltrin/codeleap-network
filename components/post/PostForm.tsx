import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import classes from "./PostForm.module.css";
import * as postActions from "../../actions/post.actions";
import { PostData, PostFormData, PostFormUpdateData } from "../../types/post";
import { useSelector } from "react-redux";

type PostFormProps = {
    editing?: PostData | null;
    afterSubmit?: () => void;
};

const defaultValues = {
    title: "",
    content: "",
};

export const PostForm = ({
    editing = null,
    afterSubmit,
}: PostFormProps): JSX.Element => {
    const [values, changeValues] = useState(editing ? editing : defaultValues);

    const username = useSelector<{ username: string }>(
        (state) => state.username
    ) as string;

    const queryClient = useQueryClient();

    const postCreate = useMutation(postActions.createOne, {
        onSuccess: () => {
            changeValues(defaultValues);

            queryClient.invalidateQueries("/posts");
        },
    });
    const postUpdate = useMutation(postActions.updateOne, {
        onSuccess: () => {
            queryClient.invalidateQueries("/posts");

            afterSubmit && afterSubmit();
        },
    });

    const handleChangeValue =
        (key: keyof typeof values) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            changeValues((prev) => ({
                ...prev,
                [key]: event.target.value,
            }));
        };

    const handleSubmit = useCallback<React.FormEventHandler>(
        (event) => {
            event.preventDefault();

            if (editing) {
                postUpdate.mutate(values as PostFormUpdateData);
            } else {
                const obj: PostFormData = {
                    username,
                    ...values,
                };

                postCreate.mutate(obj);
            }
        },
        [editing, postCreate, postUpdate, username, values]
    );

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
                    <span>{editing ? "Save" : "Create"}</span>
                </button>
            </form>
        </div>
    );
};
