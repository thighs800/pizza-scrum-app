import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase'; // Firebase設定をインポート

const auth = getAuth(app);

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('ユーザー登録が完了しました！');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert('登録に失敗しました: ' + error.message);
      } else {
        alert('登録に失敗しました: 不明なエラー');
      }
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('ログインしました！');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert('ログインに失敗しました: ' + error.message);
      } else {
        alert('ログインに失敗しました: 不明なエラー');
      }
    }
  }

  return (
    <div>
      <h2>ユーザー認証</h2>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSignUp}>登録</button>
      <button onClick={handleSignIn}>ログイン</button>
    </div>
  );
};

export default Auth;