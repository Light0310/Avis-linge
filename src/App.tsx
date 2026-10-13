import React, { useState, useEffect } from 'react';
import { Star, ExternalLink, MessageCircle, Send, CheckCircle2, RotateCcw, Settings, X, Check } from 'lucide-react';

interface Config {
  googleReviewUrl: string;
  whatsappNumber: string;
  minStarGoogle: number;
}

const DEFAULT_CONFIG: Config = {
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ-EasyLingeMarrakechDemo',
  whatsappNumber: '212661984210',
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

  // Owner config modal
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState<Config>(() => {
    try {
      const saved = localStorage.getItem('el_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_CONFIG;
  });
  const [tempConfig, setTempConfig] = useState<Config>(config);
  const [configSavedToast, setConfigSavedToast] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('el_config', JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

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
    const url = config.googleReviewUrl.trim() || 'https://maps.google.com';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendWhatsApp = () => {
    const phone = config.whatsappNumber.replace(/[^0-9]/g, '');
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

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(tempConfig);
    setConfigSavedToast(true);
    setTimeout(() => {
      setConfigSavedToast(false);
      setShowConfig(false);
    }, 1000);
  };

  const activeDisplayRating = hoverRating !== null ? hoverRating : (rating || 0);

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1f2937] flex flex-col justify-between items-center p-4 sm:p-6 font-sans">
      {/* Top spacer */}
      <div className="w-full flex justify-end max-w-[440px] pt-1">
        <button
          type="button"
          onClick={() => {
            setTempConfig(config);
            setShowConfig(true);
          }}
          className="text-xs text-[#6b7280] hover:text-[#1b3b2b] p-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          title="Paramètres des liens"
        >
          <Settings className="w-4 h-4" />
          <span className="text-[11px] font-medium">Réglages</span>
        </button>
      </div>

      {/* Main Review Card */}
      <div className="w-full max-w-[440px] bg-white rounded-[22px] px-6 py-8 sm:px-8 sm:py-9 shadow-[0_15px_35px_-5px_rgba(27,59,43,0.08)] text-center transition-all">
        {/* Brand Header */}
        <div className="mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#1b3b2b] text-white mx-auto flex items-center justify-center font-bold text-lg mb-3 shadow-sm">
            EL
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1b3b2b] tracking-tight">
            Easy Linge Kech
          </h1>
          <p className="text-xs text-[#6b7280] mt-0.5">
            Blanchisserie & Pressing • Marrakech
          </p>
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
        {rating !== null && rating >= config.minStarGoogle && (
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
              className="w-full bg-[#1b3b2b] hover:bg-[#142e22] text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] cursor-pointer mb-3"
            >
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[11px] font-black text-[#4285F4]">
                G
              </div>
              <span>Laisser un avis sur Google</span>
              <ExternalLink className="w-4 h-4 text-[#d97706]" />
            </button>

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
        {rating !== null && rating < config.minStarGoogle && (
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
      <footer className="text-center text-[11px] text-[#9ca3af] py-3">
        Easy Linge Kech • Marrakech
      </footer>

      {/* Owner Configuration Modal (Discreet & Practical) */}
      {showConfig && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#1b3b2b]">
                Configuration de la redirection
              </h3>
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-3.5 text-left text-xs">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Lien direct Google Reviews
                </label>
                <input
                  type="url"
                  required
                  value={tempConfig.googleReviewUrl}
                  onChange={(e) => setTempConfig({ ...tempConfig, googleReviewUrl: e.target.value })}
                  placeholder="https://search.google.com/local/writereview?placeid=..."
                  className="w-full px-3 py-2 rounded-xl border border-[#d1d5db] focus:border-[#1b3b2b] outline-none"
                />
                <p className="text-[10px] text-[#9ca3af] mt-1">
                  Lien où atterrit le client lorsqu'il clique sur 4 ou 5 étoiles.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Numéro WhatsApp (avec indicatif 212)
                </label>
                <input
                  type="text"
                  required
                  value={tempConfig.whatsappNumber}
                  onChange={(e) => setTempConfig({ ...tempConfig, whatsappNumber: e.target.value })}
                  placeholder="212661984210"
                  className="w-full px-3 py-2 rounded-xl border border-[#d1d5db] focus:border-[#1b3b2b] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Seuil de redirection Google
                </label>
                <select
                  value={tempConfig.minStarGoogle}
                  onChange={(e) => setTempConfig({ ...tempConfig, minStarGoogle: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#d1d5db] focus:border-[#1b3b2b] outline-none bg-white"
                >
                  <option value={4}>4 étoiles et plus (4 et 5 vers Google)</option>
                  <option value={5}>5 étoiles uniquement (Seul 5 vers Google)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-between">
                {configSavedToast ? (
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Enregistré !
                  </span>
                ) : (
                  <span />
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowConfig(false)}
                    className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#1b3b2b] hover:bg-[#142e22] text-white font-bold cursor-pointer"
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
