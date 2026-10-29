export function ReferenceView() {
  return (
    <section className="reference">
      <h2>参考情報</h2>

      <article>
        <h3>「台湾語」と「台湾華語」は別の言語です</h3>
        <p>
          台湾で話される言葉は主に <strong>台湾華語（國語）</strong> と <strong>台湾語（閩南語）</strong> の2つです。
          ビジネス・会議・メール・契約書はほぼすべて台湾華語なので、まずはこちらを学びます（このアプリの内容も台湾華語です）。
        </p>
        <ul>
          <li><strong>台湾華語</strong>：中国本土の普通話とほぼ同じ言語。文字は<strong>繁体字</strong>、一部の語彙・読み方が異なる。</li>
          <li><strong>台湾語</strong>：まったく別の言語。年配の方や工事現場の職人さんの間でよく使われる。挨拶程度を覚えると喜ばれる。</li>
        </ul>
        <p>このアプリでは台湾特有の語彙・読み方に <span className="badge">台湾</span> マークを付けています。</p>
      </article>

      <article>
        <h3>学習リソース</h3>
        <ul className="resources">
          <li>
            <a href="https://lmit.edu.tw/lc/huayu101/" target="_blank" rel="noreferrer">華語101</a>
            ：おすすめされたサイト。発音や日常会話の基礎固めに。一般向けなので、ビジネス・建設の語彙はこのアプリで補完しましょう。
          </li>
          <li>
            <a href="https://dict.revised.moe.edu.tw/" target="_blank" rel="noreferrer">教育部 重編國語辭典修訂本</a>
            ：台湾の標準的な読み方を確認できる公式辞書。注音・拼音の両方が載っています。
          </li>
          <li>
            <strong>Pleco</strong>（スマホ辞書アプリ）：繁体字表示に切り替え可能。手書き入力やカメラ入力も便利。
          </li>
          <li>
            <strong>當代中文課程（A Course in Contemporary Chinese）</strong>：台湾師範大学の定番教科書。体系的に学ぶなら。
          </li>
          <li>
            <a href="https://tocfl.edu.tw/" target="_blank" rel="noreferrer">TOCFL（華語文能力測驗）</a>
            ：台湾の公式中国語検定。2〜3か月後の目標設定に。
          </li>
        </ul>
      </article>

      <article>
        <h3>ビジネスで優先度が高いこと</h3>
        <ol>
          <li><strong>数字・日付・時間</strong>：見積・工程・納期の聞き間違いは損失に直結。重要な数字は必ず書面でも確認。</li>
          <li><strong>聞き返すフレーズ</strong>（4週目 Day 24–25）：分からない時に会話を止めない技術が最優先。</li>
          <li><strong>肩書と呼び方</strong>：「王經理」「陳總」など「姓＋肩書」で呼ぶのが基本。</li>
          <li><strong>同じ漢字でも意味が違う語</strong>（2週目 Day 14）：「検討します」を 檢討 と書くと「反省します」の意味に。</li>
          <li><strong>LINE でのやりとり</strong>：台湾では業務連絡も LINE が主流。短い定型文（收到、好的、麻煩您了）を覚えると即戦力に。</li>
        </ol>
      </article>

      <article>
        <h3>工場建設で知っておきたい台湾の慣習</h3>
        <ul>
          <li><strong>動土典禮（起工式）</strong>：着工時に縁起の良い日を選び、線香と供物で土地の神様を拝む（拜拜）のが一般的。日本の地鎮祭に近い。</li>
          <li><strong>上樑典禮（上棟式）</strong>：棟上げの際にも儀式を行うことがある。</li>
          <li><strong>鬼月（旧暦7月、新暦で8月前後）</strong>：縁起が悪いとされ、起工・引越し・契約を避ける企業や人がいる。工程計画の際に先方に確認を。</li>
          <li><strong>農曆新年（旧正月、1〜2月）</strong>：1週間以上休みになり、前後で工事や物流が止まる。年末には 尾牙（会社の忘年会）もある。</li>
          <li><strong>颱風・地震</strong>：7〜9月は台風で現場が止まる「颱風假（台風休み）」が出ることも。耐震基準も日本と同様に厳しい。</li>
          <li><strong>紅包（ご祝儀）</strong>：お祝い事では赤い袋に入れる。白い封筒は弔事用なので避ける。</li>
        </ul>
      </article>

      <article>
        <h3>1か月後の次のステップ</h3>
        <ul>
          <li>実際の会議資料・図面から、よく出る単語を自分で追加する（追加方法は README 参照）。</li>
          <li>注音符號（ㄅㄆㄇㄈ）を読めるようにする：台湾の辞書や子供向け教材は注音表記が中心。</li>
          <li>取引先とのLINEで、まずは定型文の返信から中国語にしてみる。</li>
        </ul>
      </article>
    </section>
  );
}
