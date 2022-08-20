export type AuthorizedRequest = Request & { user: RequestUser };

export type RequestUser = { userNo: number; nickname: string };
