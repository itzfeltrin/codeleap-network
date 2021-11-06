import { NextPage } from "next";
import { useInfiniteQuery } from "react-query";
import { Header } from "../components/layout/Header";
import { PostForm } from "../components/post/PostForm";
import { PostItem } from "../components/post/PostItem";
import classes from "../styles/Feed.module.css";
import * as postActions from "../actions/post.actions";

const Feed: NextPage = () => {
    const posts = useInfiniteQuery(
        "/posts",
        ({ pageParam = 0 }) => postActions.getAll(pageParam * 10),
        {
            refetchOnWindowFocus: false,
            getNextPageParam: (lastPage) => {
                if (!lastPage.next) return null;
                const nextPage = Number(
                    lastPage.next.split("&")[1].replace(/\D/g, "")
                );
                return lastPage.count < nextPage
                    ? lastPage.count / 10
                    : nextPage / 10;
            },
        }
    );

    return (
        <main className={classes.container}>
            <Header />
            <div className={classes.content}>
                <PostForm />
                {posts.data?.pages.map((page) =>
                    page.results.map((post) => (
                        <PostItem key={`post-${post.id}`} {...{ post }} />
                    ))
                )}
                <button
                    className="primary"
                    disabled={!posts.hasNextPage}
                    onClick={() => posts.fetchNextPage()}
                >
                    <span>Load More</span>
                </button>
            </div>
        </main>
    );
};

export default Feed;
