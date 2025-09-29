import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from './firebase';
import './App.css';
import Auth from './components/Auth'; // Authコンポーネントをインポート
import TaskForm from './components/TaskForm'; // TaskFormコンポーネントをインポート

const auth = getAuth(app);

function App() {
  const [ user, setUser ] = useState<any>(null);

  useEffect(() => {
    // ユーザーのログイン状態を監視
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('ログアウトしました！');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert('ログアウトに失敗しました: ' + error.message);
      } else {
        alert('ログアウトに失敗しました: 不明なエラー');
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pizza Scrum App</h1>
      </header>
      {user ? (
        // ユーザーがログインしている場合
        <div>
          <p>ようこそ、{user.email} さん</p>
          <button onClick={handleSignOut}>ログアウト</button>

          <TaskForm /> {/* TaskFormコンポーネントを使用 */}
        </div>
      ) : (
        // ユーザーがログインしていない場合
        <Auth /> /* Authコンポーネントを使用 */
      )}
    </div>
  );
}

export default App;
