import { Session, Mapping, InputSource, OutputTarget, TypingConfiguration } from "@dtyp/types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export const validateInputSource = (source: unknown): ValidationResult => {
  const errors: string[] = [];
  if (!source || typeof source !== "object") {
    return { valid: false, errors: ["Input source must be an object"] };
  }

  const s = source as Partial<InputSource>;
  if (s.type !== "file" && s.type !== "text") {
    errors.push('Input source type must be either "file" or "text"');
  }

  if (s.type === "file") {
    if (!s.path || typeof s.path !== "string" || s.path.trim().length === 0) {
      errors.push("File input source requires a non-empty path");
    }
  }

  if (s.type === "text") {
    if (s.content === undefined || typeof s.content !== "string") {
      errors.push("Text input source requires string content");
    }
  }

  return { valid: errors.length === 0, errors };
};

export const validateOutputTarget = (target: unknown): ValidationResult => {
  const errors: string[] = [];
  if (!target || typeof target !== "object") {
    return { valid: false, errors: ["Output target must be an object"] };
  }

  const t = target as Partial<OutputTarget>;
  const hasIdentifier = Boolean(
    (t.windowHandle && t.windowHandle.trim().length > 0) ||
    (t.windowTitle && t.windowTitle.trim().length > 0) ||
    (t.processName && t.processName.trim().length > 0) ||
    (t.executablePath && t.executablePath.trim().length > 0) ||
    (t.applicationName && t.applicationName.trim().length > 0)
  );

  if (!hasIdentifier) {
    errors.push("Output target must specify at least one identifier (handle, title, process, executable, or app name)");
  }

  return { valid: errors.length === 0, errors };
};

export const validateMapping = (mapping: unknown): ValidationResult => {
  const errors: string[] = [];
  if (!mapping || typeof mapping !== "object") {
    return { valid: false, errors: ["Mapping must be an object"] };
  }

  const m = mapping as Partial<Mapping>;
  if (!m.id || typeof m.id !== "string" || m.id.trim().length === 0) {
    errors.push("Mapping requires a non-empty id");
  }

  const inputRes = validateInputSource(m.input);
  if (!inputRes.valid) {
    errors.push(...inputRes.errors.map((e) => `Input error: ${e}`));
  }

  const outputRes = validateOutputTarget(m.output);
  if (!outputRes.valid) {
    errors.push(...outputRes.errors.map((e) => `Output error: ${e}`));
  }

  return { valid: errors.length === 0, errors };
};

export const validateTypingConfig = (config: unknown): ValidationResult => {
  const errors: string[] = [];
  if (!config || typeof config !== "object") {
    return { valid: false, errors: ["Typing config must be an object"] };
  }

  const c = config as Partial<TypingConfiguration>;
  if (typeof c.delayMs !== "number" || c.delayMs < 0) {
    errors.push("delayMs must be a non-negative number");
  }

  if (c.mode !== "character") {
    errors.push('Typing mode must be "character"');
  }

  return { valid: errors.length === 0, errors };
};

export const validateSession = (session: unknown): ValidationResult => {
  const errors: string[] = [];
  if (!session || typeof session !== "object") {
    return { valid: false, errors: ["Session must be an object"] };
  }

  const s = session as Partial<Session>;
  if (!s.id || typeof s.id !== "string" || s.id.trim().length === 0) {
    errors.push("Session requires a non-empty id");
  }
  if (!s.name || typeof s.name !== "string" || s.name.trim().length === 0) {
    errors.push("Session requires a non-empty name");
  }

  const validStates = ["created", "inactive", "active", "typing", "terminated"];
  if (!s.state || !validStates.includes(s.state)) {
    errors.push(`Session state must be one of: ${validStates.join(", ")}`);
  }

  if (!Array.isArray(s.mappings)) {
    errors.push("Session mappings must be an array");
  } else {
    s.mappings.forEach((m, idx) => {
      const res = validateMapping(m);
      if (!res.valid) {
        errors.push(...res.errors.map((e) => `Mapping [${idx}] error: ${e}`));
      }
    });
  }

  const typingRes = validateTypingConfig(s.typing);
  if (!typingRes.valid) {
    errors.push(...typingRes.errors);
  }

  return { valid: errors.length === 0, errors };
};
