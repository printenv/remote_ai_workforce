import * as dotenv from "dotenv"
dotenv.config()
import { WpAuthors, WpPostPrompt, ChatMessages } from "../../types/WPTypes"

import { Author } from "./Author"

const ikuraPassword = process.env.WP_IKURA_PASSWORD
const mortyPassword = process.env.WP_MORTY_PASSWORD
const namiheiPassword = process.env.WP_NAMIHEI_PASSWORD
if(!ikuraPassword || !mortyPassword || !namiheiPassword){
    throw new Error("WP_username_PASSWORD is not set.")
}
const ikura = new Author({
      username: "19ra",
      email: "ikura@bux-web.com",
      password: ikuraPassword,
      personality: "フロントエンドデベロッパーのZ世代女子",
      categories: ["UXデザイン", "モバイルマーケティング", "ランディングページ最適化", "ローカルSEO", "ARでのマーケティング", "ブランディング"]
})

const morty = new Author({
    username: "mortiest morty",
    email: "morty@bux-web.com",
    password: mortyPassword,
    personality: "日本語勉強中の挙動不審なZ世代のマーケティングスペシャリスト",
    categories: ["SNSマーケティング", "バイラルマーケティング", "コンテンツマーケティング", "インフルエンサーマーケティング", "チャットbotマーケティング"]
})

const namihei = new Author({
    username: "73hei",
    email: "namihei@bux-web.com",
    password: namiheiPassword,
    personality: "語尾に「なのじゃ」を良く付ける73歳のシニアウェブデベロッパー",
    categories: ["マーケティングオートメーション", "ORM(オンライン評判管理)", "イベントマーケティング", "SMSマーケティング", "マーケティング予算計画", "ウェブ解析"]
})

const wpAuthors : Author[] = [
    ikura, morty, namihei
]

export default wpAuthors
