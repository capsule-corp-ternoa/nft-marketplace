/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import randomstring from 'randomstring'

import { ModalLoader, QRCode } from 'components/base/Modal'
import Modal from 'components/ui/Modal'
import { useApp } from 'redux/hooks'
import { SOCKET_URL } from 'utils/constant'
import { navigateToSuccess } from 'utils/functions'
import { connect as connectIo } from 'utils/socket/socket.helper'

export interface ModalBuyProps {
  setExpanded: (b: boolean) => void
  id: string
  seriesId: string
}

const ModalBuy: React.FC<ModalBuyProps> = ({ setExpanded, id, seriesId }) => {
  const [session] = useState(randomstring.generate())
  const router = useRouter()
  const [error, setError] = useState('')
  const [showQR, setShowQR] = useState(false)
  const { isRN } = useApp()

  useEffect(() => {
    console.log('socket connect on session', session)
    const socket = connectIo(`/socket/buyNft`, { session, socketUrl: SOCKET_URL })
    socket.on('connect_error', (e) => {
      console.error('connection error socket', e)
      setExpanded(false)
    })

    socket.on('CONNECTION_SUCCESS', () => {
      if (window.isRNApp) {
        const data = { session, socketUrl: SOCKET_URL, nft_id: id, series_id: seriesId }
        setTimeout(function () {
          window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'BUY', data }))
        }, 2000)
      } else {
        setShowQR(true)
      }
    })

    socket.on('CONNECTION_FAILURE', (data) => setError(data.msg))
    socket.on('NFT_BUY', (data) => {
      if (!data.success) {
        setError('Something went wrong. Please try again.')
      }
      socket.emit('NFT_BUY_RECEIVED')
      socket.close()
      if (data.success) {
        setTimeout(() => {
          navigateToSuccess(
            router,
            'NFT(s) purchased !',
            'Go back to your profile page',
            '/profile',
            false,
            'The NFT(s) will soon appear in your profile page',
            `
             ${id ? `NFT id : ${id}` : ''},
             ${seriesId ? `Series id : ${seriesId}` : ''}
            `
          )
        }, 1000)
      }
    })
    socket.on('disconnect', () => {
      setExpanded(false)
    })
    return function cleanup() {
      socket.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
      error={error}
      setExpanded={setExpanded}
      subtitle={isRN ? 'Transaction in progress...' : 'Flash the QR Code on your mobile wallet to buy this NFT'}
      title="Buy NFT"
    >
      {showQR ? (
        <QRCode data={{ session, socketUrl: SOCKET_URL, nft_id: id, series_id: seriesId }} action={'BUY'} />
      ) : (
        <ModalLoader />
      )}
    </Modal>
  )
}

export default ModalBuy
