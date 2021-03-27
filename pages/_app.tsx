import "style/base.scss";

interface Props {
  Component: any;
  pageProps: any;
}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
