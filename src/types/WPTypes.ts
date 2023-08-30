export type WPEndpoints = "posts" | "categories" | "tags" | "pages" | "taxonomies" | "users" | "media" | "upload-image"

export interface WPAuthors {
    username: string
    email: string
    password: string
    systemRole: string
    prompts: void[]
}