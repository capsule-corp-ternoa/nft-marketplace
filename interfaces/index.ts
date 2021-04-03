export type UserType = {
  _id: string;
  name: string;
  description?: string;
  verified: boolean;
  nbFollowers: number;
  nbFollowings: number;
  views: number;
  walletId: string;
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
  media?: { url: string };
  cryptedMedia?: { url: string };
  ownerData?: UserType;
  creatorData?: UserType;
};
