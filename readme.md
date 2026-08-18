# xcd0.github.io

このリポジトリは、`xcd0.github.io` のサブディレクトリで公開する静的コンテンツを管理します。

ルートでは、このREADMEの内容を案内ページとして公開します。

## 公開コンテンツ

### qft

画面とカメラに表示したQRコードを使用する、オフラインファイル転送ツールです。

- [PWA版](https://xcd0.github.io/qft/pwa/)
	- スマートフォン向けの推奨版です。
	- 最初にオンラインで読み込むと、その後はオフラインでも利用できます。
- [Vanilla版](https://xcd0.github.io/qft/vanilla/qft.html)
	- リッチなUIを単一HTMLで利用できます。
- [Minimal版](https://xcd0.github.io/qft/minimal/qft.html)
	- サイズと構成を抑えた単一HTML版です。
- [ソースコード](https://github.com/xcd0/qft)

`qft/` は `xcd0/qft` の `main` ブランチ更新時に、GitHub Actionsから `dist/` の内容を自動配置します。

### Google Engineering Practices Documentationの和訳

- [Google Engineering Practices Documentationの和訳](https://xcd0.github.io/eng-practices-ja-mdbook/ja/)
	- 既に、日本語訳として <https://fujiharuka.github.io/google-eng-practices-ja/> があります。
	- 上記は少々古いように見え、TOCがなかったためmdBook版を作成しました。
	- 和訳には[easygpt](https://github.com/xcd0/easygpt)を使用しました。
	- [mdbook-i18n-helpers](https://github.com/google/mdbook-i18n-helpers)を使用して多言語対応しています。
	- おかしいところがあれば <https://github.com/xcd0/eng-practices-ja/issues> に報告してください。

## 運用方針

- 公開物は用途ごとのサブディレクトリに配置します。
- ルートは `readme.md` を案内ページとして使用します。
- `qft/` の内容は自動生成物のため、原則としてこのリポジトリ上で直接編集しません。
