"use client";
import Image from "next/image";

import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";

import { Button } from "./ui/button";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import { Image as ImageIcon, Smile, XIcon } from "lucide-react";
import { Hint } from "./hint";
import { Delta, Op } from "quill/core";
import { cn } from "@/lib/utils";
import { current } from "../../convex/members";
import { EmojiPopover } from "./emoji-popover";

type EditorValue = {
  image: File | null;
  body: string;
};
//will be used to edit and create messages
interface EditorProps {
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  variant?: "create" | "update";
}

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "formula"],

  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
];

const Editor = ({
  onCancel,
  onSubmit,
  placeholder = "Write Something",
  defaultValue = [],
  disabled = false,
  innerRef,
  variant = "create",
}: EditorProps) => {
  // cant use ref it wont rerender, need usestate to keep on checking length of text inside the editor
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  //using ref bnecause it wont rerender the editor on every change
  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);
  const ImageElementRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,

      modules: {
        toolbar: toolbarOptions,
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                const text = quill.getText();
                const addedImage = ImageElementRef.current?.files?.[0] || null;

                const isEmpty =
                  !addedImage &&
                  text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

                if (isEmpty) return;

                const body = JSON.stringify(quill.getContents());
                submitRef.current?.({ body, image: addedImage });
                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };
    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) container.innerHTML = "";

      if (quillRef.current) {
        quillRef.current = null;
      }

      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef, containerRef]); //may add innerRef in deps later

  const isEmpty = !image && text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  const toggleToolbar = () => {
    setIsToolbarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");

    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden");
    }
  };

  const onEmojiSelect = (emoji: any) => {
    const quill = quillRef.current;
    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };

  return (
    <div className="flex flex-col">
      <input
        type="file"
        accept="image/*"
        ref={ImageElementRef}
        onChange={(e) => setImage(e.target.files![0])}
        className="hidden"
      />

      <div
        className={cn(
          "flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white",
          disabled && "opacity-50"
        )}
      >
        <div ref={containerRef} className="h-full ql-custom" />
        {!!image && (
          <div className="p-2">
            <div className="relative size-[62px] flex items-center justify-center group/image">
              <Hint label="Remove Image">
                <button
                  onClick={() => {
                    setImage(null);
                    ImageElementRef.current!.value = "";
                  }}
                  className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
                >
                  <XIcon className="size-3" />
                </button>
              </Hint>
              <Image
                src={URL.createObjectURL(image)}
                alt="uploaded"
                fill
                className="rounded-xl overflow-hidden border object-cover"
              />
            </div>
          </div>
        )}
        <div className="flex px-2 pb-2 z-[5]">
          <Hint
            label={isToolbarVisible ? "Hide Formatting" : "Show Formatting"}
          >
            <Button
              disabled={disabled}
              variant="ghost"
              onClick={toggleToolbar}
              size="iconSm"
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button variant="ghost" size="iconSm">
              <Smile className="size-4" />
            </Button>
          </EmojiPopover>
          {variant === "create" && (
            <Hint label="Image">
              <Button
                disabled={disabled}
                variant="ghost"
                size="iconSm"
                onClick={() => ImageElementRef.current?.click()}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}
          {variant === "create" ? (
            <Button
              disabled={disabled || isEmpty}
              onClick={() =>
                onSubmit({
                  body: JSON.stringify(quillRef.current?.getContents()),
                  image,
                })
              }
              className={cn(
                "ml-auto",
                !isEmpty
                  ? "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
                  : "bg-white hover:bg-[#007a5a]/80 text-muted-foreground"
              )}
              size="iconSm"
            >
              <MdSend className="size-4" />
            </Button>
          ) : (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={disabled || isEmpty}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  onSubmit({
                    body: JSON.stringify(quillRef.current?.getContents()),
                    image,
                  })
                }
                disabled={false}
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
      {variant === "create" && (
        <div
          className={cn(
            "p-2 text-[10px] text-muted-foreground flex justify-end opacity-0 transition",
            !isEmpty && "opacity-100"
          )}
        >
          <p>
            <strong>Shift + Return</strong> to add a new line
          </p>
        </div>
      )}
    </div>
  );
};

export default Editor;
