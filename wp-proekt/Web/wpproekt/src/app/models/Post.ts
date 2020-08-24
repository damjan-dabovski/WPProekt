import { Comment } from './Comment'
import { Tag } from './Tag'

export interface Post{
    id?: number,
    title: string,
    content: string,
    authorName: string,
    dateCreated?: Date,
    dateModified?: Date,
    comments?: Comment[],
    tags?: Tag[]
    isDraft: boolean
}