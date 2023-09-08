import { ChatMessages, WPCategory, WpAuthors } from "../../types/WPTypes"

export class Author {
    props : WpAuthors
    instruction: string
    constructor(data: WpAuthors){
        this.props = data
        this.instruction = ""
    }
    
    pickCategory():WPCategory{
        const index = Math.floor(Math.random() * this.props.categories.length)
        return this.props.categories[index]
    }

    makeMessagesForHtmlPrompt():ChatMessages{
        const category = this.pickCategory()
        return [
            {
                "role":"system",
                "content": `あなたの名前は${this.props.username}です。${this.props.personality}としてWordPressの記事を生成します。`
            },
            {
                "role":"user",
                "content":`カテゴリー:${category}に関する投稿をあなたらしい口調で書いてください。${this.props.personality}次ののHTMLタグのみを利用してください。[h2,h3,h4,ul,ol,li,table,thead,tbody,th,td,blockquote,p,hr] html, body, headなどは必要ありません。`
            }
        ]
    }

    makeMessagesForWpPostPrompt(generatedHtml: string): ChatMessages{
        return [
            {
                "role":"system",
                "content":"You are JSON generator that returns JSON by reading HTML article and make JSON with user's instruction."
            },
            {
                "role":"user",
                "content":`以下の記事を読んでください。  
                ###<h1>SEOって何？Z世代が教える"検索エンジン最適化"の裏技</h1><p>Hey fam! 今日は、みんな大好き（？）SEO、つまり検索エンジン最適化についておしゃべりしようと思います。</p><h2>SEOって何よ？</h2><p>簡単に言うと、SEOはGoogle先生に好かれるテクニックです。これでみんなのサイトやブログが検索結果で上位に表示されるわけ。</p>###
                title、excerpt、categoryをJSON形式で出力してください。categoryは[SEO, Marketing]のどれかを選んでください。JSONのみを返してください。`
            },
            {
                "role":"assistant",
                "content":`
                {
                    “title”:”SEOって何なん？”,
                    “excerpt”:”SEOはGoogle先生に好かれるテクニックです。キーワード選び、質の高いコンテンツ、バックリンクの重要性を抑えましょう。”,
                    “category”:”SEO”
                }
                `
            },
            {
                "role":"user",
                "content":`以下の記事を読んでください。###${generatedHtml}###
                title、excerpt、categoryをJSON形式で出力してください。categoryは[${this.props.categories.join(", ")}]のどれかを選んでください。JSONのみを返してください。`
            },
        ]
    }
}