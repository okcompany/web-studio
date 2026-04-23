import React, { useState, useEffect } from "react";
import AdminList from "../../components/AdminList";
import EditorForm from "../../components/EditorForm";
import Header from "../../components/Header";

const TABS = [
  { key: "news", label: "Новости" },
  { key: "portfolio", label: "Портфолио" }
];

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-md mx-auto mt-20 bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Вход в админ-панель</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-700">Пароль</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </label>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Вход..." : "Войти"}
          </button>
        </form>
        <p className="mt-6 text-xs text-gray-500 text-center">
          Установите переменную окружения <code>ADMIN_PASSWORD</code>, чтобы задать свой пароль.
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authState, setAuthState] = useState("checking"); // checking | authenticated | login
  const [activeTab, setActiveTab] = useState("news");
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check session cookie on mount
  useEffect(() => {
    fetch("/api/admin/login")
      .then((res) => res.json())
      .then((data) => setAuthState(data.authenticated ? "authenticated" : "login"))
      .catch(() => setAuthState("login"));
  }, []);

  useEffect(() => {
    if (authState === "authenticated") {
      fetchAll();
    }
    // eslint-disable-next-line
  }, [activeTab, authState]);

  async function fetchAll() {
    setLoading(true);
    let res;
    try {
      if (activeTab === "news") {
        const response = await fetch('/api/news');
        res = (await response.json()).data || [];
      } else {
        const response = await fetch('/api/portfolio');
        res = (await response.json()).data || [];
      }
    } catch (error) {
      // Fallback to localStorage if API fails
      const localData = localStorage.getItem(`admin_${activeTab}`);
      res = localData ? JSON.parse(localData) : [];
    }
    setItems(res);
    setShowEditor(false);
    setEditing(null);
    setLoading(false);
  }

  function handleEdit(item) {
    setEditing(item);
    setShowEditor(true);
  }
  function handleCreate() {
    setEditing(null);
    setShowEditor(true);
  }
  async function handleDelete(folder_name) {
    let endpoint = activeTab === "news" ? "/api/news" : "/api/portfolio";
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder_name })
      });
      if (response.status === 401) {
        setAuthState("login");
        return;
      }
    } catch (error) {
      console.log("API delete failed, using localStorage fallback");
      // Fallback to localStorage
      const localData = localStorage.getItem(`admin_${activeTab}`);
      if (localData) {
        let items = JSON.parse(localData);
        items = items.filter(item => item.folder_name !== folder_name);
        localStorage.setItem(`admin_${activeTab}`, JSON.stringify(items));
      }
    }
    fetchAll();
  }
  async function handleSave(obj) {
    let endpoint = activeTab === "news" ? "/api/news" : "/api/portfolio";
    const method = editing ? "PUT" : "POST";
    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(obj)
      });
      if (response.status === 401) {
        setAuthState("login");
        return;
      }
      if (response.ok) {
        fetchAll();
        return;
      }
    } catch (error) {
      console.log("API save failed, using localStorage fallback");
    }

    // Fallback to localStorage
    try {
      const localData = localStorage.getItem(`admin_${activeTab}`);
      let items = localData ? JSON.parse(localData) : [];

      if (editing) {
        const index = items.findIndex(item => item.folder_name === editing.folder_name);
        if (index !== -1) {
          items[index] = obj;
        }
      } else {
        items.push(obj);
      }

      localStorage.setItem(`admin_${activeTab}`, JSON.stringify(items));
      fetchAll();
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.log('localStorage is full, clearing all data');
        localStorage.clear();
        try {
          localStorage.setItem(`admin_${activeTab}`, JSON.stringify([obj]));
          fetchAll();
        } catch (e) {
          console.log('Still cannot save to localStorage');
        }
      }
    }
  }

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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center mt-20 text-gray-500">Проверка доступа...</div>
      </div>
    );
  }

  if (authState === "login") {
    return <AdminLogin onAuthenticated={() => setAuthState("authenticated")} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-10 px-2">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Выйти
          </button>
        </div>
        <div className="flex gap-6 mb-8 justify-center">
          {TABS.map(t => (
            <button key={t.key}
              className={`text-lg px-6 py-2 rounded-t bg-white shadow ${activeTab === t.key ? "border-b-4 border-blue-500 font-bold" : "opacity-70"}`}
              onClick={() => setActiveTab(t.key)}
            >{t.label}</button>
          ))}
        </div>
        {!showEditor ? (
          <AdminList
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
            type={activeTab}
          />
        ) : (
          <EditorForm initialData={editing} onSave={handleSave} type={activeTab} />
        )}
        {loading && <div className="text-center mt-10">Загрузка...</div>}
      </div>
    </div>
  );
}
