export const MEMBER_TYPE = {
    OWNER: 'owner',
    CO_OWNER: 'co-owner',
    NORMAL: 'normal',
    GUEST: 'guest',
}

export const DEFAULT_MEMBER_INFO = {
    type: MEMBER_TYPE.GUEST,
    firstName: "",
    lastName: "",
    email: "",
    uid: "",
    photoUrl: "",
    acceptedInvite: false,
}