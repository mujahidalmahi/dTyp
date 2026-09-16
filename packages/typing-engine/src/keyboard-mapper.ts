import { KeyboardMapper, TypingTarget } from "@dtyp/types";

export class StandardKeyboardMapper implements KeyboardMapper {
  constructor(private target: TypingTarget) {}

  public setTarget(target: TypingTarget): void {
    this.target = target;
  }

  public async typeCharacter(character: string): Promise<void> {
    if (!this.target) {
      throw new Error("Cannot type character: no typing target configured");
    }
    // Delegate directly to the target which knows how to send native or editor input
    await this.target.typeCharacter(character);
  }

  public async releaseModifiers(): Promise<void> {
    if (this.target && typeof this.target.releaseModifiers === "function") {
      await this.target.releaseModifiers();
    }
  }
}
