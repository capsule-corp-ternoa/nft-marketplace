import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import {
  Advice,
  Container,
  Input,
  InputLabel,
  InputShell,
  Insight,
  Textarea,
  Title,
  Wrapper,
} from 'components/layout';
import NftPreview from 'components/base/NftPreview';
import {
  NFT_EFFECT_DEFAULT,
  NFT_EFFECT_SECRET,
  NftEffectType,
  UserType,
} from 'interfaces';
import Button from 'components/ui/Button';
import Tooltip from 'components/ui/Tooltip';

import { NFTProps } from 'pages/create';
import { canAddToSeries } from 'actions/nft';

type QRDataType = {
  walletId: string;
  quantity: number;
};

export interface CreateProps {
  NFT: File | null;
  NFTData: NFTProps;
  QRData: QRDataType;
  secretNFT: File | null;
  user: UserType;
  setError: (err: string) => void;
  setModalExpand: (b: boolean) => void;
  setModalCreate: (b: boolean) => void;
  setNFT: (f: File | null) => void;
  setNFTData: (o: NFTProps) => void;
  setOutput: (s: string[]) => void;
  setQRData: (data: QRDataType) => void;
  setSecretNFT: (f: File | null) => void;
}

const Create = ({
  NFT,
  NFTData: initalValue,
  QRData,
  secretNFT,
  user,
  setError,
  setModalExpand,
  setModalCreate,
  setNFT,
  setNFTData: setNftDataToParent,
  setOutput,
  setQRData,
  setSecretNFT,
}: CreateProps) => {
  const [effect, setEffect] = useState<NftEffectType>(NFT_EFFECT_DEFAULT);
  const [isRN, setRN] = useState(false);
  const [nftData, setNFTData] = useState(initalValue);
  const [canAddToSeriesValue, setCanAddToSeriesValue] = useState(true)
  const { description, name, quantity, seriesId } = nftData;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!seriesId || seriesId === ""){
        setCanAddToSeriesValue(true)
      }else{
        checkAddToSerie()
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [seriesId, user])

  const checkAddToSerie = async () => {
    if (user){
      const canAdd = await canAddToSeries(seriesId, user.walletId)
      setCanAddToSeriesValue(canAdd)
    }else{
      setCanAddToSeriesValue(false)
    }
  }

  const validateQuantity = (value: number, limit: number) => {
    return value > 0 && value <= limit;
  };

  const isDataValid =
    name &&
    description &&
    validateQuantity(quantity, 10) &&
    secretNFT &&
    (effect !== NFT_EFFECT_SECRET || NFT) &&
    canAddToSeriesValue;

  function onChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const nextNftData = { ...nftData, [e.target.name]: e.target.value };
    setNFTData(nextNftData);
    setNftDataToParent(nextNftData);
  }

  function initMintingNFT() {
    if (!user) throw new Error('Please login to create an NFT.');
    if (!NFT && !(effect === NFT_EFFECT_DEFAULT))
      throw new Error('Elements are undefined');
    setQRData!({
      ...QRData,
      quantity,
    });
    setOutput!([quantity.toString()]);
  }

  async function uploadFiles() {
    try {
      setOutput([]);
      setError('');
      initMintingNFT();
      setModalCreate(true);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  useEffect(() => {
    setRN(window.isRNApp);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Create your NFT</Title>
        <SNftPreviewWrapper>
          <NftPreview
            effect={effect}
            isRN={isRN}
            secretNFT={secretNFT}
            setEffect={setEffect}
            setError={setError}
            setNFT={setNFT}
            setSecretNFT={setSecretNFT}
          />
        </SNftPreviewWrapper>
        <SForm>
          <SLeft>
            <InputShell>
              <InputLabel>Name</InputLabel>
              <Input
                type="text"
                placeholder="Enter name"
                onChange={onChange}
                name="name"
                value={name}
              />
            </InputShell>

            <SInputShellDescription>
              <InputLabel>Description</InputLabel>
              <Textarea
                placeholder="Tell about the NFT in a few words..."
                name="description"
                value={description}
                onChange={onChange}
              />
            </SInputShellDescription>
          </SLeft>
          <SRight>
            {/* TODO in the future with autocomplete */}
            {/* <InputShell>
              <InputLabel>
                Categories<SInsight>(optional)</SInsight>
              </InputLabel>
              <Input
                type="text"
                disabled
                placeholder="NFT Category"
                onChange={onChange}
                name="category"
                value={category}
              />
            </InputShell> */}

            {/* TODO in the future */}
            {/* <InputShell>
              <InputLabel>
                Royalties<SInsight>(max: 10%)</SInsight>
              </InputLabel>
              <Input
                type="text"
                placeholder="Enter royalties"
                onChange={onChange}
                name="royalties"
                value={royalties}
              />
            </InputShell> */}

            <InputShell>
              <InputLabel>
                Quantity<SInsight>(max: 10)</SInsight>
              </InputLabel>
              <Input
                type="text"
                name="quantity"
                value={quantity}
                onChange={onChange}
                placeholder="1"
                isError={!validateQuantity(quantity, 10)}
              />
            </InputShell>

            <InputShell>
              <InputLabel>
                Series ID
                <STooltip text="Specified your own series id. Series must be locked (never listed / transferred) and owned by you" />
                <SInsight>(optional)</SInsight>
              </InputLabel>
              <Input
                type="text"
                placeholder="Enter ID"
                onChange={onChange}
                name="seriesId"
                value={seriesId}
                isError={!canAddToSeriesValue}
              />
            </InputShell>
          </SRight>
        </SForm>
        <SAdvice>
          Once the information is entered, it will be impossible to modify it !
        </SAdvice>
        <SButton
          disabled={!(isDataValid && user)}
          onClick={() => isDataValid && user && uploadFiles()}
          text="Create NFT"
        />
      </Wrapper>
      <Footer />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </Container>
  );
};

const SNftPreviewWrapper = styled.div`
  margin-top: 3.2rem;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 5.4rem;
  }
`;

const SForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;

  > * {
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    align-items: normal;
    flex-direction: row;
    margin-top: 12rem;
  }
`;

const FormSideLayout = styled.div`
  > * {
    margin-top: 4rem;

    ${({ theme }) => theme.mediaQueries.md} {
      margin-top: 6.4rem;
    }

    &:first-child {
      margin-top: 0;
    }
  }
`;

const SLeft = styled(FormSideLayout)`
  ${({ theme }) => theme.mediaQueries.md} {
    border-right: 1px solid #e0e0e0;
    padding-right: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 13.6rem;
  }
`;

const SRight = styled(FormSideLayout)`
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 13.6rem;
  }
`;

const SInputShellDescription = styled(InputShell)`
  flex: 1;
`;

const STooltip = styled(Tooltip)`
  margin-left: 0.4rem;
`;

const SInsight = styled(Insight)`
  margin-left: 0.8rem;
`;

const SAdvice = styled(Advice)`
  margin: 4rem auto 0;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.xl} {
    margin: 7.2rem auto 0;
  }
`;

const SButton = styled(Button)`
  margin-top: 4.8rem;
`;

export default Create;
