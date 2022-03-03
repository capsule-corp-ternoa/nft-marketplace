import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'

type CountdownType = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

interface Props {
  date: Date
}

const Countdown = ({ date }: Props) => {
  const [countdown, setCountdown] = useState<CountdownType>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const then = dayjs(date, 'DD HH mm ss')
      const now = dayjs()
      const newCountdown = dayjs(then.valueOf() - now.valueOf())
      const days = newCountdown.format('DD')
      const hours = newCountdown.format('HH')
      const minutes = newCountdown.format('mm')
      const seconds = newCountdown.format('ss')

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [date])

  return (
    <SContainer>
      {countdown.days !== '00' && countdown.days !== '31' && (
        <SGroup>
          <STimeGroup>
            <SUnit>{countdown.days.split('')[0]}</SUnit>
            <SUnit>{countdown.days.split('')[1]}</SUnit>
          </STimeGroup>
          <SLabel>DAYS</SLabel>
        </SGroup>
      )}
      <SGroup>
        <STimeGroup>
          <SUnit>{countdown.hours.split('')[0]}</SUnit>
          <SUnit>{countdown.hours.split('')[1]}</SUnit>
        </STimeGroup>
        <SLabel>HRS</SLabel>
      </SGroup>
      <SGroup>
        <STimeGroup>
          <SUnit>{countdown.minutes.split('')[0]}</SUnit>
          <SUnit>{countdown.minutes.split('')[1]}</SUnit>
        </STimeGroup>
        <SLabel>MINS</SLabel>
      </SGroup>
      <SGroup>
        <STimeGroup>
          <SUnit>{countdown.seconds.split('')[0]}</SUnit>
          <SUnit>{countdown.seconds.split('')[1]}</SUnit>
        </STimeGroup>
        <SLabel>SECS</SLabel>
      </SGroup>
    </SContainer>
  )
}

const SContainer = styled.div`
  display: flex;
  align-items: center;

  > * {
    &:not(:first-child) {
      margin-left: 0.6rem;
    }
  }
`

const SGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const STimeGroup = styled.div`
  display: flex;
  align-items: center;

  > * {
    &:first-child {
      margin-right: 0.1rem;
    }
  }
`

const SUnit = styled.div`
  width: 1.2rem;
  height: 1.6rem;
  background: ${({ theme }) => theme.colors.contrast};
  border-radius: 0.4rem;
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.2rem;
  padding: 0 0 0.3rem 0.1rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 2rem;
    height: 2.4rem;
    font-size: 1.6rem;
  }
`

const SLabel = styled.div`
  color: ${({ theme }) => theme.colors.neutral600};
  font-size: 0.8rem;
  margin-top: 0.4rem;
  text-transform: capitalize;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 1rem;
  }
`

export default Countdown
