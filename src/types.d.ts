/* eslint-disable @typescript-eslint/no-explicit-any */
type LoadablePageType = {
  setIsLoading: (flag: boolean) => void;
};

type CategoryType = {
  id: number;
  name: string;
  position?: number;
};

type NftObjectType = {
  id: number;
  labels: number[];
  name: string;
  quantity: string;
  price: string;
  image: string;
  views: number;
  owner: string;
  creator: string;
  ownerPicture: string;
  creatorPicture: string;
  collectionName: string;
};

type UserType = {
  id: integer;
  displayName: string;
  customUrl: string;
  bio: string;
  twitter: string;
  site: string;
};

// For spinner
declare module 'react-loader-spinner' {
  // Main Interface for the props
  interface LoaderProps<T = {}> {
    /**
     * @property _visible_ | Show/ Hide the loader as required
     * @default  false
     */
    visible?: boolean;
    /**
     * @property _type_ | Type of spinner you want to display
     * @default Audio
     */
    type:
    | 'Audio'
    | 'BallTriangle'
    | 'Bars'
    | 'Circles'
    | 'Grid'
    | 'Hearts'
    | 'Oval'
    | 'Puff'
    | 'Rings'
    | 'TailSpin'
    | 'ThreeDots'
    | 'Watch'
    | 'RevolvingDot'
    | 'Triangle'
    | 'Plane'
    | 'MutatingDots'
    | 'CradleLoader';
    /**
     * @property _height_ | Height prop define the height of the svg spinner.
     * @default 80px
     */
    height?: number;
    /**
     * @property _width_ | Width prop define the width of the spinner.
     * @default 80px
     */
    width?: number;
    /**
     * @property _color_ | color prop is for adding color to the spinner
     * @default Blue
     */
    color?: string;
    /**
     * @property _secondaryColor_ | secondaryColor prop  for now is available on Plane and MutatingDots loaders
     * @default Grey
     */
    secondaryColor?: string;
    /**
     * @property _timeout_ | Duration in miliseconds after which spinner is disable
     * d@default 0
     */
    timeout?: number;
    /**
     * @property _radius_ | Set radius if the loader has a circle element in it
     * @default value_varies
     */
    radius?: number;
  }
  export default class Loader extends React.Component<LoaderProps> {
    constructor(props: LoaderProps);
  }
}

declare global {
  interface Document {
    /** documentation on foo */
    ethereum: string;
  }
}