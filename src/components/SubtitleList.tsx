import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SubtitleFile {
  id: string;
  attributes: {
    release: string;
    download_count: number;
    fps: number;
    files: Array<{ file_id: string }>;
  };
}

interface SubtitleListProps {
  subtitles: SubtitleFile[];
  onSelect: (fileId: string) => void;
  selectedFileId: string | null;
}

export default function SubtitleList({ subtitles, onSelect, selectedFileId }: SubtitleListProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!subtitles.length) {
    return null;
  }

  const selectedSubtitle = subtitles.find(
    sub => sub.attributes.files[0].file_id === selectedFileId
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="truncate">
          {selectedSubtitle ? selectedSubtitle.attributes.release : 'Select subtitle'}
        </span>
        <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {subtitles.map((subtitle) => (
            <button
              key={subtitle.id}
              onClick={() => {
                onSelect(subtitle.attributes.files[0].file_id);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              <div className="font-medium truncate">{subtitle.attributes.release}</div>
              <div className="text-xs text-gray-400">
                {subtitle.attributes.fps}fps • {subtitle.attributes.download_count.toLocaleString()} downloads
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}