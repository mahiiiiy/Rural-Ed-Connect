export type DownloadStatus = 'idle' | 'downloading' | 'downloaded';

export interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  status: DownloadStatus;
}

export type MicPermissionStatus = 'idle' | 'pending' | 'granted' | 'denied';

export type UserRole = 'student' | 'teacher';
