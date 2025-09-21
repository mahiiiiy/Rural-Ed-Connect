
import { useState, useCallback } from 'react';
import type { MicPermissionStatus } from '../types';

export const useMicrophone = () => {
  const [permissionStatus, setPermissionStatus] = useState<MicPermissionStatus>('idle');

  const requestMicrophonePermission = useCallback(async (): Promise<MicPermissionStatus> => {
    setPermissionStatus('pending');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      // We don't need to use the stream, just confirm permission.
      // It's good practice to stop the tracks immediately if you're not using them.
      stream.getTracks().forEach(track => track.stop());
      setPermissionStatus('granted');
      return 'granted';
    } catch (error) {
      console.error("Microphone permission denied:", error);
      setPermissionStatus('denied');
      return 'denied';
    }
  }, []);

  return { permissionStatus, requestMicrophonePermission };
};
