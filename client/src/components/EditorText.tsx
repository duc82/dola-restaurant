import cn from "@/utils/cn";
import ReactQuill from "react-quill";

interface EditorTextProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
];

const EditorText = ({ value, onChange, className }: EditorTextProps) => {
  return (
    <ReactQuill
      value={value}
      modules={modules}
      formats={formats}
      onChange={onChange}
      className={cn("bg-emerald-primary", className)}
    />
  );
};

export default EditorText;
