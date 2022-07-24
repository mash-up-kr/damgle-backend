export enum ReactionType {
  angry = 'angry',
  amaziong = 'amazing',
  sad = 'sad',
  best = 'best',
  like = 'like',
}

export type Reaction = {
  userNo: number;
  type: ReactionType;
};
