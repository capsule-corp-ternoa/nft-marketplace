import React, { useRef, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import styled from 'styled-components'
import { InputLabel, InputShell } from 'components/layout'
import Chip from 'components/ui/Chip'

interface Props<T extends { _id: string; name: string }> {
  className?: string
  list: T[]
  label: React.ReactNode
  maxOptionsShowed?: number
  onChipDelete: (list: T[], id: T['_id']) => void
  onOptionClick: (option: T) => void
  options: T[]
}

const Autocomplete = <T extends { _id: string; name: string }>({
  className,
  label,
  list,
  maxOptionsShowed = 5,
  onChipDelete,
  onOptionClick,
  options,
}: Props<T>) => {
  const [isShowOptions, setIsShowOptions] = useState<boolean>(false)
  const [text, setText] = useState<string>('')

  const inputEl = useRef<HTMLInputElement>(null)
  const isMoreOptions = options.length > 0

  const filterTextMatching = (option: T) => option.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())

  const handleOptionClick = (option: T) => {
    onOptionClick(option)
    setText('')
    inputEl?.current?.focus()
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return (
    <SAutocompleteContainer className={className}>
      <InputShell>
        <SInputLabel>{label}</SInputLabel>
        <ClickAwayListener
          onClickAway={() => {
            setIsShowOptions(false)
            inputEl?.current?.blur()
          }}
        >
          <SInputWrapper isEmpty={list.length < 1}>
            {list.map(({ _id, name }) => (
              <SChip
                color="primary500"
                key={_id}
                isDeletable
                onDelete={() => {
                  onChipDelete(list, _id)
                  inputEl?.current?.focus()
                }}
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
              onFocus={() => setIsShowOptions(true)}
              name="categories"
              value={text}
            />
            <SInputBorderWrapper id="borderWrapper" isShowOptions={isShowOptions} />
            {(text || isShowOptions) && (
              <SOptions>
                <>
                  {options
                    .filter(filterTextMatching)
                    .slice(0, maxOptionsShowed)
                    .map((option) => (
                      <SOption
                        key={option._id}
                        onClick={() => {
                          const index = list.findIndex(({ _id }) => _id === option._id)

                          if (index === -1) {
                            handleOptionClick(option)
                          }
                        }}
                      >
                        <span>{option.name}</span>
                      </SOption>
                    ))}
                  {isMoreOptions ? (
                    text &&
                    options.filter(filterTextMatching).length === 0 && (
                      <SEmptyLabel>No matching, this category does not exist.</SEmptyLabel>
                    )
                  ) : (
                    <SEmptyLabel>All available categories are set</SEmptyLabel>
                  )}
                </>
              </SOptions>
            )}
          </SInputWrapper>
        </ClickAwayListener>
      </InputShell>
    </SAutocompleteContainer>
  )
}

const SAutocompleteContainer = styled.div`
  position: relative;
`

const SInputLabel = styled(InputLabel)`
  margin-bottom: 1.6rem;
`

const SInputWrapper = styled.div<{ isEmpty: boolean }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: 0.8rem;
  outline: none;
  padding: 1.6rem;
  position: relative;
  z-index: 10;

  & input {
    background: transparent;
    height: 100%;
    padding: 4px 6px;
    width: 0;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
    font-size: 1.6rem;
    z-index: 10;

    &::placeholder {
      color: ${({ theme, isEmpty }) => (isEmpty ? theme.colors.neutral300 : 'transparent')};
    }

    &:focus + #borderWrapper {
      border-color: ${({ theme }) => theme.colors.primary500};
    }
  }
`

const SInputBorderWrapper = styled.div<{ isShowOptions: boolean }>`
  width: 100%;
  height: 100%;
  background: transparent;
  border: 0.2rem solid;
  border-color: ${({ isShowOptions, theme }) => (isShowOptions ? theme.colors.primary500 : 'rgba(0, 0, 0, 0)')};
  border-radius: 0.8rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
`

const SChip = styled(Chip)`
  text-transform: capitalize;
  z-index: 10;
`

const SOptions = styled.ul`
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: 0 0 0.8rem 0.8rem;
  box-shadow: ${({ theme }) => theme.shadows.popupShadow};
  list-style-type: none;
  margin: 0;
  max-height: 8.8rem;
  overflow-y: scroll;
  padding: 1.6rem;
  position: absolute;
  top: calc(100% - 0.3rem);
  left: 50%;
  transform: translateX(calc(-50% + 0px));
  z-index: 5;
`

const SEmptyLabel = styled.span`
  color: ${({ theme }) => theme.colors.neutral300};
  font-size: 1.6rem;
  font-style: italic;
  line-height: 1.3;
`

const SOption = styled.li<{ isActive?: boolean }>`
  color: ${({ theme, isActive }) => (isActive ? theme.colors.contrast : theme.colors.neutral300)};
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
`

export default Autocomplete
