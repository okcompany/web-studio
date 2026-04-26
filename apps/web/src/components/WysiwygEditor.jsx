import { useRef, useEffect, useCallback, useState } from "react";
import { useUpload } from "../utils/useUpload";
import { countCmsImages } from "../utils/cmsContent";

const MAX_INLINE_IMAGES = 5;

function safeFileName(name) {
  return String(name || "image")
    .replace(/[^\p{L}\p{N}._-]+/gu, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80) || "image";
}

export default function WysiwygEditor({ value, onChange, maxImages = MAX_INLINE_IMAGES }) {
  const ref = useRef();
  const [upload] = useUpload();
  const lastValueRef = useRef();
  const savedRangeRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [message, setMessage] = useState("");

  const saveSelection = useCallback(() => {
    const editor = ref.current;
    const selection = window.getSelection();
    if (!editor || !selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (editor.contains(range.commonAncestorContainer)) {
      savedRangeRef.current = range.cloneRange();
    }
  }, []);

  useEffect(() => {
    if (ref.current && value !== lastValueRef.current) {
      ref.current.innerHTML = value || "";
      lastValueRef.current = value;
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [value]);

  useEffect(() => {
    if (!value) {
      setUploadedImages([]);
      return;
    }
    const div = document.createElement('div');
    div.innerHTML = value;
    const imgs = div.querySelectorAll('img, [data-cms-image]');
    const images = Array.from(imgs)
      .map((node) => ({
        url: node.getAttribute("data-cms-image") || node.getAttribute("src") || "",
        name: node.getAttribute("data-cms-filename") || node.getAttribute("alt") || "image",
      }))
      .filter((image) => image.url);
    setUploadedImages(images);
  }, [value]);

  const handleImageUpload = async () => {
    setMessage("");
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = async (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        const currentCount = countCmsImages(ref.current?.innerHTML || value);
        const freeSlots = Math.max(0, maxImages - currentCount);
        const selected = files.slice(0, freeSlots);
        if (!selected.length) {
          setMessage(`Можно вставить не более ${maxImages} изображений.`);
          return;
        }
        if (files.length > freeSlots) {
          setMessage(`Добавлено ${freeSlots} из ${files.length}: лимит ${maxImages} изображений.`);
        }

        for (const file of selected) {
          const result = await upload({ file });
          if (result.error || !result.url) {
            setMessage(result.error || "Не удалось загрузить изображение.");
            continue;
          }
          insertImageAtCursor({ url: result.url, name: safeFileName(file.name), skipLimit: true });
        }
      }
    };
    input.click();
  };

  const deleteImage = useCallback((imageUrl) => {
    setUploadedImages(prev => prev.filter(img => img.url !== imageUrl));
    if (ref.current) {
      const escaped = imageUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const html = ref.current.innerHTML
        .replace(new RegExp(`<img[^>]*src=["']${escaped}["'][^>]*>`, "g"), "")
        .replace(
          new RegExp(`<span[^>]*data-cms-image=["']${escaped}["'][^>]*>.*?<\\/span>`, "g"),
          "",
        );
      ref.current.innerHTML = html;
      onChange(html);
    }
  }, [onChange]);

  const insertImageAtCursor = useCallback(({ url, name, skipLimit = false }) => {
    const editor = ref.current;
    if (!editor) return;
    const currentCount = countCmsImages(editor.innerHTML);
    if (!skipLimit && currentCount >= maxImages) {
      setMessage(`Можно вставить не более ${maxImages} изображений.`);
      return;
    }

    editor.focus();

    const selection = window.getSelection();
    let range = null;
    if (selection.rangeCount && editor.contains(selection.getRangeAt(0).commonAncestorContainer)) {
      range = selection.getRangeAt(0);
    } else if (savedRangeRef.current) {
      range = savedRangeRef.current.cloneRange();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    if (!range) return;

    range.deleteContents();

    const token = document.createElement("span");
    token.textContent = `[${name}]`;
    token.dataset.cmsImage = url;
    token.dataset.cmsFilename = name;
    token.contentEditable = "false";
    token.className = "cms-image-token";

    range.insertNode(token);

    range.setStartAfter(token);
    range.setEndAfter(token);
    selection.removeAllRanges();
    selection.addRange(range);
    savedRangeRef.current = range.cloneRange();

    setTimeout(() => {
      if (editor) {
        setUploadedImages((prev) =>
          prev.some((image) => image.url === url) ? prev : [...prev, { url, name }],
        );
        const html = editor.innerHTML;
        lastValueRef.current = html;
        onChange(html);
      }
    }, 0);
  }, [maxImages, onChange]);

  return (
    <div>
      <button
        type="button"
        onClick={handleImageUpload}
        className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Загрузить изображения
      </button>
      {message && <div className="mb-2 text-sm text-red-600">{message}</div>}

      {uploadedImages.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded border">
          <div className="text-sm text-gray-600 mb-2">Кликните на изображение, чтобы повторно вставить имя файла в текст:</div>
          <div className="flex flex-wrap gap-2">
            {uploadedImages.map((image, index) => (
              <div key={`${image.url}-${index}`} className="relative">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-16 h-16 object-cover rounded border cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                  onClick={() => insertImageAtCursor(image)}
                  title="Кликните, чтобы вставить в текст"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center hover:bg-red-600"
                  onClick={() => deleteImage(image.url)}
                  title="Удалить изображение"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        ref={ref}
        contentEditable
        className="border rounded px-2 py-1 min-h-[120px] bg-white focus:outline-[#A8D5BA]"
        onInput={e => {
          saveSelection();
          onChange(e.currentTarget.innerHTML);
        }}
        onClick={saveSelection}
        onKeyUp={e => {
          saveSelection();
          onChange(e.currentTarget.innerHTML);
        }}
        suppressContentEditableWarning
        dir="ltr"
        lang="ru"
        style={{
          whiteSpace: "pre-wrap",
          textAlign: "left"
        }}
      />
    </div>
  );
}
