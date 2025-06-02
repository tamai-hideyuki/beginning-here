export type LinkItem = {
    name: string;
    href: string;
    announcement?: string;
    notes?: string;
};

export type LinkGroup = {
    groupName: string;
    items: LinkItem[];
};

export type LinkCategory = {
    category: string;
    // Either a flat list of items or grouped items
    items?: LinkItem[];
    groups?: LinkGroup[];
};

export const sidebarLinks: LinkCategory[] = [
    {
        category: "プログラミング言語・スクリプト",
        groups: [
            {
                groupName: "クライアント／汎用スクリプト系",
                items: [
                    {
                        name: "Bash (GNU Bash)",
                        href: "https://www.gnu.org/software/bash/",
                        announcement: "https://lists.gnu.org/mailman/listinfo/bash",
                        notes: "GNU Bashの公式メーリングリストでリリース情報を配信",
                    },
                    {
                        name: "PowerShell",
                        href: "https://docs.microsoft.com/ja-jp/powershell/",
                        announcement: "https://github.com/PowerShell/PowerShell/releases.atom",
                        notes: "GitHub Releases RSS で新バージョンをチェック",
                    },
                    {
                        name: "ShellScript（POSIX sh）",
                        href: "http://pubs.opengroup.org/onlinepubs/9699919799/utilities/sh.html",
                        announcement: "http://pubs.opengroup.org/",
                        notes: "The Open Groupの公式サイトで規格改訂を確認",
                    },
                ],
            },
            {
                groupName: "メインストリーム言語",
                items: [
                    { name: "C#", href: "https://docs.microsoft.com/ja-jp/dotnet/csharp/", announcement: "https://docs.microsoft.com/en-us/dotnet/core/whats-new/", notes: ".NETの「What's New」ページで最新情報をキャッチ" },
                    { name: "C++ (ISO C++)", href: "https://isocpp.org/", announcement: "https://isocpp.org/std/status", notes: "ISO C++ 標準化の進捗・改訂予定をチェック" },
                    { name: "Go", href: "https://golang.org/", announcement: "https://golang.org/doc/devel/release.html", notes: "Go公式のリリースノートページ" },
                    { name: "Java", href: "https://docs.oracle.com/javase/jp/", announcement: "https://jdk.java.net/", notes: "OpenJDKの新バージョン情報" },
                    { name: "JavaScript (MDN)", href: "https://developer.mozilla.org/ja/docs/Web/JavaScript", announcement: "https://developer.mozilla.org/ja/docs/Mozilla/JavaScript_engine", notes: "MDNブログやリリースノートへのリンク" },
                    { name: "Kotlin", href: "https://kotlinlang.org/", announcement: "https://kotlinlang.org/docs/releases.html", notes: "言語仕様・ツールのリリース情報" },
                    { name: "PHP", href: "https://www.php.net/", announcement: "https://www.php.net/releases/", notes: "PHP公式のリリースページ" },
                    { name: "Python", href: "https://www.python.org/", announcement: "https://www.python.org/downloads/", notes: "Python本体のダウンロード＆リリースノート" },
                    { name: "Ruby", href: "https://www.ruby-lang.org/ja/", announcement: "https://www.ruby-lang.org/en/news/", notes: "公式ニュースページ" },
                    { name: "Rust", href: "https://www.rust-lang.org/ja", announcement: "https://blog.rust-lang.org/releases.rss", notes: "公式ブログのRSSフィード" },
                    { name: "Swift", href: "https://swift.org/", announcement: "https://swift.org/blog/", notes: "Swift公式ブログ" },
                    { name: "TypeScript", href: "https://www.typescriptlang.org/", announcement: "https://devblogs.microsoft.com/typescript/", notes: "Microsoft DevBlogsのTypeScriptセクション" },
                ],
            },
        ],
    },
    {
        category: "政府・研究",
        items: [
            { name: "ムーンショット型研究開発制度", href: "https://www8.cao.go.jp/cstp/moonshot/index.html" },
        ],
    },
    {
        category: "検索エンジン",
        items: [
            { name: "Google", href: "https://www.google.com/" },
            { name: "Yahoo! JAPAN", href: "https://www.yahoo.co.jp/" },
            { name: "Bing", href: "https://www.bing.com/" },
            { name: "DuckDuckGo", href: "https://duckduckgo.com/" },
            { name: "Baidu", href: "https://www.baidu.com/" },
            { name: "Yandex", href: "https://www.yandex.com/" },
            { name: "Naver", href: "https://www.naver.com/" },
            { name: "Seznam", href: "https://www.seznam.cz/" },
            { name: "Ecosia", href: "https://www.ecosia.org/" },
        ],
    },
    {
        category: "支援ツール",
        items: [
            { name: "Notion", href: "https://www.notion.so/T-HIDEYUKI-DATABASE-e32aa28421f24b27a80d6a1c1cdb51d7" },
            { name: "Confluence", href: "https://hideyuki.atlassian.net/wiki/spaces/~7120207586910f527f41d2b40393ecfd9d6329/overview" },
            { name: "Irusiru", href: "https://app.irusiru.jp/" },
        ],
    },
    {
        category: "開発",
        items: [
            { name: "GitHub", href: "https://github.com/tamai-hideyuki" },
            { name: "1000行でOS", href: "https://operating-system-in-1000-lines.vercel.app/ja/" },
            { name: "Godbolt", href: "https://godbolt.org/" },
        ],
    },
    {
        category: "開発ツール",
        items: [
            { name: "qr-generator", href: "http://localhost:5173/" },
        ],
    },
    {
        category: "Qiita",
        items: [
            { name: "Qiita", href: "https://qiita.com/" },
        ],
    },
    {
        category: "AWS",
        items: [
            { name: "hourei-api-server", href: "https://hideyukionline.net" },
            { name: "AWS", href: "https://ap-northeast-1.console.aws.amazon.com/console/home?region=ap-northeast-1#" },
        ],
    },
    {
        category: "スプレッドシート",
        items: [
            { name: "メモ帳", href: "https://docs.google.com/spreadsheets/d/1A8I1etmHXyBOgaM8eMydZzbsdzkuQW5zMarNmNifw1k/edit?gid=0#gid=0" },
            { name: "状況把握", href: "https://docs.google.com/spreadsheets/d/1tre5znbudcU-TH43QDfjvv8plXDNjS8Jkk8aTJw-T0o/edit?gid=1637353384#gid=1637353384" },
            { name: "USD/JPY", href: "https://docs.google.com/spreadsheets/d/1nXQVkbsLA_LIE18vXWPo2PvOSMRicfWkWUB_tK7hvJg/edit?gid=0#gid=0" },
            { name: "転職までの家計簿", href: "https://docs.google.com/spreadsheets/d/1wNhVzKimAMyRgObTNb4o0wVpB75KL8XAAB8HB_rtUmE/edit?gid=0#gid=0" },
        ],
    },
    {
        category: "Google",
        items: [
            { name: "ドライブ", href: "https://drive.google.com/drive/u/0/home" },
            { name: "Gmail", href: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox" },
            { name: "仕事", href: "https://drive.google.com/drive/u/0/folders/13iKZw6fGHt7W5M381NjksQLghaR0IgXn" },
        ],
    },
    {
        category: "転職",
        items: [
            { name: "Green", href: "https://www.green-japan.com/mypage01" },
            { name: "Findy", href: "https://findy-code.io/home" },
            { name: "doda", href: "https://doda.jp/?usrclk=PC_login_commonHeader_logo" },
            { name: "Canva", href: "https://www.canva.com/" },
            { name: "Paiza", href: "https://paiza.jp/challenges/ranks/d" },
            { name: "Yagish", href: "https://rirekisho.yagish.jp/mypage" },
        ],
    },
    {
        category: "AI",
        items: [
            { name: "ChatGPT", href: "https://chatgpt.com/" },
            { name: "Gemini", href: "https://gemini.google.com/app?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&utm_source=sem&utm_source=google&utm_medium=paid-media&utm_medium=cpc&utm_campaign=bkws&utm_campaign=2024jaJP_gemfeb&pt=9008&mt=8&ct=p-growth-sem-bkws&gad_source=1&gclid=Cj0KCQjwqcO_BhDaARIsACz62vNJFuem_YK3RVI840ongF_7g2BVQPra3pKiI7ywevsyHD20eF8ba-kaAmIfEALw_wcB&gclsrc=aw.ds" },
            { name: "Copilot", href: "https://copilot.microsoft.com/chats/ENhLdC5CjPpufv1bkET7U" },
        ],
    },
    {
        category: "ネットワーク",
        items: [
            { name: "ngrok", href: "https://dashboard.ngrok.com/get-started/setup/macos" },
        ],
    },
];
