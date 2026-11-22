import React, { useState } from 'react';
import { useCareerPilot } from '../../context/useCareerPilot';
import { DIMENSIONS } from '../../types/profile';
import { REPRESENTATIVE_QUESTIONS } from './representativeQuestions';
import { TechCard } from '../common/TechCard';
import {
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { clsx } from 'clsx';

export const QuestionnaireEngine: React.FC = () => {
  const { profile, updateAnswer, setDestination } = useCareerPilot();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showRationale, setShowRationale] = useState<boolean>(false);
  const [isUncertain, setIsUncertain] = useState<boolean>(false);

  const questions = REPRESENTATIVE_QUESTIONS;
  const currentQ = questions[currentIndex];
  const dimensionMeta = DIMENSIONS[currentQ.dimension];

  // Retrieve existing stored answer if available
  const existingAnswer = profile.answers[currentQ.id];
  const [localSliderVal, setLocalSliderVal] = useState<number>(
    typeof existingAnswer === 'number' ? existingAnswer : 50
  );

  const handleSelectOption = (opt: any) => {
    updateAnswer(currentQ.id, opt.value, currentQ.dimension, opt.impact);
  };

  const handleTradeOffSelect = (choice: 'optionA' | 'optionB') => {
    if (!currentQ.tradeOffConfig) return;
    const cfg = currentQ.tradeOffConfig[choice];
    updateAnswer(currentQ.id, choice, currentQ.dimension, cfg.impact);
  };

  const handleSliderCommit = (val: number) => {
    if (!currentQ.sliderConfig) return;
    const impact = currentQ.sliderConfig.dimensionImpact(val);
    updateAnswer(currentQ.id, val, currentQ.dimension, impact);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowRationale(false);
      setIsUncertain(false);
    } else {
      // Completed sample questionnaire, switch to Exploded Self Profile View
      setDestination('profile');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowRationale(false);
      setIsUncertain(false);
    }
  };

  // Has current question been answered?
  const isAnswered = profile.answers[currentQ.id] !== undefined;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Questionnaire Navigation & Dimensional Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span
            className="px-2 py-0.5 border text-[10px] font-bold uppercase tracking-wider"
            style={{
              borderColor: `${dimensionMeta.color}60`,
              backgroundColor: `${dimensionMeta.color}15`,
              color: dimensionMeta.color,
            }}
          >
            {dimensionMeta.code} // {dimensionMeta.label}
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400">
            Question {currentIndex + 1} of {questions.length} ({progressPercent}%)
          </span>
        </div>
      </div>

      {/* Primary Question Card Container */}
      <TechCard
        tag={`QUESTION ${currentIndex + 1}`}
        title={dimensionMeta.label.toUpperCase()}
        glow={true}
        action={
          <button
            onClick={() => setShowRationale(!showRationale)}
            className="text-slate-400 hover:text-[#00F0B4] font-mono text-xs flex items-center gap-1.5 transition-colors"
            title="Toggle explanatory rationale"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="text-[11px]">{showRationale ? 'Hide Logic' : 'Why We Ask'}</span>
          </button>
        }
      >
        <div className="space-y-6">
          {/* Prompt */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif text-white font-normal leading-snug tracking-tight">
              {currentQ.prompt}
            </h2>
          </div>

          {/* Rationale Drawer */}
          {showRationale && (
            <div className="p-4 bg-white/[0.02] border-l-2 border-[#00F0B4] font-mono text-xs text-slate-300 leading-relaxed space-y-1">
              <span className="text-[#00F0B4] font-semibold tracking-wider uppercase text-[10px] block">
                CONTEXT // {dimensionMeta.code}
              </span>
              <p>{currentQ.contextHelp}</p>
            </div>
          )}

          {/* FORMAT 1: Single Choice Radio Cards */}
          {currentQ.format === 'single-choice' && currentQ.options && (
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = existingAnswer === opt.value;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className={clsx(
                      'w-full text-left p-4 border transition-all duration-200 relative group flex items-start gap-4',
                      isSelected
                        ? 'border-[#00F0B4] bg-[#00F0B4]/10 text-white shadow-[0_0_15px_rgba(0,240,180,0.1)]'
                        : 'border-white/10 bg-[#0E1217]/80 hover:border-white/30 text-slate-300 hover:bg-white/[0.03]'
                    )}
                  >
                    <div
                      className={clsx(
                        'w-4 h-4 rounded-none border mt-1 flex items-center justify-center transition-colors flex-shrink-0',
                        isSelected
                          ? 'border-[#00F0B4] bg-[#00F0B4] text-black'
                          : 'border-slate-500 group-hover:border-slate-300'
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="font-sans font-medium text-sm leading-snug">{opt.label}</div>
                      {opt.sublabel && (
                        <div className="text-xs text-slate-400 font-mono leading-relaxed">
                          {opt.sublabel}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* FORMAT 2: Continuous Cognitive Spectrum Slider */}
          {currentQ.format === 'slider' && currentQ.sliderConfig && (
            <div className="space-y-6 p-4 bg-white/[0.01] border border-white/10 font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Left Polarity */}
                <div className="p-3 border border-white/10 bg-black/30 space-y-1">
                  <div className="text-[#00F0B4] font-semibold uppercase text-[11px]">
                    ‹ {currentQ.sliderConfig.leftLabel}
                  </div>
                  <p className="text-slate-400 font-sans text-xs">
                    {currentQ.sliderConfig.leftDescription}
                  </p>
                </div>

                {/* Right Polarity */}
                <div className="p-3 border border-white/10 bg-black/30 space-y-1 text-right">
                  <div className="text-sky-400 font-semibold uppercase text-[11px]">
                    {currentQ.sliderConfig.rightLabel} ›
                  </div>
                  <p className="text-slate-400 font-sans text-xs">
                    {currentQ.sliderConfig.rightDescription}
                  </p>
                </div>
              </div>

              {/* Slider Component */}
              <div className="space-y-2 pt-2">
                <input
                  type="range"
                  min={currentQ.sliderConfig.min}
                  max={currentQ.sliderConfig.max}
                  step={currentQ.sliderConfig.step}
                  value={localSliderVal}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setLocalSliderVal(val);
                    handleSliderCommit(val);
                  }}
                  className="w-full h-2 bg-white/20 accent-[#00F0B4] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>0% Left Emphasis</span>
                  <span className="text-[#00F0B4] font-bold">CALIBRATED: {localSliderVal}%</span>
                  <span>100% Right Emphasis</span>
                </div>
              </div>
            </div>
          )}

          {/* FORMAT 3: Forced Trade-Off Binary Picker */}
          {currentQ.format === 'trade-off' && currentQ.tradeOffConfig && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {/* Option A */}
              <div
                onClick={() => handleTradeOffSelect('optionA')}
                className={clsx(
                  'p-4 border transition-all cursor-pointer relative space-y-3',
                  existingAnswer === 'optionA'
                    ? 'border-[#00F0B4] bg-[#00F0B4]/10 shadow-[0_0_20px_rgba(0,240,180,0.12)]'
                    : 'border-white/10 bg-white/[0.01] hover:border-white/30'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#00F0B4] font-bold uppercase text-[10px]">
                    POSTURE A
                  </span>
                  {existingAnswer === 'optionA' && (
                    <span className="px-1.5 py-0.5 bg-[#00F0B4] text-black text-[9px] font-bold">
                      SELECTED
                    </span>
                  )}
                </div>
                <h4 className="font-sans text-sm font-semibold text-white">
                  {currentQ.tradeOffConfig.optionA.title}
                </h4>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  {currentQ.tradeOffConfig.optionA.description}
                </p>
                <div className="pt-2 border-t border-white/10 space-y-1 text-[11px]">
                  <div className="text-emerald-400">+ Gain: {currentQ.tradeOffConfig.optionA.gain}</div>
                  <div className="text-rose-300">- Cost: {currentQ.tradeOffConfig.optionA.sacrifice}</div>
                </div>
              </div>

              {/* Option B */}
              <div
                onClick={() => handleTradeOffSelect('optionB')}
                className={clsx(
                  'p-4 border transition-all cursor-pointer relative space-y-3',
                  existingAnswer === 'optionB'
                    ? 'border-[#00F0B4] bg-[#00F0B4]/10 shadow-[0_0_20px_rgba(0,240,180,0.12)]'
                    : 'border-white/10 bg-white/[0.01] hover:border-white/30'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold uppercase text-[10px]">
                    POSTURE B
                  </span>
                  {existingAnswer === 'optionB' && (
                    <span className="px-1.5 py-0.5 bg-[#00F0B4] text-black text-[9px] font-bold">
                      SELECTED
                    </span>
                  )}
                </div>
                <h4 className="font-sans text-sm font-semibold text-white">
                  {currentQ.tradeOffConfig.optionB.title}
                </h4>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  {currentQ.tradeOffConfig.optionB.description}
                </p>
                <div className="pt-2 border-t border-white/10 space-y-1 text-[11px]">
                  <div className="text-emerald-400">+ Gain: {currentQ.tradeOffConfig.optionB.gain}</div>
                  <div className="text-rose-300">- Cost: {currentQ.tradeOffConfig.optionB.sacrifice}</div>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Controls & Action Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            {/* Back Button */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={clsx(
                'px-4 py-2 border flex items-center gap-2 transition-colors',
                currentIndex === 0
                  ? 'border-white/5 text-slate-600 cursor-not-allowed'
                  : 'border-white/20 text-slate-300 hover:text-white hover:border-white/40 bg-white/[0.02]'
              )}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS</span>
            </button>

            {/* Uncertainty Flag Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200 select-none text-[11px]">
              <input
                type="checkbox"
                checked={isUncertain}
                onChange={(e) => setIsUncertain(e.target.checked)}
                className="accent-amber-400 w-3.5 h-3.5 rounded-none"
              />
              <span>I'm exploring this / not completely sure</span>
            </label>

            {/* Next / Finish Button */}
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={clsx(
                'px-5 py-2 font-semibold transition-all duration-200 flex items-center gap-2',
                isAnswered
                  ? 'bg-[#00F0B4] hover:bg-[#00F0B4]/90 text-black shadow-[0_0_15px_rgba(0,240,180,0.2)]'
                  : 'bg-white/10 text-slate-500 cursor-not-allowed'
              )}
            >
              <span>{currentIndex === questions.length - 1 ? 'COMPLETE & VIEW PROFILE' : 'CONTINUE'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </TechCard>
    </div>
  );
};
