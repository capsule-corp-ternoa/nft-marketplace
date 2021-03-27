export type CreatorType = {
  id: number;
  name: string;
  img: string;
  caps?: number;
  verified: boolean;
};

export type NftType = {
  id: number;
  img: string;
  secret: boolean;
  creator: CreatorType;
  price: number;
};
