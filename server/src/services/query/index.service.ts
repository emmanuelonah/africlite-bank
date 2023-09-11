export type QueryType = {
    page?: string | number;
    limit?: string | number;
};

type PaginationType = QueryType & {
    total: number;
};

export class Query {
    public static DEFAULT_PAGE = 1;
    public static DEFAULT_LIMIT = 0;

    public static getQuery(arg: QueryType) {
        const formattedPage = Number(arg?.page);
        const formattedLimit = Number(arg?.limit);
        const page = Math.floor(Math.abs(formattedPage >= 0 ? formattedPage : Query.DEFAULT_PAGE));
        const limit = Math.floor(Math.abs(formattedLimit >= 0 ? formattedLimit : Query.DEFAULT_LIMIT));
        const skip = limit * (page - 1);

        return { skip, limit };
    }

    public static getPagination({ page, limit, total }: PaginationType) {
        const query = Query.getQuery({ page, limit });
        const pages = Math.floor(total / query.limit);
        const formattedPage = Number(page) > 0 ? page : Query.DEFAULT_PAGE;

        return { ...query, page: formattedPage, pages, total };
    }
}
