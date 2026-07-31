import { useEffect, useState } from "react";
import ScrambledText from "@/components/ui/ScrambledText";
import DotGrid from "@/components/ui/DotGrid";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setIsExiting(true), 2600);
    const hideTimer = setTimeout(() => setIsLoading(false), 3200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const AudioContextClass = window.AudioContext
    if (!AudioContextClass) return

    const context = new AudioContextClass()
    const timers: number[] = []
    let stopped = false
    let started = false

    const playKey = (index: number) => {
      if (stopped || context.state !== "running") return
      const now = context.currentTime

      const body = context.createOscillator()
      const bodyGain = context.createGain()
      body.type = "square"
      body.frequency.setValueAtTime(135 + (index % 5) * 11, now)
      bodyGain.gain.setValueAtTime(0.018, now)
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032)
      body.connect(bodyGain).connect(context.destination)
      body.start(now)
      body.stop(now + 0.035)

      const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * 0.025), context.sampleRate)
      const samples = buffer.getChannelData(0)
      for (let sample = 0; sample < samples.length; sample++) {
        samples[sample] = (Math.random() * 2 - 1) * (1 - sample / samples.length)
      }
      const noise = context.createBufferSource()
      const filter = context.createBiquadFilter()
      const noiseGain = context.createGain()
      noise.buffer = buffer
      filter.type = "highpass"
      filter.frequency.value = 1600
      noiseGain.gain.setValueAtTime(0.025, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024)
      noise.connect(filter).connect(noiseGain).connect(context.destination)
      noise.start(now)
    }

    const startTyping = async () => {
      if (started || stopped) return
      if (context.state === "suspended") {
        try { await context.resume() } catch { return }
      }
      if (context.state !== "running") return
      started = true
      window.removeEventListener("pointerdown", unlockAudio)
      for (let index = 0; index < 18; index++) {
        timers.push(window.setTimeout(() => playKey(index), 180 + index * 72 + (index % 3) * 14))
      }
      timers.push(window.setTimeout(() => playKey(24), 2450))
    }

    function unlockAudio() { void startTyping() }
    window.addEventListener("pointerdown", unlockAudio, { once: true })
    void startTyping()

    return () => {
      stopped = true
      timers.forEach(clearTimeout)
      window.removeEventListener("pointerdown", unlockAudio)
      void context.close()
    }
  }, [])

  if (!isLoading) return null;

  return (
    <div className={`portfolio-loader ${isExiting ? "portfolio-loader--exiting" : ""}`}>
      <div className="portfolio-loader__grid">
        <DotGrid
          dotSize={2}
          gap={27}
          baseColor="#0d3c4a"
          activeColor="#00f2fe"
          proximity={170}
          shockStrength={3}
        />
      </div>
      <div className="portfolio-loader__vignette" />

      <div className="portfolio-loader__content">
        <div className="portfolio-loader__eyebrow">
          <span className="portfolio-loader__signal" />
          <span>vedant.dev / portfolio</span>
        </div>

        <div className="portfolio-loader__title-wrap">
          <ScrambledText
            className="scrambled-loader-text"
            radius={190}
            duration={0.8}
            speed={0.65}
            scrambleChars=".:_+01"
            autoScramble
          >
            IT&apos;S ABOUT ME
          </ScrambledText>
        </div>

        <div className="portfolio-loader__meta">
          <span>INITIALIZING PROFILE</span>
          <span className="portfolio-loader__counter">100%</span>
        </div>
        <div className="portfolio-loader__track">
          <div className="portfolio-loader__progress" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
