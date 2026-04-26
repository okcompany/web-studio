"use client";

import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Images,
  Newspaper,
  Briefcase,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Upload,
  Check,
  AlertCircle,
  ArrowLeft,
  Menu,
  X,
  FileText,
  Save,
} from "lucide-react";
import AdminList from "../../components/AdminList";
import EditorForm from "../../components/EditorForm";
import Header from "../../components/Header";

// Image-format recommendations — shown inline in every upload widget so the
// person running the CMS never has to guess.
const IMAGE_SPECS = {
  slideshow: {
    label: "Слайд главной страницы",
    format: "WebP (предпочтительно) или JPG",
    size: "1200 × 1200 px (квадрат)",
    maxWeight: "≤ 800 КБ",
    ratio: "1 : 1",
    notes: "Фото ложится в рисованную рамку с поворотом 2°.",
  },
  portfolioCover: {
    label: "Обложка проекта в портфолио",
    format: "WebP или JPG",
    size: "1200 × 900 px (4 : 3)",
    maxWeight: "≤ 1 МБ",
    ratio: "4 : 3",
    notes: "Главное изображение карточки проекта.",
  },
  newsCover: {
    label: "Обложка новости",
    format: "WebP или JPG",
    size: "1200 × 675 px (16 : 9)",
    maxWeight: "≤ 800 КБ",
    ratio: "16 : 9",
    notes: "Появляется в ленте новостей и на странице новости.",
  },
  about: {
    label: "Фото «Обо мне»",
    format: "JPG или PNG",
    size: "800 × 800 px (квадрат)",
    maxWeight: "≤ 500 КБ",
    ratio: "1 : 1",
    notes: "Ложится в SVG-рамку с плавными краями.",
  },
  gallery: {
    label: "Галерея проекта",
    format: "WebP или JPG",
    size: "1600 × 1200 px (4 : 3)",
    maxWeight: "≤ 1.2 МБ",
    ratio: "4 : 3",
    notes: "Можно добавить несколько изображений.",
  },
};

const TABS = [
  { key: "dashboard", label: "Главная", Icon: LayoutDashboard },
  { key: "news", label: "Новости", Icon: Newspaper },
  { key: "portfolio", label: "Портфолио", Icon: Briefcase },
  { key: "slideshow", label: "Слайдшоу", Icon: Images },
  { key: "legal", label: "Правовые страницы", Icon: FileText },
  { key: "settings", label: "Настройки", Icon: Settings },
];

