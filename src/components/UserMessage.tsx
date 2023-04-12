import { Dispatch, KeyboardEvent, SetStateAction } from 'react';

export const UserMessage = ({
  initialText,
  text,
  isEditing,
  cancelEdit,
  setText,
}: {
  initialText: string;
  text: string;
  isEditing: boolean;
  cancelEdit: () => void;
  setText: Dispatch<SetStateAction<string>>;
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode == 27) {
      cancelEdit();
    }
  };
  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    const newText = (e.target as HTMLDivElement).innerText;
    setText(newText);
  };
  return isEditing ? (
    <div
      className="flex flex-col gap-3"
      contentEditable="true"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      dangerouslySetInnerHTML={{ __html: initialText }}
    />
  ) : (
    <div className="flex flex-col gap-3">{text}</div>
  );
};
