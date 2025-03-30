import { useEditorStore } from "@/app/store/use-editor-store";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";

export const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setIputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setIputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      <Button
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm bg-transparent text-black hover:bg-neutral-200/80"
        onClick={decrement}
      >
        <MinusIcon className="size-4" />
      </Button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent cursor-text hover:bg-neutral-200/80"
        >
          {currentFontSize}
        </button>
      )}
      <Button
        className="h-7 w-7 shrink-0 flex flex-col items-center justify-center rounded-sm bg-transparent text-black hover:bg-neutral-200/80"
        onClick={increment}
      >
        <PlusIcon className="size-4" />
      </Button>
    </div>
  );
};
