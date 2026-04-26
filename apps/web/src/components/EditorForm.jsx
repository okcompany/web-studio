import { useState } from "react";
import WysiwygEditor from "./WysiwygEditor";
import { useUpload } from "../utils/useUpload";
import { countCmsImages } from "../utils/cmsContent";

const LANGS = ["en", "ru", "de"];

export default function EditorForm({ initialData, onSave, type }) {
  initialData = initialData || {};
  const [cover, setCover] = useState(initialData.cover || "");
  const [title, setTitle] = useState(initialData.title || { en: "", ru: "", de: "" });
  const [content, setContent] = useState(initialData.content || { en: "", ru: "", de: "" });
  const [date, setDate] = useState(initialData.date || new Date().toISOString().substring(0, 10));
  const [lang, setLang] = useState("en");
  const [uploading, setUploading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const folderName = initialData.folder_name || null;
  const [upload] = useUpload();

  const imgCount = countCmsImages(content[lang]);

  async function handleCoverChange(e) {
    const file = e.target.files[0];
    if (file) {
      const result = await upload({ file });
      if (result.error || !result.url) {
        setValidationError(result.error || "Не удалось загрузить обложку");
        return;
      }
      setCover(result.url);
      setValidationError("");
    }
  }

  const handleWysiwygChange = html => {
    setContent(c => ({ ...c, [lang]: html }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setValidationError("");
    if (!title.en || !title.ru || !title.de) {
      setValidationError("Заполните все поля названий на трёх языках");
      return;
    }
    if (!Object.values(content).some(val => val.trim().length > 0)) {
      setValidationError("Добавьте хотя бы один текст публикации");
      return;
    }
    setUploading(true);
    try {
      let newFolderName = folderName;
      if (!folderName) {
        const ts = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
        newFolderName = `${type}_${ts}`;
      }
      const obj = {
        folder_name: newFolderName,
        cover: cover || initialData.cover || "",
        title,
        content,
        date
      };
      await onSave(obj);
    } catch (error) {
      setValidationError(error.message || "Ошибка сохранения");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <div>
        <label className="font-semibold block mb-1">Дата</label>
        <input type="date" className="w-full border p-2 rounded" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div>
        <label className="font-semibold block mb-1">Обложка</label>
        <input type="file" accept="image/*" onChange={handleCoverChange} />
        {cover && <img src={cover} alt="cover preview" className="mt-2 max-w-xs rounded" />}
      </div>
      <div>
        <div className="flex gap-2 mb-2">
          {LANGS.map(l => (
            <button type="button" key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded ${lang === l ? 'bg-blue-500 text-white' : 'bg-gray-100 text-blue-900'}`}>{l.toUpperCase()}</button>
          ))}
        </div>
        <label className="font-semibold block mb-1">Название публикации</label>
        <input className="w-full border p-2 rounded mb-4" value={title[lang]} onChange={e => setTitle(t => ({ ...t, [lang]: e.target.value }))} />
        <label className="font-semibold block mb-1">Текст публикации ({imgCount}/5 изображений)</label>
        <WysiwygEditor
          value={content[lang]}
          onChange={val => {
            if (countCmsImages(val) <= 5) {
              handleWysiwygChange(val);
            }
          }}
          maxImages={5}
        />
        <div className="text-gray-500 text-sm mt-1">Можно вставить не более 5 изображений в текст на каждом языке</div>
      </div>
      {validationError && <div className="text-red-600">{validationError}</div>}
      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow" disabled={uploading}>
        {uploading ? 'Сохраняем...' : 'Сохранить'}
      </button>
    </form>
  );
}
