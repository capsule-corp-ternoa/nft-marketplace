import { useEffect, useState } from 'react';
import 'style/base.scss';
import Close from 'components/assets/close';

interface Props {
  Component: any;
  pageProps: any;
}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  const [cookiesConsent, setCookiesConsent] = useState<string | null>(null);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    setCookiesConsent(localStorage.getItem('cookiesConsent'));
  }, []);
  return (
    <>
      <Component {...pageProps} />
      {!cookiesConsent && !hide && (
        <div className="cookies">
          We use cookies.
          <a
            className="cookiesLink"
            href="https://intercom.help/ternoa/fr/collections/2774679-legal"
          >
            Learn more
          </a>
          <Close
            className="cross"
            onClick={() => {
              localStorage.setItem('cookiesConsent', 'true');
              setHide(true);
            }}
          />
        </div>
      )}
    </>
  );
};

export default App;