export default function AdminPage() {
  const [authState, setAuthState] = useState("checking");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/login")
      .then((res) => res.json())
      .then((data) =>
        setAuthState(data.authenticated ? "authenticated" : "login"),
      )
      .catch(() => setAuthState("login"));
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
    } catch (_) {
      /* noop */
    }
    setAuthState("login");
  }

  if (authState === "checking") {
    return (
      <div className="min-h-screen bg-[#FEFEFE]">
        <Header />
        <div className="text-center mt-20 font-kalam text-[#5A5A5A]">
          Проверка доступа...
        </div>
      </div>
    );
  }

  if (authState === "login") {
    return <AdminLogin onAuthenticated={() => setAuthState("authenticated")} />;
  }

  const activeMeta = TABS.find((t) => t.key === activeTab) || TABS[0];

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10">
        {/* Mobile tab bar */}
        <div className="md:hidden mb-4 flex items-center justify-between bg-white border border-[#EADFD0] rounded-2xl px-4 py-3">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex items-center gap-2 font-kalam"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            <span>{activeMeta.label}</span>
          </button>
          <button
            onClick={handleLogout}
            className="font-kalam text-sm text-[#9A5555] flex items-center gap-1"
          >
            <LogOut size={16} /> Выйти
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
          {/* Sidebar */}
          <aside
            className={`${sidebarOpen ? "block" : "hidden"} md:block`}
          >
            <div className="bg-white border border-[#EADFD0] rounded-2xl p-4 sticker-shadow">
              <div className="font-caveat text-2xl text-[#2A2A2A] mb-4 px-2">
                Admin panel
              </div>
              <nav className="space-y-1">
                {TABS.map(({ key, label, Icon }) => {
                  const active = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveTab(key);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-kalam transition-colors ${
                        active
                          ? "bg-gradient-to-r from-[#E8F4F8] via-[#F0E8D6] to-[#F5E6F8] text-[#2A2A2A]"
                          : "text-[#5A5A5A] hover:bg-[#FCFAF7]"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </nav>
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 mt-6 w-full px-3 py-2 rounded-xl font-kalam text-sm text-[#9A5555] hover:bg-[#FCF3F1]"
              >
                <LogOut size={16} /> Выйти
              </button>
            </div>
          </aside>

          {/* Content area */}
          <main>
            {activeTab === "dashboard" && <DashboardPanel onGo={setActiveTab} />}
            {activeTab === "news" && <CmsPanel type="news" />}
            {activeTab === "portfolio" && <CmsPanel type="portfolio" />}
            {activeTab === "slideshow" && <SlideshowPanel />}
            {activeTab === "legal" && <LegalPanel />}
            {activeTab === "settings" && <SettingsPanel />}
          </main>
        </div>
      </div>
    </div>
  );
}

function AdminLogin({ onAuthenticated }) {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed");
      }
      onAuthenticated();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <Header />
      <div className="max-w-md mx-auto mt-12 md:mt-20 px-4">
        <div className="bg-white border border-[#EADFD0] rounded-2xl p-6 md:p-8 sticker-shadow">
          <h1 className="font-caveat text-4xl font-bold text-[#2A2A2A] text-center mb-2">
            Admin panel
          </h1>
          <p className="font-kalam text-sm text-[#7A7A7A] text-center mb-6">
            Вход для управления сайтом
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="font-kalam text-sm text-[#3A3A3A]">Пароль</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="mt-1 w-full border border-[#EADFD0] rounded-xl px-4 py-2.5 font-kalam focus:ring-2 focus:ring-[#A8D5BA] focus:border-[#A8D5BA] outline-none transition"
                required
              />
            </label>
            {error && (
              <div className="flex items-center gap-2 font-kalam text-sm text-[#B04C4C] bg-[#FCF3F1] border border-[#F0C5A9] rounded-xl px-3 py-2">
                <AlertCircle size={16} /> {error}
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2A2A2A] text-white font-kalam py-2.5 rounded-xl hover:bg-[#444] transition disabled:opacity-60"
            >
              {submitting ? "Вход..." : "Войти"}
            </button>
          </form>
          <p className="mt-6 text-xs font-kalam text-[#9A9A9A] text-center">
            Пароль настраивается через переменную окружения{" "}
            <code className="bg-[#FCFAF7] px-1 rounded">ADMIN_PASSWORD</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
      <div>
        <h2 className="font-caveat text-3xl md:text-4xl text-[#2A2A2A]">
          {title}
        </h2>
        {subtitle && (
          <p className="font-kalam text-[#7A7A7A] text-sm mt-1">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

function ImageSpecCard({ spec }) {
  return (
    <div className="bg-[#FCFAF7] border border-[#EADFD0] rounded-xl p-4 font-kalam text-sm text-[#3A3A3A] space-y-1">
      <div className="font-caveat text-lg text-[#2A2A2A]">
        Рекомендации по изображению
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
        <div>
          <span className="text-[#7A7A7A]">Формат:</span> {spec.format}
        </div>
        <div>
          <span className="text-[#7A7A7A]">Размер:</span> {spec.size}
        </div>
        <div>
          <span className="text-[#7A7A7A]">Пропорции:</span> {spec.ratio}
        </div>
        <div>
          <span className="text-[#7A7A7A]">Вес файла:</span> {spec.maxWeight}
        </div>
      </div>
      {spec.notes && (
        <p className="text-xs text-[#7A7A7A] italic mt-1">{spec.notes}</p>
      )}
    </div>
  );
}

function DashboardPanel({ onGo }) {
  const cards = [
    {
      key: "slideshow",
      title: "Слайдшоу главной",
      description: "Добавить / удалить фото героя главной страницы",
      color: "#A8D5BA",
      Icon: Images,
    },
    {
      key: "news",
      title: "Новости",
      description: "Создавать и редактировать записи в ленте новостей",
      color: "#F0C5A9",
      Icon: Newspaper,
    },
    {
      key: "portfolio",
      title: "Портфолио",
      description: "Управлять карточками проектов",
      color: "#D4C5F9",
      Icon: Briefcase,
    },
    {
      key: "settings",
      title: "Настройки и форматы",
      description: "Рекомендации по изображениям, пароль, env",
      color: "#BEE3DB",
      Icon: Settings,
    },
  ];
  return (
    <div>
      <SectionHeader
        title="Добро пожаловать"
        subtitle="Выберите раздел, который хотите обновить. Изменения коммитятся в GitHub и деплоятся на сайт автоматически за 1–2 минуты."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map(({ key, title, description, color, Icon }) => (
          <button
            key={key}
            onClick={() => onGo(key)}
            className="text-left bg-white border border-[#EADFD0] rounded-2xl p-5 hover:border-[#F0C5A9] transition-colors watercolor-hover"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: `${color}33`, color }}
            >
              <Icon size={20} />
            </div>
            <div className="font-caveat text-2xl text-[#2A2A2A] mb-1">
              {title}
            </div>
            <div className="font-kalam text-sm text-[#5A5A5A]">
              {description}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 bg-[#FCFAF7] border border-[#EADFD0] rounded-2xl p-5 font-kalam text-sm text-[#3A3A3A] space-y-2">
        <div className="font-caveat text-xl text-[#2A2A2A]">
          Как это всё работает
        </div>
        <ul className="list-disc list-inside space-y-1 text-[#5A5A5A]">
          <li>
            Каждое изменение в админке коммитится в репозиторий{" "}
            <code className="bg-white px-1 rounded">okcompany/web-studio</code>
          </li>
          <li>Vercel подхватывает commit и деплоит новую версию сайта</li>
          <li>
            Локально (если клонируешь репо) данные хранятся в{" "}
            <code className="bg-white px-1 rounded">apps/web/content_data/</code>{" "}
            и{" "}
            <code className="bg-white px-1 rounded">
              apps/web/public/slideshow/
            </code>
          </li>
        </ul>
      </div>
    </div>
  );
}

function CmsPanel({ type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState(null);

  const title = type === "news" ? "Новости" : "Портфолио";
  const endpoint = type === "news" ? "/api/news" : "/api/portfolio";
  const coverSpec = type === "news" ? IMAGE_SPECS.newsCover : IMAGE_SPECS.portfolioCover;

  async function fetchAll() {
    setLoading(true);
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setItems(data.data || []);
    } catch (err) {
      setItems([]);
      setMessage({ type: "error", text: err.message });
    }
    setShowEditor(false);
    setEditing(null);
    setLoading(false);
  }

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  async function handleDelete(folder_name) {
    if (!confirm("Удалить публикацию?")) return;
    setMessage(null);
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ folder_name }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMessage({ type: "error", text: err.error || "Ошибка удаления" });
      return;
    }
    await fetchAll();
    setMessage({ type: "ok", text: "Публикация удалена." });
  }

  async function handleSave(obj) {
    const method = editing ? "PUT" : "POST";
    setMessage(null);
    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(obj),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Ошибка сохранения");
    }
    await fetchAll();
    setMessage({ type: "ok", text: "Публикация сохранена." });
  }

  return (
    <div>
      <SectionHeader
        title={title}
        subtitle="Всё публикуется через GitHub → автоматический деплой"
        action={
          !showEditor && (
            <button
              onClick={() => {
                setEditing(null);
                setShowEditor(true);
              }}
              className="inline-flex items-center gap-2 bg-[#2A2A2A] text-white font-kalam px-4 py-2 rounded-xl hover:bg-[#444] transition"
            >
              <Plus size={16} /> Создать
            </button>
          )
        }
      />

      {!showEditor && <ImageSpecCard spec={coverSpec} />}
      <div className="mt-4" />
      {message && (
        <div className={`mb-4 font-kalam text-sm ${message.type === "ok" ? "text-green-700" : "text-red-700"}`}>
          {message.text}
        </div>
      )}

      {!showEditor ? (
        <AdminList
          items={items}
          onEdit={(item) => {
            setEditing(item);
            setShowEditor(true);
          }}
          onDelete={handleDelete}
          type={type}
        />
      ) : (
        <div>
          <button
            onClick={() => {
              setShowEditor(false);
              setEditing(null);
            }}
            className="mb-3 font-kalam text-sm text-[#5A5A5A] inline-flex items-center gap-1 hover:text-[#2A2A2A]"
          >
            <ArrowLeft size={14} /> К списку
          </button>
          <EditorForm
            initialData={editing}
            onSave={handleSave}
            type={type}
          />
        </div>
      )}
      {loading && (
        <div className="text-center mt-6 font-kalam text-[#7A7A7A]">
          Загрузка...
        </div>
      )}
    </div>
  );
}

function SlideshowPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/slideshow");
      const data = await res.json();
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (_) {
      setItems([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setMessage(null);
    if (file.size > 3 * 1024 * 1024) {
      setMessage({ type: "error", text: "Файл больше 3 МБ — слишком тяжёлый." });
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/slideshow", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Ошибка загрузки");
      }
      setMessage({ type: "ok", text: "Фото добавлено и задеплоено." });
      fetchItems();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(name) {
    if (!confirm(`Удалить ${name}?`)) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/slideshow?name=${encodeURIComponent(name)}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("Ошибка удаления");
      setMessage({ type: "ok", text: "Фото удалено." });
      fetchItems();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
      setLoading(false);
    }
  }

  return (
    <div>
      <SectionHeader
        title="Слайдшоу главной страницы"
        subtitle="Фотографии, которые по очереди показываются в hero-блоке. Порядок — по имени файла (A→Z)."
      />

      <ImageSpecCard spec={IMAGE_SPECS.slideshow} />

      <div className="mt-5 bg-white border border-[#EADFD0] rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="inline-flex items-center gap-2 bg-[#2A2A2A] text-white font-kalam px-4 py-2.5 rounded-xl hover:bg-[#444] transition cursor-pointer">
            <Upload size={16} />
            {uploading ? "Загружаю..." : "Загрузить новое фото"}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/webp,image/jpeg,image/png"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
          <p className="font-kalam text-xs text-[#7A7A7A]">
            После загрузки Vercel автоматически деплоит изменения за 1–2 минуты.
          </p>
        </div>

        {message && (
          <div
            className={`mt-3 flex items-center gap-2 px-3 py-2 rounded-xl font-kalam text-sm ${
              message.type === "ok"
                ? "bg-[#EAF7EE] border border-[#A8D5BA] text-[#2F5D43]"
                : "bg-[#FCF3F1] border border-[#F0C5A9] text-[#9A5555]"
            }`}
          >
            {message.type === "ok" ? (
              <Check size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {message.text}
          </div>
        )}
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="text-center font-kalam text-[#7A7A7A] py-10">
            Загрузка...
          </div>
        ) : items.length === 0 ? (
          <div className="text-center font-kalam text-[#7A7A7A] py-10 bg-white border border-dashed border-[#EADFD0] rounded-2xl">
            Слайдшоу пусто. Загрузите первое фото выше.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.name}
                className="group relative bg-white border border-[#EADFD0] rounded-2xl overflow-hidden sticker-shadow"
              >
                <div className="aspect-square bg-[#FCFAF7]">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 flex items-center justify-between gap-2">
                  <span className="font-kalam text-xs text-[#7A7A7A] truncate">
                    {item.name}
                  </span>
                  <button
                    onClick={() => handleDelete(item.name)}
                    className="text-[#9A5555] hover:text-[#B04C4C] flex-shrink-0 p-1"
                    title="Удалить"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsPanel() {
  const specs = Object.values(IMAGE_SPECS);
  return (
    <div>
      <SectionHeader
        title="Настройки и форматы"
        subtitle="Справочник по изображениям и переменным окружения"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specs.map((s) => (
          <div
            key={s.label}
            className="bg-white border border-[#EADFD0] rounded-2xl p-4 font-kalam text-sm"
          >
            <div className="font-caveat text-xl text-[#2A2A2A] mb-2">
              {s.label}
            </div>
            <div className="grid grid-cols-1 gap-y-1 text-[#3A3A3A]">
              <div>
                <span className="text-[#7A7A7A]">Формат:</span> {s.format}
              </div>
              <div>
                <span className="text-[#7A7A7A]">Размер:</span> {s.size}
              </div>
              <div>
                <span className="text-[#7A7A7A]">Пропорции:</span> {s.ratio}
              </div>
              <div>
                <span className="text-[#7A7A7A]">Вес:</span> {s.maxWeight}
              </div>
              {s.notes && (
                <div className="text-xs text-[#7A7A7A] italic">{s.notes}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#FCFAF7] border border-[#EADFD0] rounded-2xl p-5 font-kalam text-sm text-[#3A3A3A] space-y-2">
        <div className="font-caveat text-xl text-[#2A2A2A]">
          Переменные окружения (Vercel → Settings → Environment Variables)
        </div>
        <ul className="list-disc list-inside space-y-1 text-[#5A5A5A]">
          <li>
            <code className="bg-white px-1 rounded">ADMIN_PASSWORD</code> — пароль
            входа в админку
          </li>
          <li>
            <code className="bg-white px-1 rounded">GITHUB_TOKEN</code> —
            fine-grained PAT (Contents: write) для записи контента в репо
          </li>
          <li>
            <code className="bg-white px-1 rounded">GITHUB_REPO_OWNER</code> /{" "}
            <code className="bg-white px-1 rounded">GITHUB_REPO_NAME</code> /{" "}
            <code className="bg-white px-1 rounded">GITHUB_REPO_BRANCH</code> —
            адрес репозитория (по умолчанию okcompany/web-studio,{" "}
            <em>main</em>)
          </li>
          <li>
            <code className="bg-white px-1 rounded">RESEND_API_KEY</code> /{" "}
            <code className="bg-white px-1 rounded">TELEGRAMM_TOKEN</code> /{" "}
            <code className="bg-white px-1 rounded">TELEGRAMM_ID</code> —
            рассылка сообщений из контактной формы
          </li>
        </ul>
      </div>
    </div>
  );
}

function LegalPanel() {
  const [data, setData] = useState({
    impressum: { de: "", en: "", ru: "" },
    datenschutz: { de: "", en: "", ru: "" },
    updatedAt: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/legal")
      .then((r) => r.json())
      .then((payload) => {
        if (cancelled || !payload) return;
        setData({
          impressum: {
            de: payload.impressum?.de || "",
            en: payload.impressum?.en || "",
            ru: payload.impressum?.ru || "",
          },
          datenschutz: {
            de: payload.datenschutz?.de || "",
            en: payload.datenschutz?.en || "",
            ru: payload.datenschutz?.ru || "",
          },
          updatedAt: payload.updatedAt || null,
        });
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/legal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          impressum: data.impressum,
          datenschutz: data.datenschutz,
        }),
      });
      if (!res.ok) throw new Error((await res.text()) || "Save failed");
      const payload = await res.json();
      setData((d) => ({ ...d, updatedAt: payload.updatedAt }));
      setMessage({ type: "ok", text: "Сохранено. Коммит ушёл в GitHub." });
    } catch (err) {
      setMessage({ type: "err", text: err.message || "Ошибка сохранения" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 6000);
    }
  }

  function update(section, lang, value) {
    setData((d) => ({ ...d, [section]: { ...d[section], [lang]: value } }));
  }

  const langs = [
    { key: "de", label: "Deutsch (юридически обязательная версия)" },
    { key: "en", label: "English" },
    { key: "ru", label: "Русский" },
  ];

  return (
    <div>
      <SectionHeader
        title="Правовые страницы"
        subtitle="Импрессум и Политика конфиденциальности — редактируется вами. Сохранение коммитит изменения в GitHub, Vercel деплоит сайт за 1–2 минуты."
        action={
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A8D5BA] text-[#2A2A2A] font-kalam hover:bg-[#9BC9AD] disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "Сохраняю…" : "Сохранить"}
          </button>
        }
      />

      {message && (
        <div
          className={`mb-4 flex items-center gap-2 px-4 py-2 rounded-xl font-kalam text-sm ${
            message.type === "ok"
              ? "bg-[#EAF7EE] text-[#2F5D43] border border-[#A8D5BA]"
              : "bg-[#FDECEC] text-[#8A2A2A] border border-[#E8B4B4]"
          }`}
        >
          {message.type === "ok" ? <Check size={16} /> : <AlertCircle size={16} />}
          {message.text}
        </div>
      )}

      <div className="mb-4 text-xs font-kalam text-[#7A7A7A]">
        Последнее изменение:{" "}
        {data.updatedAt
          ? new Date(data.updatedAt).toLocaleString("de-DE")
          : "— страницы ещё ни разу не сохранялись через админку (показывается шаблон)"}
      </div>

      {["impressum", "datenschutz"].map((section) => (
        <div
          key={section}
          className="bg-white border border-[#EADFD0] rounded-2xl p-5 mb-6"
        >
          <div className="font-caveat text-2xl text-[#2A2A2A] mb-3">
            {section === "impressum" ? "Impressum" : "Datenschutzerklärung"}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {langs.map((l) => (
              <label key={l.key} className="block">
                <div className="font-kalam text-sm text-[#5A5A5A] mb-1">
                  {l.label}
                </div>
                <textarea
                  rows={10}
                  value={data[section][l.key]}
                  onChange={(e) => update(section, l.key, e.target.value)}
                  disabled={loading}
                  className="w-full p-3 border border-[#EADFD0] rounded-xl font-kalam text-sm text-[#2A2A2A] bg-[#FDFBF7] focus:outline-none focus:border-[#A8D5BA]"
                  placeholder="Оставьте пустым, чтобы показать шаблон по умолчанию"
                />
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-[#FCFAF7] border border-[#EADFD0] rounded-2xl p-5 font-kalam text-sm text-[#5A5A5A] space-y-2">
        <div className="font-caveat text-xl text-[#2A2A2A]">Подсказки</div>
        <ul className="list-disc list-inside space-y-1">
          <li>Пустые переводы автоматически падают на немецкий текст.</li>
          <li>
            Между абзацами вставляйте пустую строку — она превратится в отступ
            на странице.
          </li>
          <li>
            Если после сохранения страница /impressum или /datenschutz не
            обновилась — подождите 30–60 секунд, Vercel дособирает новый
            деплой после коммита.
          </li>
        </ul>
      </div>
    </div>
  );
}
