import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import {
  Container,
  Input,
  InputLabel,
  InputShell,
  Textarea,
  Wrapper,
} from 'components/base/Layout';
import NftPreview from 'components/base/NftPreview';
import { useCreateNftContext } from 'components/pages/Create/CreateNftContext';
import Tooltip from 'ui/components/Tooltip';
import { NFT_EFFECT_SECRET } from 'interfaces';

import { UserType } from 'interfaces/index';

import { NFTProps } from 'pages/create';

export interface CreateProps {
  user: UserType;
  setModalExpand: (b: boolean) => void;
  setNotAvailable: (b: boolean) => void;
  setModalCreate: (b: boolean) => void;
  NFTData: NFTProps;
  setNFTData: (o: NFTProps) => void;
  processFile: (blurredValue?: number) => Promise<void>;
  setProcessed: (b: boolean) => void;
}

const Create: React.FC<CreateProps> = ({
  setModalExpand,
  setNotAvailable,
  setModalCreate,
  NFTData: initalValue,
  setNFTData: setNftDataToParent,
  user,
  processFile,
  setProcessed,
}) => {
  const { createNftData, setError } = useCreateNftContext() ?? {};
  const { blurredValue, effect, NFT, secretNFT } = createNftData ?? {};

  const [nftData, setNFTData] = useState(initalValue);
  const { name, description, quantity } = nftData;

  const validateQuantity = (value: number, limit: number) => {
    return value > 0 && value <= limit;
  };

  const isDataValid =
    name &&
    description &&
    validateQuantity(quantity, 10) &&
    NFT &&
    (effect !== NFT_EFFECT_SECRET || secretNFT);

  function onChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const nextNftData = { ...nftData, [e.target.name]: e.target.value };
    setNFTData(nextNftData);
    setNftDataToParent(nextNftData);
  }

  function uploadFiles() {
    if (
      !name ||
      !description ||
      !quantity ||
      quantity > 10 ||
      NFT === null ||
      (effect === NFT_EFFECT_SECRET && secretNFT === null)
    ) {
      if (setError !== undefined) setError('Please fill the form entirely.');
      setModalCreate(true);
      return false;
    }
    if (NFT!.type.substr(0, 5) === 'image' && effect !== NFT_EFFECT_SECRET) {
      processFile(blurredValue);
    } else {
      setProcessed(true);
    }
    setModalCreate(true);
  }

  return (
    <Container>
      <Wrapper>
        <Title>Create your NFT</Title>
        <SNftPreview />
        <Form>
          <Left>
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

            <InputShellDescription>
              <InputLabel>Description</InputLabel>
              <Textarea
                placeholder="Tell about the NFT in a few words..."
                name="description"
                value={description}
                onChange={onChange}
              />
            </InputShellDescription>
          </Left>
          <Right>
            <InputShell>
              <InputLabel>
                Category<Insight>(optional)</Insight>
              </InputLabel>
              <Input
                type="text"
                placeholder="NFT Category"
                onChange={onChange}
                name="name"
                value={name}
              />
            </InputShell>

            <InputShell>
              <InputLabel>
                Royalties<Insight>(max: 10%)</Insight>
              </InputLabel>
              <Input
                type="text"
                placeholder="Enter royalties"
                onChange={onChange}
                name="name"
                value={name}
              />
            </InputShell>

            <InputShell>
              <InputLabel>
                Quantity<Insight>(max: 10)</Insight>
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
                Serie ID
                <STooltip text="Specified your own serie id" />
                <Insight>(optional)</Insight>
              </InputLabel>
              <Input
                type="text"
                placeholder="Enter ID"
                onChange={onChange}
                name="name"
                value={name}
              />
            </InputShell>
          </Right>
        </Form>
        <Advice>
          Once the information is entered, it will be impossible to modify it !
        </Advice>
        <CreateButton
          disabled={!(isDataValid && user)}
          onClick={() => isDataValid && user && uploadFiles()}
        >
          Create NFT
        </CreateButton>
      </Wrapper>
      <Footer setNotAvailable={setNotAvailable} />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </Container>
  );
};

const Title = styled.h2`
  font-family: 'Airbnb Cereal App Bold';
  font-size: 3.2rem;
  line-height: 1.3;
  margin: 0;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 6.4rem;
    text-align: left;
  }
`;

const SNftPreview = styled(NftPreview)`
  width: 100%;
  height: auto;
  margin-top: 3.2rem;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 5.4rem;
  }
`;

const Form = styled.form`
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

const Left = styled.div`
  > :first-child {
    margin-top: 0;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    border-right: 1px solid #e0e0e0;
    padding-right: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 13.6rem;
  }
`;

const Right = styled.div`
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 4.8rem;

    > :first-child {
      margin-top: 0;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 13.6rem;
  }
`;

const InputShellDescription = styled(InputShell)`
  flex: 1;
`;

const Insight = styled.span`
  color: #c1c1c1;
  font-family: 'Airbnb Cereal App Book';
  font-size: 1.2rem;
  line-height: 1.3;
  margin-left: 0.8rem;
`;

const STooltip = styled(Tooltip)`
  margin-left: 0.4rem;
`;

const Advice = styled.span`
  color: #7417ea;
  font-size: 1.6rem;
  line-height: 1.3;
  margin: 4rem auto 0;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.xl} {
    margin: 7.2rem auto 0;
  }
`;

const CreateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: #7417ea;
  border: none;
  border-radius: 4rem;
  color: white;
  cursor: pointer;
  font-family: 'Airbnb Cereal App Bold';
  font-size: 1.6rem;
  margin-top: 2.4rem;
  padding: 1.2rem 4.8rem;
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;

  &:hover {
    color: white;
    background-color: black;
  }

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

export default Create;
