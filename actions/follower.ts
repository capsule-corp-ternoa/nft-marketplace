import { UserType } from "interfaces";
import { DEFAULT_LIMIT_PAGINATION } from "./nft";

export const getFollowers = async (walletId: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, searchText?: string, certifiedOnly?: string) => {
    const query = `${searchText ? `&nameOrAddressSearch=${searchText}`: ""}${certifiedOnly ? `&certifiedOnly=${certifiedOnly}` : ""}`
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/follow/followers/${walletId}?page=${page}&limit=${limit}${query}`);
    if (!res.ok) throw new Error();
    let result = await res.json();
    return result;
};

export const getFollowed = async (walletId: string, page: string="1", limit: string=DEFAULT_LIMIT_PAGINATION, searchText?: string, certifiedOnly?: string) => {
    const query = `${searchText ? `&nameOrAddressSearch=${searchText}`: ""}${certifiedOnly ? `&certifiedOnly=${certifiedOnly}` : ""}`
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/follow/followed/${walletId}?page=${page}&limit=${limit}${query}`);
    if (!res.ok) throw new Error();
    let result = await res.json();
    return result;
};

export const follow = async (walletIdFollowed: string, walletIdFollower: string) => {
    const queryString = `?walletIdFollowed=${walletIdFollowed}&walletIdFollower=${walletIdFollower}`
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/follow/follow/${queryString}`, {
        method: 'POST',
    });
    if (!res.ok) throw new Error();
    let data: UserType = await res.json();
    return data;
};

export const unfollow = async (walletIdFollowed: string, walletIdFollower: string) => {
    const queryString = `?walletIdFollowed=${walletIdFollowed}&walletIdFollower=${walletIdFollower}`
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/follow/unfollow/${queryString}`, {
        method: 'POST',
    });
    if (!res.ok) throw new Error();
    let data: UserType = await res.json();
    return data;
};

export const isUserFollowing = async (walletIdFollowed: string, walletIdFollower: string) => {
    const queryString = `?walletIdFollowed=${walletIdFollowed}&walletIdFollower=${walletIdFollower}`
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/follow/isUserFollowing/${queryString}`);
    if (!res.ok) throw new Error();
    let data: {isFollowing: boolean} = await res.json();
    return data;
};