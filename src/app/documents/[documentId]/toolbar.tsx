"use client";

import { useEditorStore } from "@/app/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

import { FontFamilyButton } from "./font-family-button";
import { HeadingLevelButton } from "./heading-level-button";
import { ToolbarButton } from "./toolbar-button";
import { TextColorButton } from "./text-color-button";
import { HighlightColorButton } from "./highlight-color-button";
import { LinkButton } from "./link-button";
import { ImageButton } from "./image-button";
import { AlignButton } from "./align-button";
import { ListButton } from "./list-button";
import { FontSizeButton } from "./fontsize-button";
import { LineHeightButton } from "./lineheight-button";

export const Toolbar = () => {
  const { editor } = useEditorStore();
  // console.log("Editor Data: ", editor);
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          // It's native browser spellcheck not a third party plugin.
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive("liveblocksCommentMark"), 
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] py-0.5 px-2.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font family */}
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Heading */}
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font Size */}
      <FontSizeButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* TODO: Text color */}
      <TextColorButton />
      {/* TODO: Highlight color */}
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Link */}
      <LinkButton />
      {/* TODO: Image */}
      <ImageButton />
      {/* TODO: Align */}
      <AlignButton />
      {/* TODO: Line height */}
      <LineHeightButton />
      {/* TODO: List */}
      <ListButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
