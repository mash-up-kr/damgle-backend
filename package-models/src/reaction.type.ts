import { InvalidReactionTypeError } from '@damgle/errors';

export enum ReactionType {
  angry = 'angry',
  amazing = 'amazing',
  sad = 'sad',
  best = 'best',
  like = 'like',
}

export type Reaction = {
  userNo: number;
  nickname: string;
  type: ReactionType;
};

export function assertReactionType(value: any): asserts value is ReactionType {
  if (
    ![
      // ReactionType은 총 다섯가지 종류가 있음
      ReactionType.amazing,
      ReactionType.angry,
      ReactionType.best,
      ReactionType.like,
      ReactionType.sad,
    ].includes(value)
  ) {
    throw new InvalidReactionTypeError({ type: value });
  }
}
