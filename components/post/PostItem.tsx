import { PostData } from "../../types/post";
import { Header } from "../layout/Header";
import classes from "./PostItem.module.css";
import moment from "moment";

type PostItemProps = {
    post: PostData;
};

export const PostItem = ({ post }: PostItemProps): JSX.Element => {
    return (
        <div className={classes.container}>
            <Header title={post.title} />
            <div className={classes.content}>
                <div className={classes.row}>
                    <span className={classes.username}>@{post.username}</span>
                    <span className={classes.createdDatetime}>
                        {moment(post.created_datetime).fromNow()}
                    </span>
                </div>
                <p className={classes.postContent}>{post.content}</p>
            </div>
        </div>
    );
};
