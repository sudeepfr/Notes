import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value || "");

  useEffect(() => {
    if (value !== editorValue) {
      setEditorValue(value);
    }
  }, [value]);

  const handleChange = (content, delta, source, editor) => {
    setEditorValue(content);
    onChange(content); // send HTML back to parent
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // headings
      ["bold", "italic", "underline", "strike"], // text formatting
      [{ list: "ordered" }, { list: "bullet" }], // lists
      ["blockquote", "link", "image"], // blockquote, link, image
      ["clean"], // remove formatting
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "link",
    "image",
  ];

  return (
    <div className="border rounded p-2 bg-white">
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Start typing..."
        className="min-h-[150px]"
      />
    </div>
  );
};

export default Editor;
