export type PaginatedResult<ResultType> = {
    count: number;
    next: string;
    previous: string | null;
    results: ResultType[];
};
