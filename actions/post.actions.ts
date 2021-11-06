import axios from "axios";
import { PaginatedResult } from "../types/common";
import { PostData } from "../types/post";

const api = axios.create({ baseURL: "https://dev.codeleap.co.uk/careers" });

export const getAll = async (
    offset: number
): Promise<PaginatedResult<PostData>> => {
    try {
        const { data } = await api.get("/", { params: { limit: 50, offset } });

        return data;
    } catch (err) {
        throw err;
    }
};

export const createOne = async (post: PostData) => {
    try {
        await api.post("/", post);
    } catch (err) {
        throw err;
    }
};
