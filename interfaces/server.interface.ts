export interface Reply {
  id: string;
  avatar?: string;
  userName: string;
  comment: string;
  date: string;
  liked: boolean;
}

interface Comment extends Reply {
  reply: Reply[];
}

interface Craving {
  id: string;
  image: string;
  name: string;
  price: string;
  craveNote: string;
  date: string;
  liked: boolean;
  bookmarked: boolean;
  mirror: boolean;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  mirrorCount: number;
  comments: Comment[];
}

interface SatisfiedCraving {
  id: string;
  image: string;
  name: string;
  price: string;
  dateSatisfied: string;
  anonymous: boolean;
  satisfier: string;
}

interface User {
  id: string;
  userName: string;
  avatar: string;
  friends: boolean;
  activeCravings: Craving[];
  satisfiedCravings: SatisfiedCraving[];
}