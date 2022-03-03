import { CustomResponse, UserType } from 'interfaces'
import { NODE_API_URL } from 'utils/constant'
import { DEFAULT_LIMIT_PAGINATION } from '../utils/constant'
import Cookies from 'js-cookie'

export const getFollowers = async (
  walletId: string,
  page = '1',
  limit: string = DEFAULT_LIMIT_PAGINATION,
  searchText?: string,
  verified?: boolean
) => {
  const pagination = { page, limit }
  const filter: any = {}
  if (searchText) filter.searchText = searchText
  if (verified !== undefined) filter.verified = verified
  const res = await fetch(
    `${NODE_API_URL}/api/follow/followers/${walletId}?pagination=${JSON.stringify(pagination)}&filter=${JSON.stringify(
      filter
    )}`
  )
  if (!res.ok) throw new Error()
  const result = (await res.json()) as CustomResponse<UserType>
  return result
}

export const getFollowed = async (
  walletId: string,
  page = '1',
  limit: string = DEFAULT_LIMIT_PAGINATION,
  searchText?: string,
  verified?: boolean
) => {
  const pagination = { page, limit }
  const filter: any = {}
  if (searchText) filter.searchText = searchText
  if (verified !== undefined) filter.verified = verified
  const res = await fetch(
    `${NODE_API_URL}/api/follow/followed/${walletId}?pagination=${JSON.stringify(pagination)}&filter=${JSON.stringify(
      filter
    )}`
  )
  if (!res.ok) throw new Error()
  const result = (await res.json()) as CustomResponse<UserType>
  return result
}

export const getFollowersCount = async (walletId: string) => {
  const res = await fetch(`${NODE_API_URL}/api/follow/countFollowers/${walletId}`)
  if (!res.ok) throw new Error()
  const result = (await res.json()) as number
  return result
}

export const getFollowedCount = async (walletId: string) => {
  const res = await fetch(`${NODE_API_URL}/api/follow/countFollowed/${walletId}`)
  if (!res.ok) throw new Error()
  const result = (await res.json()) as number
  return result
}

export const isUserFollowing = async (walletIdFollowed: string, walletIdFollower: string) => {
  const queryString = `?walletIdFollowed=${walletIdFollowed}&walletIdFollower=${walletIdFollower}`
  const res = await fetch(`${NODE_API_URL}/api/follow/isUserFollowing/${queryString}`)
  if (!res.ok) throw new Error()
  const data: { isFollowing: boolean } = await res.json()
  return data
}

export const follow = async (walletIdFollowed: string, walletIdFollower: string) => {
  const cookie = Cookies.get('token')
  const queryString = `?walletIdFollowed=${walletIdFollowed}&walletIdFollower=${walletIdFollower}`
  if (cookie) {
    const res = await fetch(`${NODE_API_URL}/api/follow/follow/${queryString}`, {
      method: 'POST',
      body: JSON.stringify({ cookie }),
    })
    if (!res.ok) throw new Error()
    const data: UserType = await res.json()
    return data
  } else {
    throw new Error('Unvalid authentication')
  }
}

export const unfollow = async (walletIdFollowed: string, walletIdFollower: string) => {
  const cookie = Cookies.get('token')
  const queryString = `?walletIdFollowed=${walletIdFollowed}&walletIdFollower=${walletIdFollower}`
  if (cookie) {
    const res = await fetch(`${NODE_API_URL}/api/follow/unfollow/${queryString}`, {
      method: 'POST',
      body: JSON.stringify({ cookie }),
    })
    if (!res.ok) throw new Error()
    const data: UserType = await res.json()
    return data
  } else {
    throw new Error('Unvalid authentication')
  }
}
