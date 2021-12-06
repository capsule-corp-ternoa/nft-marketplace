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
  NFT_EFFECT_BLUR,
  NFT_EFFECT_DEFAULT,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
  CategoryType,
  NftEffectType,
  UserType,
} from 'interfaces';
import Autocomplete from 'components/ui/Autocomplete';
import Button from 'components/ui/Button';
import Tooltip from 'components/ui/Tooltip';

import { NFTProps } from 'pages/create';
import { canAddToSeries } from 'actions/nft';
import { processFile } from 'utils/imageProcessing/image';

const DEFAULT_BLUR_VALUE = 5;

type QRDataType = {
  walletId: string;
  quantity: number;
};

export interface CreateProps {
  categoriesOptions: CategoryType[];
  NFTData: NFTProps;
  originalNFT: File | null;
  QRData: QRDataType;
  user: UserType;
  setError: (err: string) => void;
  setModalExpand: (b: boolean) => void;
  setModalCreate: (b: boolean) => void;
  setNFTData: (o: NFTProps) => void;
  setOriginalNFT: (f: File | null) => void;
  setOutput: (s: string[]) => void;
  setPreviewNFT: (f: File | null) => void;
  setQRData: (data: QRDataType) => void;
}

const Create = ({
  categoriesOptions,
  NFTData: initalValue,
  originalNFT,
  QRData,
  user,
  setError,
  setModalExpand,
  setModalCreate,
  setNFTData: setNftDataToParent,
  setOriginalNFT,
  setOutput,
  setPreviewNFT,
  setQRData,
}: CreateProps) => {
  const [blurValue, setBlurValue] = useState<number>(DEFAULT_BLUR_VALUE);
  const [coverNFT, setCoverNFT] = useState<File | null>(null); // Cover NFT used for secret effect
  const [effect, setEffect] = useState<NftEffectType>(NFT_EFFECT_DEFAULT);
  const [isRN, setRN] = useState(false);
  const [nftData, setNFTData] = useState(initalValue);
  const [canAddToSeriesValue, setCanAddToSeriesValue] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { categories, description, name, quantity, seriesId } = nftData;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (!seriesId || seriesId === '') {
        setCanAddToSeriesValue(true);
        setIsLoading(false);
      } else {
        checkAddToSerie();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [seriesId, user]);

  const checkAddToSerie = async () => {
    try {
      if (user) {
        const canAdd = await canAddToSeries(seriesId, user.walletId);
        setCanAddToSeriesValue(canAdd);
      } else {
        setCanAddToSeriesValue(true);
      }
      setIsLoading(false);
    } catch (err) {
      setCanAddToSeriesValue(false);
      setIsLoading(false);
      console.log(err);
    }
  };

  const validateQuantity = (value: number, limit: number) => {
    return value > 0 && value <= limit;
  };

  const isDataValid =
    name &&
    description &&
    validateQuantity(quantity, 10) &&
    originalNFT &&
    (effect !== NFT_EFFECT_SECRET || coverNFT) &&
    canAddToSeriesValue &&
    !isLoading;

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const nextNftData = { ...nftData, [e.target.name]: e.target.value };
    setNFTData(nextNftData);
    setNftDataToParent(nextNftData);
  };

  const handleCategoryChipDelete = (
    list: CategoryType[],
    id: CategoryType['_id']
  ) => {
    const nextNftData = {
      ...nftData,
      categories: list.filter((item) => item._id !== id),
    };
    setNFTData(nextNftData);
    setNftDataToParent(nextNftData);
  };

  const handleCategoryOptionClick = (option: CategoryType) => {
    const nextNftData = {
      ...nftData,
      categories: categories.concat(option),
    };
    setNFTData(nextNftData);
    setNftDataToParent(nextNftData);
  };

  const initMintingNFT = async () => {
    try {
      if (!user) throw new Error('Please login to create an NFT.');
      setModalCreate(true);

      if (originalNFT !== null) {
        if (effect === NFT_EFFECT_BLUR || effect === NFT_EFFECT_PROTECT) {
          const processedNFT = await processFile(
            originalNFT,
            effect,
            setError,
            blurValue
          );
          if (processedNFT === undefined || processedNFT === null)
            throw new Error(
              `Elements are undefined after file processing using ${effect} effect.`
            );
          setPreviewNFT(processedNFT);
        } else if (effect === NFT_EFFECT_SECRET) {
          if (coverNFT === null)
            throw new Error('Please add a cover NFT using a secret effect.');
          setPreviewNFT(coverNFT);
        }
      }

      setQRData({
        ...QRData,
        quantity,
      });
      setOutput([quantity.toString()]);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(err as string);
      }
    }
  };

  const uploadFiles = async () => {
    setOutput([]);
    setError('');

    try {
      initMintingNFT();
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(err as string);
      }
    }
  };

  useEffect(() => {
    setCoverNFT(null);
  }, [originalNFT]);

  useEffect(() => {
    setRN(window.isRNApp);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Create your NFT</Title>
        <SNftPreviewWrapper>
          <NftPreview
            blurValue={blurValue}
            coverNFT={coverNFT}
            effect={effect}
            isRN={isRN}
            originalNFT={originalNFT}
            setBlurValue={setBlurValue}
            setCoverNFT={setCoverNFT}
            setEffect={setEffect}
            setError={setError}
            setIsLoading={setIsLoading}
            setOriginalNFT={setOriginalNFT}
          />
        </SNftPreviewWrapper>
        <SForm>
          <SLeft>
            <InputShell>
              <InputLabel>Name</InputLabel>
              <Input
                type="text"
                placeholder="Enter name"
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </SInputShellDescription>
          </SLeft>
          <SRight>
            <Autocomplete<CategoryType>
              label={
                <>
                  Categories<SInsight>(optional)</SInsight>
                </>
              }
              list={categories}
              onChipDelete={handleCategoryChipDelete}
              onOptionClick={handleCategoryOptionClick}
              /* Remove already set categories */
              options={categoriesOptions.filter(
                ({ name }) =>
                  !categories.find(
                    ({ name: listItemName }) => listItemName === name
                  )
              )}
            />

            {/* TODO in the future */}
            {/* <InputShell>
              <InputLabel>
                Royalties<SInsight>(max: 10%)</SInsight>
              </InputLabel>
              <Input
                type="text"
                placeholder="Enter royalties"
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="1"
                isError={!validateQuantity(quantity, 10)}
              />
            </InputShell>

            <InputShell>
              <InputLabel>
                Series ID
                <STooltip text="Specified your own series id. Series must be locked (never listed / transferred) and owned by you." />
                <SInsight>(optional)</SInsight>
              </InputLabel>
              <Input
                type="text"
                placeholder="Enter ID"
                onChange={handleChange}
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
          onClick={uploadFiles}
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
  margin-top: 4rem;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 4.8rem;
    margin-top: 0;
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
  margin: 4.8rem 0;

  ${({ theme }) => theme.mediaQueries.xl} {
    margin: 4.8rem 0 9.6rem;
  }
`;

export default Create;
