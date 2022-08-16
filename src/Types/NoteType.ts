export type Note = {
    _id?: string,
    pinned?: boolean,
    title: string,
    description: string,
    tag: string,
    priority: string,
    selectedBackgroundColor: string,
    createdDate?: string,
    createdTime?: string,
}