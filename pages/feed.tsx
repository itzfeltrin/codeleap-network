import { NextPage } from "next";
import { useState } from "react";
import { Header } from "../components/layout/Header";
import { PostForm } from "../components/post/PostForm";
import { PostItem } from "../components/post/PostItem";
import classes from "../styles/Feed.module.css";
import { PostData } from "../types/post";

const Feed: NextPage = () => {
    const [posts, changePosts] = useState<PostData[]>([
        {
            id: 0,
            username: "Pedro",
            title: "My First Post at CodeLeap Network!",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum tenetur illum est officiis aut soluta corrupti nostrum voluptatem repudiandae officia accusantium porro tempore modi ut maiores, ipsa expedita quam doloribus asperiores. Ad expedita maxime quo quam optio quia perferendis nam!",
            created_datetime: new Date().toISOString(),
        },
    ]);

    return (
        <main className={classes.container}>
            <Header />
            <div className={classes.content}>
                <PostForm />
                {posts.map((post) => (
                    <PostItem key={`post-${post.id}`} {...{ post }} />
                ))}
            </div>
        </main>
    );
};

export default Feed;
