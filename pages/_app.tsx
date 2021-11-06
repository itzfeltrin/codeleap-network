import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useRef } from "react";
import { parseCookies } from "nookies";
import { usernameSlice } from "../redux/usernameSlice";

function MyApp({ Component, pageProps, router }: AppProps) {
    const username = useSelector<{ username: string }>(
        (state) => state.username
    );

    const firstMount = useRef(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (firstMount.current) {
            const cookies = parseCookies(undefined);
            if (cookies && cookies["codeleap.username"]) {
                dispatch(
                    usernameSlice.actions.signIn(cookies["codeleap.username"])
                );
            } else {
                dispatch(usernameSlice.actions.signOut());
            }
            firstMount.current = false;
        } else {
            if (router.pathname === "/" && username !== "") {
                router.push("/feed");
            } else if (username === "") {
                router.push("/");
            }
        }
    }, [dispatch, router, username]);

    return <Component {...pageProps} />;
}

const queryClient = new QueryClient();

const MyAppWrapper = (props: AppProps): JSX.Element => (
    <Provider {...{ store }}>
        <QueryClientProvider client={queryClient}>
            <MyApp {...props} />
        </QueryClientProvider>
    </Provider>
);

export default MyAppWrapper;
