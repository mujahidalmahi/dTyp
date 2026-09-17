export class StaminaRenewal {
  private currentStamina = 1.0;
  private readonly decayFactor = 0.996; // ~15-20% drop over prolonged keystrokes
  private readonly minStamina = 0.80; // Max 20% slowdown from fatigue

  /**
   * Called on each keystroke to decay motor stamina slightly.
   */
  public recordKeystroke(): number {
    this.currentStamina = Math.max(this.minStamina, this.currentStamina * this.decayFactor);
    return this.getSpeedMultiplier();
  }

  /**
   * Delay multiplier based on fatigue (stamina 0.80 means 1.25x delay).
   */
  public getDelayMultiplier(): number {
    return 1 / this.currentStamina;
  }

  public getSpeedMultiplier(): number {
    return this.currentStamina;
  }

  /**
   * Renews stamina to 100% on pause, newline, or rest.
   */
  public renew(): void {
    this.currentStamina = 1.0;
  }

  public get stamina(): number {
    return this.currentStamina;
  }
}
