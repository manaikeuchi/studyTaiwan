import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages では https://<user>.github.io/studyTaiwan/ で配信されるため base を合わせる。
// 別の場所に置く場合は環境変数 BASE_PATH で上書きできる。
export default defineConfig({
  base: process.env.BASE_PATH ?? '/studyTaiwan/',
  plugins: [react()],
});
