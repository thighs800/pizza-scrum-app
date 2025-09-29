import React, { useState } from 'react';
import { db } from '../firebase' // Firebase接続をインポート
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Firestore操作のため
import { getAuth } from 'firebase/auth'; // ユーザーID取得のため
import { TaskStatus } from '../types'; // TaskStatusの型をインポート
import { setSyntheticLeadingComments } from 'typescript';


// 認証情報からユーザーIDを取得
const auth = getAuth();

const TaskForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();

        const user = auth.currentUser;
        if (!user) {
            alert('タスクを作成するにはログインしてください。');
            return;
        }

        try {
            // 1. Firestoreのtasksコレクションへの参照を取得
            const tasksCollectionRef = collection(db, 'tasks');

            // 2. 新しいドキュメントをコレクションに追加
            await addDoc(tasksCollectionRef, {
                userId: user.uid,
                title: title,
                description: description,
                status: 'Todo' as TaskStatus, // 初期ステータスをTodoに設定
                createAt: serverTimestamp(), // Firestore側で作成日時を設定  
            });

            // 3. フォームをクリア
            setTitle('');
            setDescription('');
            alert('タスクが正常に作成されました！');
        } catch (error) {
            console.error('タスクの作成中にエラーが発生しました: ', error);
            alert('タスクの作成に失敗しました。');
        }
    };

    return (
        <form onSubmit={handleAddTask} style={{ margin: '20px', padding: '20px', border: '1px solid #ccc'}} >
            <h3>タスクを追加</h3>
            <div>
                <label>タイトル: </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>詳細: </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit" style={{ marginTop: '10px' }}>タスクを作成</button>
        </form>
    );
};

export default TaskForm;