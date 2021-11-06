export type PostFormData = {
    username: string;
    title: string;
    content: string;
};

export type PostData = {
    id: number;
    created_datetime: string;
} & PostFormData;
