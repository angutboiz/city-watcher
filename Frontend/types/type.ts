export interface IUser {
    _id?: string
    displayName?: string
    phoneNumber?: string
    email?: string
    verify?: boolean
    zone?: string
    roles?: string
    status?: boolean
    profilePicture?: string
    otp?: number
    expire_otp?: string
    refreshToken?: string
    createdAt?: string
    updatedAt?: string
}

export interface IFormInputIncident {
    title: string
    reciver_id: string
    category_id: string
    desc: string
    image: string[]
    location: string
}
