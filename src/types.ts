import { Timestamp } from "firebase/firestore";

// タスクの状態を定義
export type TaskStatus = 'Todo' | 'InProgress' | 'Done';

// 💡 タスクのデータモデルを定義
export interface Task {
  id: string; // ドキュメントID
  userId: string; // タスクの所有者ID
  title: string; // タスクの名称
  description: string; // 💡 追加: タスクの詳細な説明
  status: TaskStatus; // タスクの状態
  createdAt: Timestamp; // 作成日時 (FirestoreのTimestamp型を使用)
}