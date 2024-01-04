export type CommentType = {
    user: string
    comment: string
    date: Date
}

export type OrderType = {
    user: string
    songs: string[]
    date: Date
}

export type SongType = {
    title:string
    artist:string
    album:string
    genre?:string
    year?:string
    duration:number
    album_image?:string
    comments?:string[]
    creator:string
    price?:string
    preview_url?:string
    youtube_id?:string
    numOfPurchases?:string
}

export type UserType = {
    name:string
    email:string
    password:string
    songs?:string[]
    profile_image?:string
    refreshTokens?:string[]
}