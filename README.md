# visco
##  visco リニューアル
本番URL  
https://vintage-visco.co.jp/ 

#### sass内の各フォルダの役割
| class のカテゴリ | 役割 |
| ---- | ---- |
| global | サイト内共通の設定 |
| foundation | リセットCSSとサイト内共通で効かせたいスタイル |
| utility | 余白や隠しテキストなどのちょっとした使いわますコードが入る |
| component | サイト内で使い回すパーツのスタイル |
| layout | レイアウトを作るスタイル |
| page | 各ページ固有のスタイル |
| animation	| 演出目的のアニメーションに使うためのコードが入る |

カテゴリ、ページ毎にフォルダーを作り、_index.sassでフォルダー内のファイルやフォルダーを読み込んで、最終的に　css/style.scss ファイルで取りまとめています。

#### リセットCSSについて
色々ありますが今回は以下を入れてみました。案件毎の指定に合わせたり自分の使いやすいものを入れてもいいと思います。  
resset.dev • v5.0.2  
https://github.com/filipelinhares/ress

### 参考
#### Dart Sass（@use）の基本的な書き方
https://haniwaman.com/dart-sass/  
https://moshashugyo.com/media/moshashugyo-css-design  
コーディングする際の基本ルールなんかも参考になります。  

#### VS CodeでDart Sassを使用する設定
https://moshashugyo.com/media/dart-sass  
上記のページを見ながらDartJS Sass Compiler and Sass Watcherの設定をするとDart Sassを使用できるようになります。  
scssフォルダを右クリックし、「DartSass:Sass Watch」を選択すると、そのフォルダ配下がウォッチ(監視)されます。  
css フォルダーの設定がうまくいかない時は、VS Codeのワークスペースの設定で、"folders": [ { "path": "." } ] にすると上手くいきました。  
今までのLibSassの記法もwatch（作動させる）ボタンが異なるので、サイトによって簡単に使い分けることができるようです。  

#### マークダウン記法 一覧表・チートシート
https://qiita.com/kamorits/items/6f342da395ad57468ae3  
上記のサイトは、READEME等の記載する際の、markdown記法が簡単に取りまとめられていて見やすかったです。  


