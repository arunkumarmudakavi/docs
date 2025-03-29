import { useEditorStore } from "@/app/store/use-editor-store";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
import { type ColorResult, CirclePicker, SketchPicker } from "react-color"
import { HighlighterIcon } from  "lucide-react"

export const HighlightColorButton = () => {
    const { editor } = useEditorStore();

    const value = editor?.getAttributes("highlight").color || "#ffffffff"

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({color: color.hex}).run();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <HighlighterIcon className="size-4"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                {/* <CirclePicker color={value} onChange={onChange} /> */}
                <SketchPicker color={value} onChange={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}