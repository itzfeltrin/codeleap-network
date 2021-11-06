import { NextPage } from "next";
import { useState } from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import { Header } from "../components/layout/Header";
import { PostForm } from "../components/post/PostForm";
import { PostItem } from "../components/post/PostItem";
import classes from "../styles/Feed.module.css";
import * as postActions from "../actions/post.actions";
import { Modal } from "../components/layout/Modal";
import { PostDelete } from "../components/post/PostDelete";
import { PostData } from "../types/post";

const Feed: NextPage = () => {
    const [modalAction, setModalAction] = useState<{
        action: "delete" | "edit";
        post: PostData;
    } | null>(null);

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

    const postDelete = useMutation(postActions.deleteOne, {
        onSuccess: () => {
            posts.refetch();

            setModalAction(null);
        },
    });

    const changeModalAction =
        (post: PostData) => (action: "delete" | "edit") => {
            setModalAction({ action, post });
        };

    return (
        <>
            <main className={classes.container}>
                <Header showActions="session" />
                <div className={classes.content}>
                    <PostForm />
                    {posts.data?.pages.map((page) =>
                        page.results.map((post) => (
                            <PostItem
                                key={`post-${post.id}`}
                                {...{
                                    post,
                                    changeModalAction: changeModalAction(post),
                                }}
                            />
                        ))
                    )}
                    <button
                        onClick={() => posts.fetchNextPage()}
                        aria-label="Load More Posts"
                        disabled={!posts.hasNextPage}
                        className="primary"
                    >
                        <span>Load More</span>
                    </button>
                </div>
            </main>
            <Modal
                open={modalAction !== null}
                onRequestClose={() => setModalAction(null)}
            >
                {modalAction?.action === "delete" ? (
                    <PostDelete
                        onCancel={() => setModalAction(null)}
                        onConfirm={() => postDelete.mutate(modalAction.post.id)}
                    />
                ) : (
                    <PostForm
                        editing={modalAction?.post}
                        afterSubmit={() => setModalAction(null)}
                    />
                )}
            </Modal>
        </>
    );
};

export default Feed;
