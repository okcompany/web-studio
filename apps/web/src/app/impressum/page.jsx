"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingShapes from "../../components/FloatingShapes";
import { useLanguage } from "../../context/LanguageContext";

// Impressum — legal notice required by §5 TMG and §18 MStV in Germany.
// The German version is the legally binding one; translations below are for
// readers' convenience. Personal data is intentionally left as placeholders
// ("[…]") — the site owner must fill them in before the site is used
// commercially.
export default function ImpressumPage() {
  const { t, currentLanguage } = useLanguage();
  return (
    <div className="min-h-screen bg-[#FEFEFE] relative">
      <FloatingShapes />
      <Header />

      <section className="py-12 px-4 sm:px-8 md:px-12">
        <div className="max-w-3xl mx-auto bg-white/80 border border-[#EADFD0] rounded-2xl p-6 sm:p-10 shadow-sm">
          <h1 className="font-caveat text-4xl sm:text-5xl font-bold text-[#2A2A2A] mb-6">
            {t("legal.impressumTitle")}
          </h1>

          <div className="font-kalam text-[#3A3A3A] leading-relaxed space-y-6 text-base sm:text-lg">
            <ImpressumBody lang={currentLanguage} />
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

function ImpressumBody({ lang }) {
  if (lang === "ru") return <ImpressumRU />;
  if (lang === "en") return <ImpressumEN />;
  return <ImpressumDE />;
}

// German is the legally binding version. Placeholders ("[…]") MUST be filled
// in by the site owner. Until then, the site should not be used for
// paid commercial offers.
function ImpressumDE() {
  return (
    <>
      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        Angaben gemäß § 5 TMG
      </h2>
      <div className="pl-4 border-l-2 border-[#F0C5A9]">
        <p className="whitespace-pre-line">
          {`[Vor- und Nachname]
[Straße und Hausnummer]
[PLZ und Ort]
Deutschland`}
        </p>
      </div>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">Kontakt</h2>
      <div className="pl-4 border-l-2 border-[#A8D5BA]">
        <p>
          E-Mail:{" "}
          <a className="underline decoration-[#A8D5BA]" href="mailto:kalchenko2022@gmail.com">
            kalchenko2022@gmail.com
          </a>
          <br />
          Telefon: [optional — bei Bedarf ergänzen oder weglassen]
        </p>
      </div>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
      </h2>
      <p>[Vor- und Nachname, Anschrift wie oben]</p>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        Hinweis zum Portfolio-Charakter
      </h2>
      <p>
        Diese Website ist ein persönliches Portfolio. Die dargestellten
        Arbeiten und Informationen dienen ausschließlich der Präsentation
        meiner Tätigkeit. Konkrete Leistungen und Preise werden
        ausschließlich individuell auf Anfrage vereinbart — die Inhalte der
        Website stellen ausdrücklich <strong>kein verbindliches Angebot</strong>{" "}
        im Sinne des § 145 BGB dar.
      </p>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        EU-Streitschlichtung
      </h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a
          className="underline decoration-[#F0C5A9]"
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht
        bereit.
      </p>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
        auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
        §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
        verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
        überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
        Tätigkeit hinweisen.
      </p>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
        fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich.
      </p>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">Urheberrecht</h2>
      <p>
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers.
      </p>
    </>
  );
}

function ImpressumRU() {
  return (
    <>
      <p className="text-sm text-[#7A7A7A] italic">
        Ниже — информационный перевод. Юридически обязательной является
        немецкая версия на этой же странице.
      </p>
      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        Данные согласно § 5 TMG
      </h2>
      <div className="pl-4 border-l-2 border-[#F0C5A9]">
        <p className="whitespace-pre-line">
          {`[Имя и Фамилия]
[Улица и номер дома]
[Индекс и город]
Германия`}
        </p>
      </div>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">Контакты</h2>
      <div className="pl-4 border-l-2 border-[#A8D5BA]">
        <p>
          Email:{" "}
          <a className="underline decoration-[#A8D5BA]" href="mailto:kalchenko2022@gmail.com">
            kalchenko2022@gmail.com
          </a>
          <br />
          Телефон: [опционально — можно указать или оставить без телефона]
        </p>
      </div>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        Ответственный за содержание согласно § 18 абз. 2 MStV
      </h2>
      <p>[Имя и Фамилия, адрес как выше]</p>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        О характере сайта
      </h2>
      <p>
        Сайт является личным портфолио. Все материалы служат исключительно
        для презентации работ. Конкретные услуги и цены согласовываются
        индивидуально по запросу — содержание сайта{" "}
        <strong>не является публичной офертой</strong> в смысле § 145 BGB.
      </p>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        Онлайн-разрешение споров ЕС
      </h2>
      <p>
        Европейская комиссия предоставляет платформу для онлайн-разрешения
        споров (OS):{" "}
        <a
          className="underline decoration-[#F0C5A9]"
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Мы не обязаны и не готовы участвовать в процедурах урегулирования
        споров перед службой арбитража потребителей.
      </p>
    </>
  );
}

function ImpressumEN() {
  return (
    <>
      <p className="text-sm text-[#7A7A7A] italic">
        The following is an informational English translation. The legally
        binding version is the German one on this page.
      </p>
      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        Information pursuant to § 5 TMG
      </h2>
      <div className="pl-4 border-l-2 border-[#F0C5A9]">
        <p className="whitespace-pre-line">
          {`[First and last name]
[Street and number]
[ZIP and city]
Germany`}
        </p>
      </div>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">Contact</h2>
      <div className="pl-4 border-l-2 border-[#A8D5BA]">
        <p>
          Email:{" "}
          <a className="underline decoration-[#A8D5BA]" href="mailto:kalchenko2022@gmail.com">
            kalchenko2022@gmail.com
          </a>
          <br />
          Phone: [optional — fill in or omit]
        </p>
      </div>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        Responsible for content under § 18 (2) MStV
      </h2>
      <p>[First and last name, address as above]</p>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        Portfolio disclaimer
      </h2>
      <p>
        This website is a personal portfolio. The work and information shown
        are for presentation purposes only. Any specific services and prices
        are agreed individually on request — the content of this website
        expressly does <strong>not constitute a binding offer</strong> within
        the meaning of § 145 BGB (German Civil Code).
      </p>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        EU online dispute resolution
      </h2>
      <p>
        The European Commission provides a platform for online dispute
        resolution (ODR):{" "}
        <a
          className="underline decoration-[#F0C5A9]"
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . We are not obliged or willing to participate in dispute resolution
        proceedings before a consumer arbitration body.
      </p>

      <h2 className="font-caveat text-2xl text-[#2A2A2A]">
        Liability for content
      </h2>
      <p>
        As a service provider, we are responsible for our own content on these
        pages according to § 7 (1) TMG and general laws. However, according to
        §§ 8 to 10 TMG, we are not obliged as a service provider to monitor
        transmitted or stored external information or to investigate
        circumstances that indicate illegal activity.
      </p>
    </>
  );
}
