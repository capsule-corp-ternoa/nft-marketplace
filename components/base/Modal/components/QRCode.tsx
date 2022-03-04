/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode.react'

interface CodeProps {
  data: {
    session: string
    socketUrl: string
    links?: string[]
    nft_id?: string
    fileHash?: string
    price?: number
    walletId?: string
    quantity?: number
    uploadSize?: number
    series_id?: string
  }
  action: string
}

const Code: React.FC<CodeProps> = ({ data, action }) => (
  <SContainer>
    <QRCode
      value={JSON.stringify({ action, data })}
      includeMargin={false}
      renderAs={'svg'}
      size={(data && data.links && data.links.length > 5) || action === 'UPDATE_PROFILE' ? 400 : 200}
    />
  </SContainer>
)

const SContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  border-radius: 1.2rem;
  padding: 2.4rem;
`

export default Code
