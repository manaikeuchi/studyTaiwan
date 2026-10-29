import { describe, expect, it } from 'vitest';
import { allItems, weeks } from './index';

// 教材データの品質チェック。単語を追加・修正したら `npm test` で確認する。
describe('教材データ', () => {
  it('item の id が全体で重複していない（進捗の保存キーなので重複すると壊れる）', () => {
    const ids = allItems.map((i) => i.id);
    const dup = ids.filter((id, idx) => ids.indexOf(id) !== idx);
    expect(dup).toEqual([]);
  });

  it('lesson / week の id も重複していない', () => {
    const ids = [...weeks.map((w) => w.id), ...weeks.flatMap((w) => w.lessons.map((l) => l.id))];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('必須項目が空でない', () => {
    for (const i of allItems) {
      expect(i.hanzi.trim(), i.id).not.toBe('');
      expect(i.pinyin.trim(), i.id).not.toBe('');
      expect(i.ja.trim(), i.id).not.toBe('');
    }
  });

  it('拼音に声調記号が付いている（付け忘れ防止）', () => {
    const toneMark = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/;
    const neutralToneOnly = new Set(['w1-ma0']); // 軽声だけの語は声調記号が付かない
    for (const i of allItems.filter((i) => !neutralToneOnly.has(i.id))) {
      expect(toneMark.test(i.pinyin), `${i.id}: ${i.pinyin}`).toBe(true);
    }
  });

  it('簡体字が混入していない（よく紛れ込む字だけをチェック）', () => {
    const simplified = /[们这么会说时认识请谢开设计电发进质检资报价单议论间关见气东车门问对现话样还给让过动场备装际务员实]/;
    for (const i of allItems) {
      expect(simplified.test(i.hanzi), `${i.id}: ${i.hanzi}`).toBe(false);
    }
  });
});
