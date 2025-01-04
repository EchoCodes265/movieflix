import { Loader } from 'lucide-react';

interface LoadingStateProps {
  message: string;
}

export default function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="flex items-center gap-2">
        <Loader className="w-6 h-6 animate-spin" />
        <span>{message}</span>
      </div>
    </div>
  );
}