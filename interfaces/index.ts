export type LikedNFTsType = { serieId: string; nftId: string; walletId?: string }

export type ArtistHighlightType = {
  _id: string
  walletId: string
  nonce: string
  reviewRequested: boolean
  verified: boolean
  artist: boolean
  nbFollowers: number
  nbFollowing: number
  name: string
  createdAt: string
  updatedAt: string
  picture: string
  banner: string
  bio: string
  twitterName: string
  twitterVerified: boolean
  twitterVerificationToken: string
  viewsCount: number
}

export type UserType = {
  _id: string
  name: string
  banner?: string
  bio?: string
  verified: boolean
  viewsCount?: number
  walletId: string
  picture?: string
  twitterName?: string
  twitterVerified?: boolean
  customUrl?: string
  personalUrl?: string
  capsAmount?: string
  reviewRequested?: boolean
  likedNFTs?: LikedNFTsType[]
}

export type NftType = {
  id: string
  owner: string
  creator: string
  listed: number
  title?: string
  image?: string
  properties?: {
    preview: {
      ipfs: string
      mediaType: string
    }
    cryptedMedia: {
      ipfs: string
      mediaType: string
    }
    publicPGP: string
  }
  isCapsule: boolean
  timestampList?: string
  price: string
  description?: string
  ownerData: UserType
  creatorData: UserType
  serieId: string
  itemTotal: string
  totalNft?: number
  totalListedNft?: number
  totalFiltered?: number | null
  totalListedInMarketplace?: number
  totalOwnedByRequestingUser?: number
  totalOwnedListedByRequestingUser?: number
  totalOwnedListedInMarketplaceByRequestingUser?: number
  smallestPrice?: string
  itemId: string
  categories: CategoryType[]
  viewsCount?: number
  marketplaceId?: string
  seriesLocked?: boolean
}

export const NFT_EFFECT_BLUR = 'blur'
export const NFT_EFFECT_DEFAULT = 'default'
export const NFT_EFFECT_PROTECT = 'protect'
export const NFT_EFFECT_SECRET = 'secret'

export type NftEffectType =
  | typeof NFT_EFFECT_BLUR
  | typeof NFT_EFFECT_DEFAULT
  | typeof NFT_EFFECT_PROTECT
  | typeof NFT_EFFECT_SECRET

export const NFT_FILE_TYPE_GIF = 'image/gif'
export const NFT_FILE_TYPE_IMAGE = 'image'
export const NFT_FILE_TYPE_JPG = 'image/jpg'
export const NFT_FILE_TYPE_JPEG = 'image/jpeg'
export const NFT_FILE_TYPE_PNG = 'image/png'
export const NFT_FILE_TYPE_VIDEO = 'video'

export type CategoryType = {
  _id: string
  code: string
  name: string
  description?: string
}

export type FollowType = {
  _id: string
  followed: UserType
  follower: UserType
}

export type NFTTransferType = {
  id: string
  nftId: string
  seriesId: string
  from: string
  to: string
  timestamp: Date
  typeOfTransaction: string
  amount: string
  quantity: number
  extrinsicId: string
}

export interface INFTLike {
  nftId: string
  serieId: string
  walletId: string
}

export type CustomResponse<DataType> = {
  totalCount?: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  data: DataType[]
}

export type NFTDataNominalSetState = React.Dispatch<React.SetStateAction<NftType[]>>
