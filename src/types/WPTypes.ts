export type WPEndpoints = "posts" | "categories" | "tags" | "pages" | "taxonomies" | "users" | "media" | "upload-image"

export interface WpAuthors {
    username: string
    email: string
    password: string
    personality: string
    categories: WPCategory[]

}

export interface WpPostPrompt {
    systemContent:string,
    userContent_fl:string,
    assistantContent_fl:string,
    instruction:string
}

export interface WpPost {
    title: string
    category: string
    excerpt: string
}

export type WPCategory = "SEO" | "ウェブ解析" | "コンバージョン最適化" | "マーケティング予算計画" | "トレンド分析" | "ROIとKPI" | "SNSマーケティング" | "バイラルマーケティング" | "コンテンツマーケティング" | "インフルエンサーマーケティング" | "Eコマース戦略" | "チャットbotマーケティング" | "Eコマース戦略" | "UXデザイン" | "モバイルマーケティング" | "ARでのマーケティング" | "ブランディング" | "ランディングページ最適化" | "ローカルSEO" | "マーケティングオートメーション" | "イベントマーケティング" | "SMSマーケティング" | "ORM(オンライン評判管理)"

interface ChatMessage {
    role: "function" | "system" | "user" | "assistant"
    content: string
}

export type ChatMessages = ChatMessage[]