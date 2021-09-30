# Secret NFT

"SecretNFT" is a NFTs marketplace for digital creators. Discover Tokenized Digital Art. Artists issue authenticated single edition digital artworks. These are certified on the Ternoa blockchain to prevent forgery. Each artwork is authentically created by an artist in the network, and tokenized as a collectible digital item that you can own, display and trade.

Visit [SecretNFT](https://www.secret-nft.com/)

## Summary
- [Installation](#Installation)
- [Usage](#Usage)
- [Information](#Information)
- [Environment variables](#Environment-variables)
- [White Label](#White-label)
- [Contributing](#Contributing)
- [License](#License)

## Installation
Using NPM
```bash
  git clone https://github.com/capsule-corp-ternoa/nft-marketplace.git
  cd nft-marketplace
  npm install
```

## Usage
You need to set up environnent variables to target the correct API.
You can find at more information on the Environment variables section.

To run in development
```bash
npm run dev
```
To build the project
```bash
npm run build
```

## Information
Secret NFT's code rely most on its api to get the data for its users and nfts. Don't hesitate to have a look on it on our organisation [github](https://github.com/capsule-corp-ternoa.)

## Environment variables
To run this project, you will need to add the following environment variables to your .env file

| VARIABLE | VALUE | USAGE |
| :---|---|--- |
| NEXT_PUBLIC_NODE_API | https://your-api-deployed.com | URL of the api |
| NEXT_PUBLIC_IS_NFT_CREATION_ENABLED | true or false | Enable or disable the creation of NFT |
| NEXT_PUBLIC_SECRET_COOKIE | AStrongPassword101 | Secure the cookie on the app |
| NEXT_PUBLIC_SENTRY_DSN | https://projectId@sentry.io/x | The url to your sentry project if you want to monitor activity |
| SENTRY_AUTH_TOKEN | xxxxxxxxxxxxxx | Your auth token if you use Sentry |
| SENTRY_ENV | development or production or ... | Allow to separate monitoring on environment |

## White Label
To run your own marketplace, get in touch with us to get approved.
Once it's done and you have your Marketplace Identifier you can add these env variables to overrides the default app values.
| VARIABLE | VALUE | USAGE |
| :---|---|--- |
| NEXT_PUBLIC_MARKETPLACE_ID | 0 | Value of the given marketplace id |
| NEXT_PUBLIC_APP_LINK | https://my-marketplace.com | URL to your app |
| NEXT_PUBLIC_APP_NAME| My Marketplace | Name of your app |
| NEXT_PUBLIC_APP_LOGO_PATH | /logo.png or /logo.svg or https://images.com/my-logo | path (from public folder) or url to your logo |
| NEXT_PUBLIC_TELEGRAM_LINK | https://t.me/... or false | Telegram link, false to disable |
| NEXT_PUBLIC_TWITTER_LINK | https://twitter.com/... or false | Twitter link, false to disable |
| NEXT_PUBLIC_LINKEDIN_LINK | https://www.linkedin.com/... or false | LinkedIn link, false to disable |
| NEXT_PUBLIC_INSTAGRAM_LINK | https://www.instagram.com/... or false | Instagram link, false to disable |
| NEXT_PUBLIC_GITHUB_LINK | https://github.com/... or false | Github link, false to disable |
| NEXT_PUBLIC_YOUTUBE_LINK | https://www.youtube.com/channel/... or false | Youtube link, false to disable |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT ?](https://choosealicense.com/licenses/mit/)
