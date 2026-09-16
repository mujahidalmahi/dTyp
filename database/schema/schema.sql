-- dTyp SQLite Database Schema v1.0.0

CREATE TABLE IF NOT EXISTS metadata (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS components (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    language TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    description TEXT,
    signature TEXT NOT NULL,
    code TEXT NOT NULL,
    time_complexity TEXT NOT NULL,
    space_complexity TEXT NOT NULL,
    documentation TEXT,
    version TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS dependencies (
    component_id TEXT NOT NULL,
    dependency_id TEXT NOT NULL,
    PRIMARY KEY(component_id, dependency_id),
    FOREIGN KEY(component_id) REFERENCES components(id) ON DELETE CASCADE,
    FOREIGN KEY(dependency_id) REFERENCES components(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS snippets (
    id TEXT PRIMARY KEY,
    component_id TEXT,
    prefix TEXT NOT NULL,
    body TEXT NOT NULL,
    description TEXT,
    category TEXT,
    FOREIGN KEY(component_id) REFERENCES components(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS templates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    body TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS component_tags (
    component_id TEXT NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY(component_id, tag_id),
    FOREIGN KEY(component_id) REFERENCES components(id) ON DELETE CASCADE,
    FOREIGN KEY(tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Performance Indexes (Requirement 59: Autocomplete <100ms, instant lookups)
CREATE INDEX IF NOT EXISTS idx_components_name ON components(name);
CREATE INDEX IF NOT EXISTS idx_components_category ON components(category);
CREATE INDEX IF NOT EXISTS idx_components_subcategory ON components(subcategory);
CREATE INDEX IF NOT EXISTS idx_components_lang_cat ON components(language, category);
CREATE INDEX IF NOT EXISTS idx_snippets_prefix ON snippets(prefix);
CREATE INDEX IF NOT EXISTS idx_dependencies_comp ON dependencies(component_id);
CREATE INDEX IF NOT EXISTS idx_component_tags_comp ON component_tags(component_id);
