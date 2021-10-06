import { CustomResponse, UserType } from "interfaces";
import { NODE_API_URL } from "utils/constant";
import { DEFAULT_LIMIT_PAGINATION } from "../utils/constant";

export const getFollowers = async (walletId: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, searchText?: string, certifiedOnly?: string) => {
    const query = `${searchText ? `&nameOrAddressSearch=${searchText}`: ""}${certifiedOnly ? `&certifiedOnly=${certifiedOnly}` : ""}`
    const res = await fetch(`${NODE_API_URL}/api/follow/followers/${walletId}?page=${page}&limit=${limit}${query}`);
    if (!res.ok) throw new Error();
    let result = await res.json() as CustomResponse<UserType>;
    return result;
};

export const getFollowed = async (walletId: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, searchText?: string, certifiedOnly?: string) => {
    const query = `${searchText ? `&nameOrAddressSearch=${searchText}`: ""}${certifiedOnly ? `&certifiedOnly=${certifiedOnly}` : ""}`
    const res = await fetch(`${NODE_API_URL}/api/follow/followed/${walletId}?page=${page}&limit=${limit}${query}`);
    if (!res.ok) throw new Error();
    let result = await res.json() as CustomResponse<UserType>;
    return result;
};

export const follow = async (walletIdFollowed: string, walletIdFollower: string) => {
    const queryString = `?walletIdFollowed=${walletIdFollowed}&walletIdFollower=${walletIdFollower}`
    const res = await fetch(`${NODE_API_URL}/api/follow/follow/${queryString}`, {
        method: 'POST',
    });
    if (!res.ok) throw new Error();
    let data: UserType = await res.json();
    return data;
};

export const unfollow = async (walletIdFollowed: string, walletIdFollower: string) => {
    const queryString = `?walletIdFollowed=${walletIdFollowed}&walletIdFollower=${walletIdFollower}`
    const res = await fetch(`${NODE_API_URL}/api/follow/unfollow/${queryString}`, {
        method: 'POST',
    });
    if (!res.ok) throw new Error();
    let data: UserType = await res.json();
    return data;
};

export const isUserFollowing = async (walletIdFollowed: string, walletIdFollower: string) => {
    const queryString = `?walletIdFollowed=${walletIdFollowed}&walletIdFollower=${walletIdFollower}`
    const res = await fetch(`${NODE_API_URL}/api/follow/isUserFollowing/${queryString}`);
    if (!res.ok) throw new Error();
    let data: {isFollowing: boolean} = await res.json();
    return data;
};

export const getFollowersCount = async (walletId: string) => {
    const res = await fetch(`${NODE_API_URL}/api/follow/countFollowers/${walletId}`);
    if (!res.ok) throw new Error();
    let result = await res.json() as number;
    return result;
};

export const getFollowedCount = async (walletId: string) => {
    const res = await fetch(`${NODE_API_URL}/api/follow/countFollowed/${walletId}`);
    if (!res.ok) throw new Error();
    let result = await res.json() as number;
    return result;
};