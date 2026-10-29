export type Item = {
  /** 学習進捗の保存キー。一度公開したら変更しないこと（変えると進捗が消える） */
  id: string;
  /** 繁体字（台湾の表記） */
  hanzi: string;
  /** 漢語拼音（声調記号付き。一・不 の変調は反映済み） */
  pinyin: string;
  ja: string;
  note?: string;
  /** 会話文の話者（例: "A"） */
  speaker?: string;
  /** 台湾特有の語彙・読み方なら true */
  tw?: boolean;
};

export type Lesson = {
  id: string;
  days: string;
  title: string;
  goal: string;
  kind: 'vocab' | 'phrase' | 'dialogue';
  items: Item[];
};

export type Week = {
  id: string;
  label: string;
  title: string;
  goal: string;
  tips: string[];
  lessons: Lesson[];
};
