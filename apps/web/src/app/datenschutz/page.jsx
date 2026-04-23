"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingShapes from "../../components/FloatingShapes";
import { useLanguage } from "../../context/LanguageContext";

// Datenschutzerklärung (Privacy Policy) — DSGVO / GDPR compliant template
// for a personal portfolio site with a simple contact form that forwards
// messages via Resend (email) and the Telegram Bot API.
//
// Processors disclosed: Vercel (hosting), Resend (transactional email),
// Telegram Bot (notification), GitHub (source code + content data).
//
// Personal data of the site owner is left as placeholders. Fill in before
// making the site publicly reachable under your own identity.
export default function DatenschutzPage() {
  const { t, currentLanguage } = useLanguage();
  return (
    <div className="min-h-screen bg-[#FEFEFE] relative">
      <FloatingShapes />
      <Header />

      <section className="py-12 px-4 sm:px-8 md:px-12">
        <div className="max-w-3xl mx-auto bg-white/80 border border-[#EADFD0] rounded-2xl p-6 sm:p-10 shadow-sm">
          <h1 className="font-caveat text-4xl sm:text-5xl font-bold text-[#2A2A2A] mb-6">
            {t("legal.datenschutzTitle")}
          </h1>

          <div className="font-kalam text-[#3A3A3A] leading-relaxed space-y-6 text-base sm:text-lg">
            <DatenschutzBody lang={currentLanguage} />
          </div>

          <p className="mt-10 pt-6 border-t border-[#EADFD0] font-kalam text-xs text-[#9A9A9A]">
            {t("legal.lastUpdated")}: 2026-04-23
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function DatenschutzBody({ lang }) {
  if (lang === "ru") return <DatenschutzRU />;
  if (lang === "en") return <DatenschutzEN />;
  return <DatenschutzDE />;
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="font-caveat text-2xl text-[#2A2A2A] mb-2">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function DatenschutzDE() {
  return (
    <>
      <Section title="1. Verantwortlicher">
        <p className="whitespace-pre-line">
          {`[Vor- und Nachname]
[Straße und Hausnummer]
[PLZ und Ort], Deutschland
E-Mail: kalchenko2022@gmail.com`}
        </p>
      </Section>

      <Section title="2. Allgemeine Hinweise">
        <p>
          Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
          behandeln Ihre personenbezogenen Daten vertraulich und entsprechend
          den gesetzlichen Datenschutzvorschriften (DSGVO, BDSG) sowie dieser
          Datenschutzerklärung.
        </p>
      </Section>

      <Section title="3. Erhebung von Daten beim Besuch der Website">
        <p>
          Beim bloßen Aufrufen dieser Website werden von unserem Hosting-Provider
          (Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA)
          automatisch Informationen in sogenannten Server-Log-Dateien
          gespeichert, die Ihr Browser übermittelt (u. a. IP-Adresse,
          Zeitstempel, Referer, User-Agent). Diese Daten dienen ausschließlich
          der Sicherheit und Stabilität des Dienstes und werden nach 30 Tagen
          automatisch gelöscht. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse am sicheren Betrieb).
        </p>
      </Section>

      <Section title="4. Kontaktformular">
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
          Ihre Angaben (Name, E-Mail-Adresse, Betreff, Nachricht) zum Zwecke
          der Bearbeitung der Anfrage verarbeitet. Die Verarbeitung erfolgt
          auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) bzw.
          zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b
          DSGVO).
        </p>
        <p>
          Ihre Nachricht wird dabei an die folgenden Auftragsverarbeiter
          weitergeleitet:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>
            <strong>Resend (Resend.com Inc., Delaware, USA)</strong> — Versand
            der Nachricht als E-Mail. Datenschutz:{" "}
            <a className="underline decoration-[#A8D5BA]" href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              resend.com/legal/privacy-policy
            </a>
          </li>
          <li>
            <strong>Telegram (Telegram FZ LLC, Dubai)</strong> — Zustellung
            einer Benachrichtigung an den Betreiber. Datenschutz:{" "}
            <a className="underline decoration-[#A8D5BA]" href="https://telegram.org/privacy" target="_blank" rel="noopener noreferrer">
              telegram.org/privacy
            </a>
          </li>
        </ul>
        <p>
          Wir speichern Ihre Anfrage für maximal 6 Monate, sofern kein
          laufender Kundenauftrag besteht. Danach werden die Daten gelöscht.
        </p>
      </Section>

      <Section title="5. Cookies und lokaler Speicher">
        <p>
          Diese Website verwendet keine Tracking- oder Werbe-Cookies. Es wird
          ein technisch notwendiges Cookie (<code>ok_lang</code>) gesetzt, um
          die von Ihnen gewählte Sprache zu speichern, sowie ein
          Session-Cookie (<code>ok_admin_session</code>) für den Login-Bereich
          des Admin-Panels. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </Section>

      <Section title="6. Weitere Auftragsverarbeiter">
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>
            <strong>Vercel Inc., USA</strong> — Hosting der Website und
            API-Endpunkte. EU-US Data Privacy Framework zertifiziert.{" "}
            <a className="underline decoration-[#A8D5BA]" href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              vercel.com/legal/privacy-policy
            </a>
          </li>
          <li>
            <strong>GitHub, Inc., USA</strong> — Speicherung des Quellcodes
            und der Inhalte (Portfolio-Einträge, News). Personenbezogene
            Daten von Besuchern werden dort nicht gespeichert.{" "}
            <a className="underline decoration-[#A8D5BA]" href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
              Privacy Statement
            </a>
          </li>
          <li>
            <strong>Google Fonts</strong> — Schriftarten werden direkt bei
            Google Fonts geladen. Dabei wird Ihre IP-Adresse an Google (Google
            Ireland Ltd.) übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f
            DSGVO.
          </li>
        </ul>
      </Section>

      <Section title="7. Ihre Rechte">
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten („Recht auf Vergessenwerden", Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Widerruf Ihrer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p>
          Zur Ausübung dieser Rechte genügt eine formlose E-Mail an{" "}
          <a className="underline decoration-[#A8D5BA]" href="mailto:kalchenko2022@gmail.com">
            kalchenko2022@gmail.com
          </a>
          .
        </p>
      </Section>

      <Section title="8. Beschwerderecht">
        <p>
          Sie haben ferner das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
          zu beschweren — z. B. bei dem{" "}
          <a
            className="underline decoration-[#A8D5BA]"
            href="https://datenschutz-hamburg.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hamburgischen Beauftragten für Datenschutz und Informationsfreiheit
          </a>{" "}
          oder bei der für Ihren Wohnort zuständigen Landesdatenschutzbehörde.
        </p>
      </Section>

      <Section title="9. Änderungen">
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit
          sie stets den aktuellen rechtlichen Anforderungen entspricht. Für
          Ihren erneuten Besuch gilt dann die aktuelle Fassung.
        </p>
      </Section>
    </>
  );
}

function DatenschutzRU() {
  return (
    <>
      <p className="text-sm text-[#7A7A7A] italic">
        Ниже — информационный перевод. Юридически обязательной является
        немецкая версия.
      </p>
      <Section title="1. Контактные данные ответственного лица">
        <p className="whitespace-pre-line">
          {`[Имя и Фамилия]
[Улица и номер дома]
[Индекс и город], Германия
Email: kalchenko2022@gmail.com`}
        </p>
      </Section>

      <Section title="2. Общие положения">
        <p>
          Защита ваших персональных данных для нас важна. Мы обрабатываем
          персональные данные строго в соответствии с требованиями GDPR и
          немецкого BDSG.
        </p>
      </Section>

      <Section title="3. Данные, собираемые автоматически при посещении">
        <p>
          При посещении сайта наш хостинг-провайдер (Vercel Inc., США)
          автоматически сохраняет в лог-файлах информацию, передаваемую вашим
          браузером (IP-адрес, время запроса, referer, User-Agent). Данные
          используются для обеспечения безопасности и стабильности сервиса
          и удаляются через 30 дней. Правовая основа: ст. 6 (1) (f) GDPR.
        </p>
      </Section>

      <Section title="4. Контактная форма">
        <p>
          При отправке сообщения через контактную форму обрабатываются
          указанные вами данные (имя, email, тема, текст сообщения). Правовая
          основа: ст. 6 (1) (a) и (b) GDPR.
        </p>
        <p>Обработчики данных:</p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>Resend (США) — доставка email сообщения</li>
          <li>Telegram (ОАЭ) — уведомление владельцу сайта</li>
        </ul>
        <p>
          Срок хранения сообщения — до 6 месяцев, если у нас не начат активный
          проект.
        </p>
      </Section>

      <Section title="5. Cookies">
        <p>
          Сайт не использует рекламные или отслеживающие cookies. Используются
          только технически необходимые: <code>ok_lang</code> (выбранный язык)
          и <code>ok_admin_session</code> (сессия админ-панели).
        </p>
      </Section>

      <Section title="6. Ваши права">
        <p>
          Согласно GDPR вы имеете право на доступ, исправление, удаление,
          ограничение обработки, перенос данных, возражение против обработки
          и отзыв согласия. Обращение — на email{" "}
          <a className="underline decoration-[#A8D5BA]" href="mailto:kalchenko2022@gmail.com">
            kalchenko2022@gmail.com
          </a>
          .
        </p>
      </Section>

      <Section title="7. Право на жалобу">
        <p>
          Вы можете подать жалобу в немецкий орган по защите данных, например:{" "}
          <a
            className="underline decoration-[#A8D5BA]"
            href="https://datenschutz-hamburg.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hamburgischer Beauftragter für Datenschutz
          </a>
          .
        </p>
      </Section>
    </>
  );
}

function DatenschutzEN() {
  return (
    <>
      <p className="text-sm text-[#7A7A7A] italic">
        The following is an informational translation. The legally binding
        version is the German one on this page.
      </p>
      <Section title="1. Data controller">
        <p className="whitespace-pre-line">
          {`[First and last name]
[Street and number]
[ZIP and city], Germany
Email: kalchenko2022@gmail.com`}
        </p>
      </Section>

      <Section title="2. General information">
        <p>
          We take the protection of your personal data seriously and treat
          your data confidentially and in accordance with the GDPR and the
          German Federal Data Protection Act (BDSG).
        </p>
      </Section>

      <Section title="3. Server logs">
        <p>
          When you visit this site, our hosting provider (Vercel Inc., USA)
          automatically stores information that your browser transmits (IP
          address, timestamp, referer, user-agent). This is used for the
          security and stability of the service and deleted after 30 days.
          Legal basis: Art. 6 (1) (f) GDPR.
        </p>
      </Section>

      <Section title="4. Contact form">
        <p>
          When you send a message via the contact form, the data you provide
          (name, email, subject, message) is processed for the purpose of
          responding. Legal basis: Art. 6 (1) (a) and (b) GDPR.
        </p>
        <p>Processors involved:</p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>Resend (USA) — delivery of the message as an email</li>
          <li>Telegram (UAE) — notification to the site owner</li>
        </ul>
        <p>
          Messages are kept for a maximum of 6 months unless an active project
          is underway.
        </p>
      </Section>

      <Section title="5. Cookies and local storage">
        <p>
          No tracking or advertising cookies are used. Only strictly necessary
          cookies are set: <code>ok_lang</code> (your language preference) and{" "}
          <code>ok_admin_session</code> (admin panel session).
        </p>
      </Section>

      <Section title="6. Your rights">
        <p>
          Under the GDPR you have the right of access, rectification, erasure,
          restriction of processing, data portability, objection and
          withdrawal of consent. To exercise any of these rights, email us at{" "}
          <a className="underline decoration-[#A8D5BA]" href="mailto:kalchenko2022@gmail.com">
            kalchenko2022@gmail.com
          </a>
          .
        </p>
      </Section>

      <Section title="7. Right to lodge a complaint">
        <p>
          You have the right to lodge a complaint with a German data
          protection supervisory authority, e.g. the{" "}
          <a
            className="underline decoration-[#A8D5BA]"
            href="https://datenschutz-hamburg.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hamburg Commissioner for Data Protection
          </a>
          .
        </p>
      </Section>
    </>
  );
}
