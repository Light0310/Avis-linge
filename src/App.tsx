import React, { useState } from 'react';
import { 
  Star, 
  ExternalLink, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  RotateCcw, 
  Instagram, 
  Sparkles, 
  Heart,
  ShieldCheck,
  User,
  Phone,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CONFIG = {
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ-EasyLingeMarrakechDemo',
  whatsappNumber: '212626385663',
  instagramUrl: 'https://instagram.com/ezzilinge.ma?vrfl=MTBtb2tqdzJlaXN1OA%3D%3D',
  minStarGoogle: 4,
};

const STAR_DATA: Record<number, { label: string; mood: string; desc: string }> = {
  1: { label: 'Très décevant', mood: '😔', desc: 'Nous nous excusons pour cette expérience' },
  2: { label: 'À améliorer', mood: '😕', desc: 'Des aspects sont à rectifier' },
  3: { label: 'Moyen / Correct', mood: '😐', desc: 'Expérience passable mais perfectible' },
  4: { label: 'Très satisfait !', mood: '😊', desc: 'Prestation de grande qualité' },
  5: { label: 'Exceptionnel & Parfait !', mood: '✨', desc: 'Une expérience haut de gamme irréprochable' },
};

const ISSUES = [
  'Retard dans la livraison',
  'Linge froissé ou mal repassé',
  'Tache non traitée',
  'Problème d\'odeur ou produit',
  'Article manquant ou inversé',
  'Communication / Accueil'
];

export default function App() {
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Private feedback form state (1-3 stars)
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [submittedPrivate, setSubmittedPrivate] = useState(false);

  const handleSelectStar = (value: number) => {
    setRating(value);
    if (value >= CONFIG.minStarGoogle) {
      try {
        confetti({
          particleCount: 55,
          spread: 70,
          origin: { y: 0.62 },
          colors: ['#1b3b2b', '#c1623c', '#d97706', '#fde047', '#ffffff']
        });
      } catch {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setRating(null);
    setHoverRating(null);
    setSelectedIssues([]);
    setClientName('');
    setClientPhone('');
    setClientMessage('');
    setSubmittedPrivate(false);
  };

  const toggleIssue = (issue: string) => {
    setSelectedIssues(prev =>
      prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]
    );
  };

  const handleOpenGoogle = () => {
    const url = CONFIG.googleReviewUrl.trim() || 'https://maps.google.com';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendWhatsApp = () => {
    const phone = CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
    let text = `Bonjour Easy Linge Kech,\nJe souhaite vous faire part d'une remarque suite à ma commande :`;
    if (clientName.trim()) text += `\n👤 Nom : ${clientName.trim()}`;
    if (clientPhone.trim()) text += `\n📞 Tél : ${clientPhone.trim()}`;
    if (selectedIssues.length > 0) text += `\n⚠️ Motif : ${selectedIssues.join(', ')}`;
    if (clientMessage.trim()) text += `\n💬 Remarque : ${clientMessage.trim()}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitPrivate = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedPrivate(true);
  };

  const activeDisplayRating = hoverRating !== null ? hoverRating : (rating || 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbf9f5] via-[#f7f5f0] to-[#ede7dc] text-[#1f2937] flex flex-col justify-between items-center p-4 sm:p-6 font-sans relative overflow-x-hidden selection:bg-[#c1623c]/20">
      {/* Decorative ambient Moroccan glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[340px] bg-gradient-to-b from-[#c1623c]/10 via-[#1b3b2b]/6 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Review Card */}
      <div className="w-full max-w-[460px] bg-white/95 backdrop-blur-md rounded-[32px] p-6 sm:p-9 shadow-[0_25px_65px_-15px_rgba(27,59,43,0.14),0_6px_20px_rgba(193,98,60,0.06)] border border-[#1b3b2b]/10 text-center transition-all my-auto relative overflow-hidden">
        {/* Moroccan luxury top ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1b3b2b] via-[#c1623c] to-[#d97706]" />

        {/* Brand Header */}
        <div className="mb-6 pt-2">
          {/* Royal Seal Laundry Badge */}
          <div className="relative inline-block mb-3.5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1b3b2b] via-[#142e22] to-[#0a1b13] text-white flex items-center justify-center shadow-lg shadow-[#1b3b2b]/30 ring-2 ring-amber-500/25 transition-transform hover:scale-105 duration-300">
              <svg
                className="w-8 h-8 text-[#f7f5f0]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Modern luxury iron silhouette */}
                <path d="M4 18h16a1 1 0 0 0 1-1l-2-7a2 2 0 0 0-2-1H9a4 4 0 0 0-4 4v4a1 1 0 0 0 1 1z" />
                <path d="M7 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
                <circle cx="9" cy="14" r="0.8" fill="#f7f5f0" />
                <circle cx="12" cy="14" r="0.8" fill="#f7f5f0" />
                <circle cx="15" cy="14" r="0.8" fill="#f7f5f0" />
              </svg>
            </div>
            {/* Terracotta sparkle tag */}
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#c1623c] to-[#a94f2b] flex items-center justify-center text-white shadow-sm ring-2 ring-white">
              <Sparkles className="w-3 h-3 text-amber-200" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b3b2b] tracking-tight font-serif-marrakech">
            Easy Linge Kech
          </h1>
          <p className="text-xs text-[#6b7280] font-medium tracking-wide mt-1">
            Blanchisserie Éco-Responsable & Conciergerie • Marrakech
          </p>

          <a
            href={CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c1623c] hover:text-[#a94f2b] mt-2.5 transition-all group px-3.5 py-1 rounded-full bg-[#faeee8]/80 hover:bg-[#faeee8] border border-[#c1623c]/15"
          >
            <Instagram className="w-3.5 h-3.5 text-[#c1623c] transition-transform group-hover:scale-110" />
            <span>@ezzilinge.ma</span>
            <ExternalLink className="w-3 h-3 text-[#c1623c]/70" />
          </a>
        </div>

        {/* STEP 1: INITIAL STAR RATING SECTION */}
        {rating === null && (
          <div className="animate-fadeIn">
            <div className="mb-4">
              <h2 className="text-base sm:text-lg font-bold text-[#1f2937]">
                Votre avis compte énormément !
              </h2>
              <p className="text-xs text-[#6b7280] max-w-xs mx-auto mt-1 leading-relaxed">
                Prenez 10 secondes pour évaluer la qualité de notre service de linge.
              </p>
            </div>

            {/* Tactile Star Bar */}
            <div
              className="flex justify-center items-center gap-2 sm:gap-3 py-4 px-3 my-3 bg-gradient-to-b from-[#fdfcf9] to-[#f8f6f0] rounded-2xl border border-[#ede7dc] shadow-inner"
              onMouseLeave={() => setHoverRating(null)}
            >
              {[1, 2, 3, 4, 5].map((starVal) => {
                const isFilled = starVal <= activeDisplayRating;
                return (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => handleSelectStar(starVal)}
                    onMouseEnter={() => setHoverRating(starVal)}
                    className="p-1 rounded-xl transition-all duration-150 transform hover:scale-125 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d97706]"
                    aria-label={`${starVal} étoiles`}
                  >
                    <Star
                      className={`w-9 h-9 sm:w-11 sm:h-11 transition-all duration-200 ${
                        isFilled
                          ? 'text-[#d97706] fill-[#d97706] drop-shadow-[0_3px_10px_rgba(217,119,6,0.5)] scale-105'
                          : 'text-[#d1d5db] fill-transparent hover:text-amber-300'
                      }`}
                      strokeWidth={1.4}
                    />
                  </button>
                );
              })}
            </div>

            {/* Dynamic Interactive Feedback Pill */}
            <div className="min-h-10 flex items-center justify-center my-2">
              {activeDisplayRating > 0 ? (
                <div className="inline-flex flex-col items-center animate-fadeIn">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f7f5f0] border border-[#e5e7eb] shadow-xs">
                    <span className="text-sm">{STAR_DATA[activeDisplayRating]?.mood}</span>
                    <span className="text-xs font-bold text-[#1b3b2b]">
                      {STAR_DATA[activeDisplayRating]?.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6b7280] mt-1 font-medium">
                    {STAR_DATA[activeDisplayRating]?.desc}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-[#9ca3af] font-medium flex items-center gap-1">
                  <span>Touchez les étoiles pour noter</span>
                </span>
              )}
            </div>

            {/* Trust badge */}
            <div className="mt-5 pt-3.5 border-t border-[#f3f4f6] flex items-center justify-center gap-1.5 text-[11px] text-[#9ca3af]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1b3b2b]" />
              <span>Avis 100% vérifié • Particuliers, Riads & Hôtels à Marrakech</span>
            </div>
          </div>
        )}

        {/* STEP 2: POSITIVE BRANCH (4 or 5 STARS) -> DIRECT GOOGLE REVIEWS (NO PRE-WRITTEN TEXT) */}
        {rating !== null && rating >= CONFIG.minStarGoogle && (
          <div className="animate-fadeIn text-left">
            {/* Top Stars & modify rating button */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#f3f4f6]">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= rating ? 'text-[#d97706] fill-[#d97706]' : 'text-gray-200'
                    }`}
                  />
                ))}
                <span className="text-xs font-bold text-[#1b3b2b] ml-1.5">
                  {rating}/5
                </span>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] text-[#6b7280] hover:text-[#1b3b2b] inline-flex items-center gap-1 font-medium cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Changer ma note
              </button>
            </div>

            {/* Appreciation Heading */}
            <div className="text-center mb-6 pt-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mb-3 shadow-xs">
                <Heart className="w-6 h-6 fill-emerald-500 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-[#1b3b2b] font-serif-marrakech">
                Merci infiniment pour votre confiance !
              </h2>
              <p className="text-xs text-[#6b7280] leading-relaxed mt-2 max-w-sm mx-auto">
                Prenez quelques secondes pour partager votre avis sur Google, cela donne un précieux coup de pouce à notre équipe d'artisans du linge à Marrakech.
              </p>
            </div>

            {/* High-Conversion Primary CTA: Google Reviews */}
            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={handleOpenGoogle}
                className="w-full bg-gradient-to-r from-[#1b3b2b] via-[#142e22] to-[#0d1e16] hover:from-[#142e22] hover:to-[#050f0b] text-white font-bold py-4 px-4 rounded-xl text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#1b3b2b]/30 active:scale-[0.99] cursor-pointer group"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[11px] font-black text-[#4285F4] shadow-xs">
                  G
                </div>
                <span className="font-semibold tracking-wide">Publier mon avis sur Google ⭐</span>
                <ArrowRight className="w-4 h-4 text-amber-300 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Instagram Follow CTA */}
              <a
                href={CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#fdfbf9] to-[#faeee8] hover:from-[#faeee8] hover:to-[#f5e1d7] text-[#1b3b2b] border border-[#c1623c]/20 font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Instagram className="w-4 h-4 text-[#c1623c]" />
                <span>Rejoignez-nous sur Instagram @ezzilinge.ma</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#9ca3af]" />
              </a>
            </div>
          </div>
        )}

        {/* STEP 3: PRIVATE BRANCH (1 TO 3 STARS) -> VIP CARE & DEFLECTION */}
        {rating !== null && rating < CONFIG.minStarGoogle && (
          <div className="animate-fadeIn text-left">
            {/* Top Stars & modify rating button */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#f3f4f6]">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= rating ? 'text-[#d97706] fill-[#d97706]' : 'text-gray-200'
                    }`}
                  />
                ))}
                <span className="text-xs font-bold text-[#c1623c] ml-1.5">
                  {rating}/5
                </span>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] text-[#6b7280] hover:text-[#1b3b2b] inline-flex items-center gap-1 font-medium cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Changer ma note
              </button>
            </div>

            {!submittedPrivate ? (
              <form onSubmit={handleSubmitPrivate} className="space-y-3.5">
                <div className="text-center mb-3">
                  <h2 className="text-base sm:text-lg font-bold text-[#1b3b2b] font-serif-marrakech">
                    Votre satisfaction est notre priorité absolue
                  </h2>
                  <p className="text-xs text-[#6b7280] mt-1 leading-relaxed">
                    Nous sommes sincèrement désolés que tout n'ait pas été parfait. Partagez votre remarque afin que notre équipe rectifie cela immédiatement.
                  </p>
                </div>

                {/* Categorized Problem Chips */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#1b3b2b] mb-1.5 uppercase tracking-wide">
                    Quel est le souci rencontré ?
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {ISSUES.map((issue) => {
                      const isSelected = selectedIssues.includes(issue);
                      return (
                        <button
                          key={issue}
                          type="button"
                          onClick={() => toggleIssue(issue)}
                          className={`text-[11px] p-2 rounded-lg border text-left font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#faeee8] text-[#c1623c] border-[#c1623c] font-bold shadow-xs'
                              : 'bg-[#f7f5f0] text-[#4b5563] border-[#e5e7eb] hover:bg-white'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] shrink-0 ${
                            isSelected ? 'bg-[#c1623c] text-white' : 'border border-[#d1d5db]'
                          }`}>
                            {isSelected ? '✓' : ''}
                          </span>
                          <span className="truncate">{issue}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Inputs with leading icons */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#4b5563] mb-1">
                    Votre nom ou nom du Riad
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ex: Riad Dar Noujoum / M. Karim"
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-[#d1d5db] focus:border-[#c1623c] focus:ring-1 focus:ring-[#c1623c] outline-none bg-[#fdfcf9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4b5563] mb-1">
                    Numéro de téléphone / WhatsApp (pour vous contacter)
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="06..."
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-[#d1d5db] focus:border-[#c1623c] focus:ring-1 focus:ring-[#c1623c] outline-none bg-[#fdfcf9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4b5563] mb-1">
                    Détails de votre remarque
                  </label>
                  <div className="relative">
                    <textarea
                      rows={2}
                      required
                      value={clientMessage}
                      onChange={(e) => setClientMessage(e.target.value)}
                      placeholder="Décrivez brièvement le problème..."
                      className="w-full text-xs p-3 rounded-xl border border-[#d1d5db] focus:border-[#c1623c] focus:ring-1 focus:ring-[#c1623c] outline-none resize-none bg-[#fdfcf9]"
                    />
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-1 space-y-2">
                  <button
                    type="submit"
                    className="w-full bg-[#c1623c] hover:bg-[#a94f2b] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer confidentiellement à la direction</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Écrire directement au responsable sur WhatsApp</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-4 text-center animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3 shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-[#1b3b2b] mb-1 font-serif-marrakech">
                  Message bien transmis à la direction
                </h3>
                <p className="text-xs text-[#6b7280] leading-relaxed mb-5 max-w-xs mx-auto">
                  Notre responsable clientèle a reçu votre réclamation et vous recontactera rapidement pour vous apporter une solution.
                </p>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full bg-[#25D366] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Échanger sur WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-[#6b7280] hover:text-[#1b3b2b] underline cursor-pointer pt-1"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Clean & Elegant Marrakech Footer */}
      <footer className="text-center text-xs text-[#6b7280] py-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
        <span className="font-semibold text-[#1b3b2b]">Easy Linge Kech</span>
        <span className="hidden sm:inline text-gray-300">•</span>
        <span>Sidi Ghanem & Médina • Marrakech</span>
        <span className="hidden sm:inline text-gray-300">•</span>
        <a
          href={CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#c1623c] inline-flex items-center gap-1 transition-colors font-medium text-[#c1623c]"
        >
          <Instagram className="w-3.5 h-3.5" />
          @ezzilinge.ma
        </a>
      </footer>
    </div>
  );
}
