export type AuthorizedRequest = Request & { user: { userNo: number; nickname: string } };
