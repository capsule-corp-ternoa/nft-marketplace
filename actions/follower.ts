import { UserType, FollowType } from "interfaces";

export const getFollowers = async (walletId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/mp/follow/followers/${walletId}`);
    if (!res.ok) throw new Error();
    let data: FollowType[] = await res.json();
    return data.map(x => x.follower);
};

export const getFollowed = async (walletId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/mp/follow/followed/${walletId}`);
    if (!res.ok) throw new Error();
    let data: FollowType[] = await res.json();
    let followed = data.map(x => x.followed)
    return followed;
};

export const follow = async (walletIdFollowed: string, walletIdFollower: string) => {
    const queryString = `?walletIdFollowed=${walletIdFollowed}&walletIdFollower=${walletIdFollower}`
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/mp/follow/follow/${queryString}`, {
        method: 'POST',
    });
    if (!res.ok) throw new Error();
    let data: UserType = await res.json();
    return data;
};

export const unfollow = async (walletIdFollowed: string, walletIdFollower: string) => {
    const queryString = `?walletIdFollowed=${walletIdFollowed}&walletIdFollower=${walletIdFollower}`
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/mp/follow/unfollow/${queryString}`, {
        method: 'POST',
    });
    if (!res.ok) throw new Error();
    let data: UserType = await res.json();
    return data;
};

export const isUserFollowing = async (walletIdFollowed: string, walletIdFollower: string) => {
    const queryString = `?walletIdFollowed=${walletIdFollowed}&walletIdFollower=${walletIdFollower}`
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODE_API}/api/mp/follow/isUserFollowing/${queryString}`);
    if (!res.ok) throw new Error();
    let data: {isFollowing: boolean} = await res.json();
    return data;
};