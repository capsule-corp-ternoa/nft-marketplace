import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { InputLabel, InputShell } from 'components/layout';
import Chip from 'components/ui/Chip';

interface Props<T extends { _id: string; name: string }> {
  className?: string;
  list: T[];
  label: React.ReactNode;
  onChipDelete: (list: T[], id: T['_id']) => void;
  onOptionClick: (option: T) => void;
  options: T[];
}

const Autocomplete = <T extends { _id: string; name: string }>({
  className,
  label,
  list,
  onChipDelete,
  onOptionClick,
  options,
}: Props<T>) => {
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
  const [text, setText] = useState<string>('');

  const inputEl = useRef<HTMLInputElement>(null);

  const handleOptionClick = (option: T) => {
    onOptionClick(option);
    setText('');
    inputEl?.current?.focus();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const newOptions = options.filter(
      ({ name }) =>
        !list.find(({ name: listItemName }) => listItemName === name) && // remove already set categories first
        name.toLocaleLowerCase().includes(newText.toLocaleLowerCase()) // display only matching
    );

    setFilteredOptions(newOptions);
    setText(newText);
  };

  return (
    <SAutocompleteContainer className={className}>
      <InputShell>
        <InputLabel>{label}</InputLabel>
        <SInputWrapper isEmpty={list.length < 1}>
          {list.map(({ _id, name }) => (
            <SChip
              color="primary"
              key={_id}
              isDeletable
              onDelete={() => onChipDelete(list, _id)}
              size="small"
              text={name}
              variant="rectangle"
            />
          ))}
          <input
            type="text"
            ref={inputEl}
            placeholder="Add NFT Categories"
            onChange={onChange}
            name="categories"
            value={text}
          />
          <SInputBorderWrapper id="borderWrapper" />
        </SInputWrapper>
      </InputShell>
      {text && (
        <SOptions>
          <>
            {filteredOptions.map((option) => (
              <SOption
                key={option._id}
                onClick={() => {
                  const index = list.findIndex(({ _id }) => _id === option._id);

                  if (index === -1) {
                    handleOptionClick(option);
                  }
                }}
              >
                <span>{option.name}</span>
              </SOption>
            ))}
            {filteredOptions.length === 0 && (
              <SEmptyLabel>
                No matching, this category does not exist.
              </SEmptyLabel>
            )}
          </>
        </SOptions>
      )}
    </SAutocompleteContainer>
  );
};

const SAutocompleteContainer = styled.div`
  position: relative;
`;

const SInputWrapper = styled.div<{ isEmpty: boolean }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral500};
  border-radius: 0.8rem;
  margin-top: 1.6rem;
  outline: none;
  padding: 1.6rem;
  position: relative;
  z-index: 10;

  & input {
    background: transparent;
    height: 100%;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
    font-family: 'Airbnb Cereal App Book';
    font-size: 1.6rem;
    z-index: 10;

    &::placeholder {
      color: ${({ theme, isEmpty }) =>
        isEmpty ? theme.colors.neutral400 : 'transparent'};
    }

    &:focus + #borderWrapper {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SInputBorderWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  border: 0.2rem solid;
  border-color: rgba(0, 0, 0, 0);
  border-radius: 0.8rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const SChip = styled(Chip)`
  text-transform: capitalize;
  z-index: 10;
`;

const SOptions = styled.ul`
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral500};
  border-radius: 0.8rem;
  list-style-type: none;
  margin: 0;
  padding: 1.6rem;
  position: absolute;
  top: calc(100% - 0.7rem);
  left: 0;
`;

const SEmptyLabel = styled.span`
  color: ${({ theme }) => theme.colors.neutral400};
  font-size: 1.6rem;
  font-style: italic;
  line-height: 1.3;
`;

const SOption = styled.li<{ isActive?: boolean }>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.contrast : theme.colors.neutral400};
  cursor: pointer;
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.fonts.bold};
  line-height: 1.3;
  margin-top: 2rem;
  text-transform: capitalize;

  &:first-child {
    margin-top: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.contrast};
  }
`;

export default Autocomplete;
