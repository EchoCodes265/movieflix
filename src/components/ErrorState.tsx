interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-red-400 text-center">
        <p className="text-lg">{message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}