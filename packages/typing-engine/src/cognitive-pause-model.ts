import { CognitivePauseKind, CognitivePauseIntensity, TypingAction } from "@dtyp/types";

export interface CognitivePauseConfig {
  intensity?: CognitivePauseIntensity;
  baseDelayMs: number;
}

export class CognitivePauseModel {
  private intensity: CognitivePauseIntensity;
  private baseDelayMs: number;
  private strokeCounter = 0;
  private fatigueInterval: number;

  constructor(config: CognitivePauseConfig) {
    this.intensity = config.intensity || "natural";
    this.baseDelayMs = config.baseDelayMs;
    // Fatigue interval between 80 and 130 strokes
    this.fatigueInterval = 80 + Math.floor(Math.random() * 50);
  }

  /**
   * Samples a duration using a log-normal distribution to match human reaction kinetics.
   */
  public sampleLogNormal(meanMs: number, sigma = 0.25): number {
    const u1 = Math.max(1e-6, Math.random());
    const u2 = Math.max(1e-6, Math.random());
    const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

    const scale = this.getIntensityScale();
    const targetMean = meanMs * scale;
    const mu = Math.log(targetMean) - 0.5 * sigma * sigma;
    const val = Math.exp(mu + sigma * z);
    return Math.max(10, Math.round(val));
  }

  private getIntensityScale(): number {
    switch (this.intensity) {
      case "subtle":
        return 0.65;
      case "deliberate":
        return 1.35;
      case "natural":
      default:
        return 1.0;
    }
  }

  /**
   * Computes cognitive pause duration for a given pause kind.
   */
  public getPauseDuration(kind: CognitivePauseKind): number {
    switch (kind) {
      case "control_flow":
        return this.sampleLogNormal(450, 0.3); // 350-700ms formulation
      case "syntax_statement":
        return this.sampleLogNormal(220, 0.25); // 150-320ms statement end
      case "block_close":
        return this.sampleLogNormal(400, 0.28); // 280-550ms scope check
      case "pointer_nav":
        return this.sampleLogNormal(180, 0.25); // 120-250ms dereference check
      case "parameter":
        return this.sampleLogNormal(160, 0.25); // 100-220ms argument retrieval
      case "fatigue_rest":
        return this.sampleLogNormal(1500, 0.35); // 1000-2500ms breathing break
    }
  }

  /**
   * Tracks character stroke and checks whether an organic fatigue micro-rest is due.
   */
  public registerStroke(): TypingAction | null {
    this.strokeCounter++;
    if (this.strokeCounter >= this.fatigueInterval) {
      this.strokeCounter = 0;
      this.fatigueInterval = 80 + Math.floor(Math.random() * 50);
      const delayMs = this.getPauseDuration("fatigue_rest");
      return {
        type: "pause",
        pauseKind: "fatigue_rest",
        delayMs,
        description: "organic human breathing / micro-rest pause",
      };
    }
    return null;
  }

  public reset(): void {
    this.strokeCounter = 0;
  }
}
