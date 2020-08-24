`use strict`
const userNameInput = document.getElementById(`user-name`);
const assessmentButton = document.getElementById(`assesment`);
const resultDivided = document.getElementById(`imput-area`);
const tweetDivided = document.getElementById(`tweet-area`);

/**
* 指定した要素の子供を全削除する関数
* @param {HTMLElement} element HTML HTMLの要素
*/
function removeAllchildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    /**
     * TODO 診断結果表示エリアの作成
     * TODO ツイートエリアの作成
     */
    const userName = Date();
    if(!userName){
        return;//直ちに処理を完了するためのガード句
    }

    //HTMLにタグを足していく、ヘッダとパラグラフ
    removeAllchildren(resultDivided);   //消す
    const header = document.createElement(`h6`);    //定数header を宣言し、<h6>タグをつくって代入している
    header.innerHTML = `"Today's one"`;      //定数headerの.innerHTMLプロパティに文字列`診断結果`を書き込み
    resultDivided.appendChild(header);  //resultDividedに.appendChild()で子要素paragraphを足している

    const paragraph = document.createElement(`p`);  //定数paragraph を宣言し、<p>タグをつくって代入している
    const result = assessment(userName);    //定数resultを作ってassessment()関数の引数userNameの戻り値を代入している
    paragraph.innerText = result;   //定数pargraphのinnerTextプロパティに定数resultの値を代入している
    resultDivided.appendChild(paragraph);   //resultDividedに.appendChild()で子要素paragraphを足している

    removeAllchildren(tweetDivided);   //tweetDidedの子要素を全て消す
    const anchor = document.createElement(`a`); //定数anchor を宣言し、<a>タグをつくって代入している
    const hrefValue = `https://twitter.com/intent/tweet?button_hashtag=`
        + encodeURIComponent(`今日の四字熟語`)
        + `&ref_src=twsrc%5Etfw`;

    /**
     * 定数hrefValue を宣言し、twitterのhrefアドレスを代入している
     */

    anchor.setAttribute(`href`,hrefValue);  //.setAttribute()でanchorに`href`属性を追加し,hrefValueを代入している
    anchor.className = `twitter-hashtag-button`;    //.classNameプロパティに
    anchor.setAttribute(`data-text`,result);  //.setAttribute()でanchorに`data-text`属性を追加し,answersの文章を代入している
    anchor.innerText = `Tweet #Today's 四字熟語`; //.innerTextプロパティを`Tweet #Today's 四字熟語`に書き換えている
    tweetDivided.appendChild(anchor);   //tweetDivided定数に.appendChild()で子要素anchorを追加している
    /*twttr.widgets.load();
    */

    const script = document.createElement(`script`);
    script.setAttribute(`src`,`https://platform.twitter.com/widgets.js`);
    script.setAttribute(`charset`,`UTF-8`);
    script.setAttribute(`async`,`async`);
    tweetDivided.appendChild(script);
}

userNameInput.onkeydown = (event) =>{
    if (event.key === `Enter`){
        assessmentButton.onclick();
        // TODO ボタンのonclick()処理を呼び出す
    }
};


const answers = [
    `userName 風林火山　風:wind 林：forest 火：fire 山:montain "Move fast as wind, keep silence as forest, attack hard as fire, and hold still as montain", Fighting theory of Takeda Shingen, Samrai load of Sengoku-era`,
    `userName 赤坂見附　赤:red 坂：hill 見:watch 附:put "Red hill watch position", station name of Ginza/Marunouchi line`,
    `userName 一撃必殺　一:one 撃：brow 必：must 殺:kill "Special single set of knock-out technique"`,
    `userName 電光石火　電:electic 光：light 石：stone 火:fire "Flashing fast movement like a lightning"`,
    `userName 凱風凱歌　凱：trienph 風:wind 凱：trienph 歌:song "fine wind,fine seenary with trienph feeling", or the name of famous ukiyo-e “Fine Wind, Clear Morning,” `,
    `userName 一日千秋　一:one 日：day 千：thousand 秋:fall "One day feels like tohsands of seasons", Feeling awaiting reply or result of something special`,
    `userName 天下泰平　天:heaven 下：below 泰：peace 平:flat "Statement of peaceful heaven and earth", pax Tokugawa of Edo-era`,
    `userName 日進月歩　日:day 進：progress 月：month 歩:walk "Slow and steady renewal of something"`,
    `userName 門前仲町　門:gate 前：front 仲：friendly 町:town , station name of Tozai/Oedo line`,
    `userName 古今東西　古:past 今：now 東：east 西:west "Something in common, timeless and worldwide"`,
];

/**
* assessment()は名前の文字列を渡すと診断結果を返す関数。
* @param {string} userName ユーザーネーム
* @return {string} Today's 四文字熟語
*/

/**
* 動作内容は全文字のコード番号を取得して足し合わせる
*/

function assessment(userName) {
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode += userName.charCodeAt(i);
    }

    /**
     * 文字列コードの合計が大きいので、合計を
     * 回答数の長さで割って余りを出す
     */

    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/userName/g, "");

    return result;
}
