import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import router from 'next/router'
import randomstring from 'randomstring'
import Link from 'next/link'

import { ModalLoader, QRCode } from 'components/base/Modal'
import { AnchorButton } from 'components/ui/Button'
import Icon from 'components/ui/Icon'
import Modal from 'components/ui/Modal'
import { useApp } from 'redux/hooks'
import { SOCKET_URL } from 'utils/constant'
import { connect as connectIo } from 'utils/socket/socket.helper'

export interface ModalEditProps {
  setExpanded: (b: boolean) => void
  data: any
}

const ModalEdit: React.FC<ModalEditProps> = ({ setExpanded, data }) => {
  const [session] = useState(randomstring.generate())
  const [error, setError] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [success, setSuccess] = useState(false)
  const { isRN } = useApp()

  const modalSubtitle = success
    ? 'Profile successfully updated'
    : isRN
    ? 'update in progress...'
    : 'Flash the QR Code on your mobile wallet to update your profile'

  useEffect(() => {
    console.log('socket connect on session', session)
    const socket = connectIo(`/socket/updateProfile`, { session, socketUrl: SOCKET_URL })
    socket.on('connect_error', (e) => {
      console.error('connection error socket', e)
      setExpanded(false)
    })

    socket.on('CONNECTION_SUCCESS', () => {
      if (window.isRNApp) {
        setTimeout(function () {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ action: 'UPDATE_PROFILE', data: { ...data, session, socketUrl: SOCKET_URL } })
          )
        }, 2000)
      } else {
        setShowQR(true)
      }
    })

    socket.on('CONNECTION_FAILURE', (data) => setError(data.msg))

    socket.on('PROFILE_UPDATED', (data) => {
      if (data.success) {
        setSuccess(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
      socket.emit('PROFILE_UPDATED_RECEIVED')
      socket.close()
      setTimeout(() => {
        setExpanded(false)
        router.push('/profile')
      }, 3000)
    })
    socket.on('disconnect', () => {
      setTimeout(() => {
        setExpanded(false)
      }, 3000)
    })
    return function cleanup() {
      socket.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal error={error} setExpanded={setExpanded} subtitle={modalSubtitle} title="Update profile">
      {success ? (
        <>
          <SCheckIcon name="checkMark" />
          <SButtonCointainer>
            <Link href="/profile" passHref>
              <AnchorButton
                color="invertedContrast"
                href="/profile"
                size="medium"
                text="Back to profile"
                variant="contained"
              />
            </Link>
          </SButtonCointainer>
        </>
      ) : (
        <>
          {showQR ? (
            <QRCode data={{ ...data, session, socketUrl: SOCKET_URL }} action={'UPDATE_PROFILE'} />
          ) : (
            <ModalLoader />
          )}
        </>
      )}
    </Modal>
  )
}

const SCheckIcon = styled(Icon)`
  width: 8rem;
  height: 8rem;
  fill: ${({ theme }) => theme.colors.primary500};
`

const SButtonCointainer = styled.div`
  margin-top: 3.2rem;

  a {
    &:hover {
      background: ${({ theme }) => theme.colors.invertedContrast};
      color: ${({ theme }) => theme.colors.contrast};
    }
  }
`

export default ModalEdit
