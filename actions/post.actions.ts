import axios from "axios";
import { PaginatedResult } from "../types/common";
import { PostData, PostFormData, PostFormUpdateData } from "../types/post";

const api = axios.create({ baseURL: "https://dev.codeleap.co.uk/careers" });

export const getAll = async (
    offset: number
): Promise<PaginatedResult<PostData>> => {
    try {
        const { data } = await api.get("/", { params: { limit: 10, offset } });

        return data;
    } catch (err) {
        throw err;
    }
};

export const createOne = async (post: PostFormData) => {
    try {
        await api.post("/", post);
    } catch (err) {
        throw err;
    }
};

export const updateOne = async ({ id, ...values }: PostFormUpdateData) => {
    try {
        await api.patch(`/${id}/`, values);
    } catch (err) {
        throw err;
    }
};

export const deleteOne = async (id: number) => {
    try {
        await api.delete(`/${id}/`);
    } catch (err) {
        throw err;
    }
};
