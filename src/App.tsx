import React, { useState } from 'react';
import { Star, ExternalLink, MessageCircle, Send, CheckCircle2, RotateCcw, Instagram, Sparkles } from 'lucide-react';

const CONFIG = {
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ-EasyLingeMarrakechDemo',
  whatsappNumber: '212626385663',
  instagramUrl: 'https://instagram.com/ezzilinge.ma?vrfl=MTBtb2tqdzJlaXN1OA%3D%3D',
  minStarGoogle: 4,
};

const STAR_LABELS: Record<number, string> = {
  1: 'Très décevant',
  2: 'Décevant',
  3: 'Moyen',
  4: 'Très bien',
  5: 'Excellent',
};

export default function App() {
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Form for low rating (1-3)
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [submittedPrivate, setSubmittedPrivate] = useState(false);

  const handleSelectStar = (value: number) => {
    setRating(value);
  };

  const handleReset = () => {
    setRating(null);
    setHoverRating(null);
    setClientName('');
    setClientPhone('');
    setClientMessage('');
    setSubmittedPrivate(false);
  };

  const handleOpenGoogle = () => {
    const url = CONFIG.googleReviewUrl.trim() || 'https://maps.google.com';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendWhatsApp = () => {
    const phone = CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
    let text = `Bonjour Easy Linge Kech,\nJe souhaite vous faire part d'une remarque concernant ma commande :`;
    if (clientName.trim()) text += `\nNom : ${clientName.trim()}`;
    if (clientPhone.trim()) text += `\nTél : ${clientPhone.trim()}`;
    if (clientMessage.trim()) text += `\nMessage : ${clientMessage.trim()}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitPrivate = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedPrivate(true);
  };

  const activeDisplayRating = hoverRating !== null ? hoverRating : (rating || 0);

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1f2937] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      {/* Main Review Card */}
      <div className="w-full max-w-[440px] bg-white rounded-[22px] px-6 py-8 sm:px-8 sm:py-9 shadow-[0_15px_35px_-5px_rgba(27,59,43,0.08)] text-center transition-all my-auto">
        {/* Brand Header */}
        <div className="mb-6">
          {/* Professional Laundry & Pressing Brand Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1b3b2b] to-[#12281d] text-white mx-auto flex items-center justify-center mb-3 shadow-md shadow-[#1b3b2b]/15 border border-[#1b3b2b]/10 relative">
            <svg
              className="w-7 h-7 text-[#f7f5f0]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Pressing iron silhouette */}
              <path d="M4 18h16a1 1 0 0 0 1-1l-2-7a2 2 0 0 0-2-1H9a4 4 0 0 0-4 4v4a1 1 0 0 0 1 1z" />
              <path d="M7 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
              <circle cx="9" cy="14" r="0.75" fill="currentColor" />
              <circle cx="12" cy="14" r="0.75" fill="currentColor" />
              <circle cx="15" cy="14" r="0.75" fill="currentColor" />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c1623c] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#1b3b2b] tracking-tight">
            Easy Linge Kech
          </h1>
          <p className="text-xs text-[#6b7280] mt-0.5">
            Blanchisserie & Pressing • Marrakech
          </p>
          <a
            href={CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#c1623c] hover:text-[#a94f2b] font-medium mt-1.5 transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@ezzilinge.ma</span>
          </a>
        </div>

        {/* STEP 1: INITIAL STAR SELECTION */}
        {rating === null && (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#1f2937] mb-1.5">
              Votre avis compte pour nous
            </h2>
            <p className="text-xs text-[#6b7280] max-w-xs mx-auto mb-6">
              Comment s'est passée votre dernière expérience avec nos services ?
            </p>

            {/* 5 Stars Bar */}
            <div
              className="flex justify-center items-center gap-2 sm:gap-2.5 py-3 mb-2"
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
                    className="p-1 rounded-lg transition-transform hover:scale-125 active:scale-95 cursor-pointer focus:outline-none"
                    aria-label={`${starVal} étoiles`}
                  >
                    <Star
                      className={`w-9 h-9 sm:w-10 sm:h-10 transition-colors ${
                        isFilled
                          ? 'text-[#d97706] fill-[#d97706]'
                          : 'text-[#d1d5db] fill-transparent'
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                );
              })}
            </div>

            {/* Label under stars */}
            <div className="h-6 flex items-center justify-center mb-4">
              {activeDisplayRating > 0 ? (
                <span className="text-xs font-semibold text-[#1b3b2b]">
                  {STAR_LABELS[activeDisplayRating]}
                </span>
              ) : (
                <span className="text-xs text-[#9ca3af]">
                  Cliquez sur les étoiles pour noter
                </span>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: POSITIVE BRANCH (4 or 5 STARS) -> GOOGLE REVIEWS */}
        {rating !== null && rating >= CONFIG.minStarGoogle && (
          <div className="text-center">
            {/* Star count preview */}
            <div className="flex justify-center items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-5 h-5 ${
                    s <= rating ? 'text-[#d97706] fill-[#d97706]' : 'text-[#d1d5db]'
                  }`}
                />
              ))}
            </div>

            <h2 className="text-lg font-bold text-[#1b3b2b] mb-2">
              Merci pour votre confiance !
            </h2>
            <p className="text-xs text-[#4b5563] leading-relaxed mb-6 max-w-sm mx-auto">
              Nous sommes ravis que notre service vous ait plu. Prenez 15 secondes pour partager votre avis sur Google, cela nous aide énormément !
            </p>

            {/* Direct Google Reviews CTA */}
            <button
              type="button"
              onClick={handleOpenGoogle}
              className="w-full bg-[#1b3b2b] hover:bg-[#142e22] text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] cursor-pointer mb-2.5"
            >
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[11px] font-black text-[#4285F4]">
                G
              </div>
              <span>Laisser un avis sur Google</span>
              <ExternalLink className="w-4 h-4 text-[#d97706]" />
            </button>

            {/* Instagram follow button */}
            <a
              href={CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#faf5f2] hover:bg-[#faeee8] text-[#1b3b2b] border border-[#e5e7eb] font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer mb-2"
            >
              <Instagram className="w-4 h-4 text-[#c1623c]" />
              <span>Rejoignez-nous sur Instagram @ezzilinge.ma</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#9ca3af]" />
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#6b7280] hover:text-[#1b3b2b] underline inline-flex items-center gap-1 cursor-pointer pt-2"
            >
              <RotateCcw className="w-3 h-3" />
              Modifier ma note
            </button>
          </div>
        )}

        {/* STEP 3: PRIVATE BRANCH (1 TO 3 STARS) -> MANAGEMENT FEEDBACK */}
        {rating !== null && rating < CONFIG.minStarGoogle && (
          <div className="text-center">
            {/* Star count preview */}
            <div className="flex justify-center items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-5 h-5 ${
                    s <= rating ? 'text-[#d97706] fill-[#d97706]' : 'text-[#d1d5db]'
                  }`}
                />
              ))}
            </div>

            {!submittedPrivate ? (
              <form onSubmit={handleSubmitPrivate} className="text-left space-y-3">
                <div className="text-center mb-4">
                  <h2 className="text-base sm:text-lg font-bold text-[#1b3b2b] mb-1">
                    Votre satisfaction est notre priorité
                  </h2>
                  <p className="text-xs text-[#6b7280]">
                    Dites-nous ce qui n'a pas été pour que la direction règle le problème sans attendre.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4b5563] mb-1">
                    Votre nom ou nom du Riad
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Riad Dar Zahra / Karim"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#d1d5db] focus:border-[#1b3b2b] focus:ring-1 focus:ring-[#1b3b2b] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4b5563] mb-1">
                    Numéro de téléphone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="06..."
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#d1d5db] focus:border-[#1b3b2b] focus:ring-1 focus:ring-[#1b3b2b] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4b5563] mb-1">
                    Votre remarque ou problème
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={clientMessage}
                    onChange={(e) => setClientMessage(e.target.value)}
                    placeholder="Décrivez brièvement le souci (retard, repassage, etc.)..."
                    className="w-full text-xs p-3 rounded-xl border border-[#d1d5db] focus:border-[#1b3b2b] focus:ring-1 focus:ring-[#1b3b2b] outline-none resize-none"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full bg-[#c1623c] hover:bg-[#a94f2b] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer directement à la direction</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Nous contacter sur WhatsApp</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-[#6b7280] hover:text-[#1b3b2b] underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Modifier ma note
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-[#1b3b2b] mb-1">
                  Message bien reçu
                </h3>
                <p className="text-xs text-[#6b7280] leading-relaxed mb-5 max-w-xs mx-auto">
                  Notre responsable examine votre réclamation et prendra contact avec vous rapidement pour régler la situation.
                </p>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full bg-[#25D366] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ouvrir WhatsApp direct</span>
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

      {/* Clean Footer */}
      <footer className="text-center text-[11px] text-[#9ca3af] py-3 flex items-center justify-center gap-2">
        <span>Easy Linge Kech • Marrakech</span>
        <span>•</span>
        <a
          href={CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#c1623c] inline-flex items-center gap-1 transition-colors font-medium text-[#6b7280]"
        >
          <Instagram className="w-3 h-3 text-[#c1623c]" />
          @ezzilinge.ma
        </a>
      </footer>
    </div>
  );
}
