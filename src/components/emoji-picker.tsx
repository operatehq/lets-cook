"use client";

import EmojiPicker, {
  type EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import { useState } from "react";
import { Button } from "@/components/button";

interface EmojiPickerButtonProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
  className?: string;
}

export default function EmojiPickerButton({
  selectedEmoji,
  onEmojiSelect,
  className = "",
}: EmojiPickerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        type="button"
        variant="default"
        size="square"
        onClick={() => setIsOpen(!isOpen)}
        className="border border-white/5 hover:border-white/10 text-2xl"
        title="Select emoji"
      >
        {selectedEmoji}
      </Button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 z-20 mt-2 shadow-xl rounded-lg overflow-hidden">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={350}
              height={400}
              theme={Theme.AUTO}
              emojiStyle={EmojiStyle.APPLE}
              searchPlaceholder="Search emojis..."
              previewConfig={{
                showPreview: true,
                defaultEmoji: "1f60a",
                defaultCaption: "Choose an emoji for your recipe!",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
