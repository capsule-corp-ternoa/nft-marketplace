export type UserType = {
  _id: string;
  name: string;
  banner?: string;
  description?: string;
  verified: boolean;
  nbFollowers: number;
  nbFollowing: number;
  views: number;
  walletId: string;
  picture?: string;
  twitter?: string;
  capsAmount?: string;
};

export type NftType = {
  id: string;
  owner: string;
  creator: string;
  listed: number;
  timeStampList?: string;
  uri?: string;
  price: string;
  name?: string;
  description?: string;
  media: { url: string };
  cryptedMedia?: { url: string };
  ownerData: UserType;
  creatorData: UserType;
  serieId: string;
  itemTotal: string;
  itemId: string;
  categories: string[];
};
