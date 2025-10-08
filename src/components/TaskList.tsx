import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Firebase設定をインポート
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'; // Firestore操作のため
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Task } from '../types'; // Taskの型をインポート

const auth = getAuth();

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [user, setUser] = useState<User | null>(null);

    // ユーザー認証状態の監視
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // タスクの取得
    useEffect(() => {
        if (!user) return; // ユーザーがログインしていない場合は何もしない

        // 1. Firestoreのクエリを作成
        const taskQuery = query(
            collection(db, 'tasks'),
            where('userId', '==', user.uid) // ログインユーザーのタスクのみを取得
            // orderBy('createdAt', 'desc') // 一時的にorderByを無効化
        );

        // 2. リアルタイムリスナーを設定 (OnSnapshotを使用)
        // この関数は、データが変更されるたびに自動で呼び出される
        const unsubscribe = onSnapshot(taskQuery, (snapshot) => {
            console.log('取得したドキュメント数:', snapshot.docs.length);
            const tasksData = snapshot.docs.map(doc => {
                const data = doc.data();
                console.log('ドキュメントデータ:', { id: doc.id, ...data });
                return {
                    id: doc.id,
                    ...data as Omit<Task, 'id'> // Task型に変換
                };
            });
            console.log('処理後のタスクデータ:', tasksData);
            setTasks(tasksData as Task[]); // ステートを更新
        });

        // クリーンアップ関数: コンポーネントが破棄されるときにリスナーを解除
        return () => unsubscribe();
    }, [user]); // userが変更されたときにuseEffectを再実行

    if (!user) {
        return <p>タスクを表示するにはログインしてください。</p>;
    }

    return (
        <div style={{ margin: '20px' }}>
            <h3>タスクリスト</h3>
            {tasks.length === 0 ? (
                <p>タスクがありません。新しいタスクを作成してください。</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0}}>
                    {tasks.map(task => (
                        <li
                            key={task.id}
                            style={{
                                border: '1px solid #ddd',
                                padding: '15px',
                                marginBottom: '10px',
                                textAlign: 'left',
                            }}
                        >
                            <strong>タイトル: </strong> {task.title} (Status: {task.status})<br />
                            <strong>詳細: </strong> {task.description}<br />
                            {/* 今後のCRUD操作用のボタンを配置する場所 */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;