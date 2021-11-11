export type UserType = {
  _id: string;
  name: string;
  banner?: string;
  bio?: string;
  verified: boolean;
  viewsCount?: number;
  walletId: string;
  picture?: string;
  twitterName?: string;
  twitterVerified?: boolean;
  customUrl?: string;
  personalUrl?: string;
  capsAmount?: string;
  tiimeAmount?: string;
  reviewRequested?:boolean
  likedNFTs?: { serieId: string, nftId: string }[];
};

export type NftType = {
  id: string;
  owner: string;
  creator: string;
  listed: number;
  title?: string;
  image?: string;
  properties?: {
    preview: {
      ipfs: string,
      mediaType: string
    }
    cryptedMedia: {
      ipfs: string,
      mediaType: string
    }
    publicPGP: string
  }
  timestampList?: string;
  price: string;
  priceTiime: string;
  description?: string;
  ownerData: UserType;
  creatorData: UserType;
  serieId: string;
  itemTotal: string;
  serieData?: NftType[];
  totalNft?: number;
  totalListedNft?: number;
  totalListedInMarketplace?: number;
  totalOwnedByRequestingUser?: number;
  smallestPrice?: string;
  smallestPriceTiime?: string;
  itemId: string;
  categories: CategoryType[];
  viewsCount?: number;
  marketplaceId?: string;
};

export type CategoryType = {
  _id: string;
  code: string;
  name: string;
  description?: string;
}

export type FollowType = {
  _id: string;
  followed: UserType;
  follower: UserType;
}

export type CustomResponse<DataType> = {
  totalCount?: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  data: DataType[]
}