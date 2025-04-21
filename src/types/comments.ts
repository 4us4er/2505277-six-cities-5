export type Comments = {
  rating: number;
  comment: string;
  date: string;
  id: string;
  name: string;
  user: {
    name: string;
    avatarUrl: string;
  };
};
