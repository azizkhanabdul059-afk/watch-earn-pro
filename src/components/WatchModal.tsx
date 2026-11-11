import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Campaign, CampaignSession } from '../types';
import {
  X,
  Play,
  Pause,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface WatchModalProps {
  campaign: Campaign;
  onClose: () => void;
}

export const WatchModal: React.FC<WatchModalProps> = ({ campaign, onClose }) => {
  const { startWatchSession, completeWatchSession, formatCurrency, currentUser } = useApp();

  const [session, setSession] = useState<CampaignSession | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTabFocused, setIsTabFocused] = useState<boolean>(true);
  const [verificationState, setVerificationState] = useState<'idle' | 'verifying' | 'completed' | 'failed'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('Press Play to start the sponsored broadcast.');
  const [completedReward, setCompletedReward] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTickTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<any>(null);

  const targetDuration = campaign.requiredWatchDuration;
  const progressPercent = Math.min(100, Math.round((elapsedSeconds / targetDuration) * 100));
  const isEligibleToClaim = elapsedSeconds >= targetDuration;

  // Initialize session token on modal open
  useEffect(() => {
    const newSession = startWatchSession(campaign.campaignId);
    setSession(newSession);

    // Visibility Listener for Anti-Cheat focus protection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabFocused(false);
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
          setStatusMessage('Playback paused: Active tab focus is required to prevent bot farming.');
        }
      } else {
        setIsTabFocused(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [campaign.campaignId]);

  // Video playback timekeeping with anti-speedhack verification
  useEffect(() => {
    if (isPlaying && isTabFocused && verificationState === 'idle') {
      lastTickTimeRef.current = Date.now();
      timerIntervalRef.current = setInterval(() => {
        const now = Date.now();
        const delta = (now - lastTickTimeRef.current) / 1000;
        lastTickTimeRef.current = now;

        // Anti-speedhack: if delta is suspiciously high (>2.5x real time), trigger flag
        if (delta > 2.5) {
          setIsPlaying(false);
          setStatusMessage('Irregular time jump detected. Playback halted for anti-fraud validation.');
          return;
        }

        setElapsedSeconds(prev => {
          const next = prev + 1;
          if (next >= targetDuration) {
            setStatusMessage('Required duration verified! Click "Claim Verified Reward" below.');
          } else {
            setStatusMessage(`Viewing verified: ${next}s / ${targetDuration}s completed.`);
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isPlaying, isTabFocused, verificationState, targetDuration]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Video play prevented:', err);
      });
    }
  };

  const handleClaim = () => {
    if (!session || !isEligibleToClaim || verificationState === 'completed') return;

    setVerificationState('verifying');
    setStatusMessage('Validating session token, telemetry, and campaign budget server-side...');

    setTimeout(() => {
      const result = completeWatchSession(session.sessionId, elapsedSeconds);
      if (result.success) {
        setVerificationState('completed');
        setCompletedReward(result.reward || campaign.rewardAmount);
        setStatusMessage('Verified! Reward has been atomically credited to your ledger.');
      } else {
        setVerificationState('failed');
        setStatusMessage(result.message);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Sponsored Campaign</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{session ? session.token.slice(0, 16) : 'Init...'}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate max-w-xl">
              {campaign.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas & Player */}
        <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={campaign.videoUrl}
            className="w-full h-full object-cover"
            playsInline
            onEnded={() => setIsPlaying(false)}
            poster={campaign.thumbnail}
          />

          {/* Tab Inactive Warning Scrim */}
          {!isTabFocused && (
            <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center z-20">
              <ShieldAlert className="w-12 h-12 text-amber-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Active Tab Focus Required</h3>
              <p className="text-xs text-slate-300 max-w-md">
                Anti-fraud protocols require you to keep this window in direct focus while viewing. The countdown timer resumes when the window is active.
              </p>
            </div>
          )}

          {/* Central Play/Pause Overlay */}
          {verificationState !== 'completed' && (
            <button
              onClick={togglePlay}
              className="absolute z-10 w-16 h-16 rounded-full bg-slate-950/60 border border-white/20 text-white flex items-center justify-center hover:scale-110 hover:bg-sky-600 transition-all cursor-pointer shadow-lg backdrop-blur-xs"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1 fill-current" />}
            </button>
          )}

          {/* Live Duration HUD Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-mono z-10">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>{elapsedSeconds}s / {targetDuration}s</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">{progressPercent}%</span>
              <span>Reward: {formatCurrency(campaign.rewardAmount)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2">
          <div
            className={`h-full transition-all duration-300 ${
              isEligibleToClaim ? 'bg-emerald-500' : 'bg-sky-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Details & Anti-Cheat Status */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Status Message Box */}
          <div
            className={`flex items-start gap-3 p-3.5 rounded-xl text-xs border ${
              verificationState === 'completed'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : verificationState === 'failed'
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
                : isEligibleToClaim
                ? 'bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-300'
                : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {verificationState === 'completed' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
            ) : verificationState === 'failed' ? (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
            ) : (
              <ShieldCheck className="w-4 h-4 shrink-0 text-sky-500 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">{statusMessage}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Session Token: {session?.sessionId} · Anti-Cheat Telemetry Active
              </p>
            </div>
          </div>

          {/* Campaign Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
              <span className="text-slate-500 dark:text-slate-400">Advertiser</span>
              <p className="font-semibold text-slate-900 dark:text-white mt-0.5 truncate">{campaign.advertiserName}</p>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
              <span className="text-slate-500 dark:text-slate-400">Reward Per View</span>
              <p className="font-bold text-sky-600 dark:text-sky-400 font-mono mt-0.5">{formatCurrency(campaign.rewardAmount)}</p>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
              <span className="text-slate-500 dark:text-slate-400">Slots Remaining</span>
              <p className="font-semibold text-slate-900 dark:text-white font-mono mt-0.5 tabular-nums">{campaign.remainingSlots.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
              <span className="text-slate-500 dark:text-slate-400">Target Region</span>
              <p className="font-semibold text-slate-900 dark:text-white mt-0.5 truncate">{campaign.targetCountries.join(', ')}</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {campaign.description}
          </p>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Eye className="w-4 h-4 text-sky-500" />
            <span>Genuine advertiser campaign. Zero investment required.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {verificationState === 'completed' ? (
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Done · Return to Campaigns
              </button>
            ) : (
              <button
                onClick={handleClaim}
                disabled={!isEligibleToClaim || verificationState === 'verifying'}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isEligibleToClaim && verificationState !== 'verifying'
                    ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-md hover:shadow-sky-500/20'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                {verificationState === 'verifying' ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Session...</span>
                  </>
                ) : isEligibleToClaim ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Claim Verified Reward ({formatCurrency(campaign.rewardAmount)})</span>
                  </>
                ) : (
                  <span>Watch {targetDuration - elapsedSeconds}s More to Unlock</span>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
