-- dTyp SQLite Database Schema v2.0.0
-- Unlimited-Depth Hierarchical Taxonomy & High-Performance C Component Library

CREATE TABLE IF NOT EXISTS metadata (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Recursive Parent-Child Taxonomy
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    parent_id TEXT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    path TEXT NOT NULL,
    depth INTEGER NOT NULL DEFAULT 0,
    type TEXT NOT NULL DEFAULT 'category',
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY(parent_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Comprehensive Component Store
CREATE TABLE IF NOT EXISTS components (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'c',
    type TEXT NOT NULL DEFAULT 'function',
    category_id TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    path TEXT NOT NULL,
    description TEXT NOT NULL,
    signature TEXT NOT NULL,
    code TEXT NOT NULL,
    input_type TEXT,
    output_type TEXT,
    data_type TEXT,
    representation TEXT,
    implementation_type TEXT,
    difficulty TEXT,
    time_complexity TEXT NOT NULL DEFAULT 'O(1)',
    space_complexity TEXT NOT NULL DEFAULT 'O(1)',
    documentation TEXT,
    version TEXT NOT NULL DEFAULT '1.0.0',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Directed Component Dependencies & Relationships
CREATE TABLE IF NOT EXISTS dependencies (
    source_id TEXT NOT NULL,
    target_id TEXT NOT NULL,
    relationship_type TEXT NOT NULL DEFAULT 'depends_on',
    PRIMARY KEY(source_id, target_id, relationship_type),
    FOREIGN KEY(source_id) REFERENCES components(id) ON DELETE CASCADE,
    FOREIGN KEY(target_id) REFERENCES components(id) ON DELETE CASCADE
);

-- Fast Index for Aliases and Shorthand Commands
CREATE TABLE IF NOT EXISTS aliases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    component_id TEXT NOT NULL,
    alias TEXT NOT NULL,
    FOREIGN KEY(component_id) REFERENCES components(id) ON DELETE CASCADE
);

-- Snippets & Templates
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

-- Tags
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

-- Performance Indexes (<100ms response across 50,000+ components)
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_path ON categories(path);
CREATE INDEX IF NOT EXISTS idx_components_name ON components(name);
CREATE INDEX IF NOT EXISTS idx_components_cat_id ON components(category_id);
CREATE INDEX IF NOT EXISTS idx_components_cat ON components(category);
CREATE INDEX IF NOT EXISTS idx_components_path ON components(path);
CREATE INDEX IF NOT EXISTS idx_components_type ON components(type);
CREATE INDEX IF NOT EXISTS idx_aliases_alias ON aliases(alias);
CREATE INDEX IF NOT EXISTS idx_aliases_comp ON aliases(component_id);
CREATE INDEX IF NOT EXISTS idx_dependencies_source ON dependencies(source_id);
CREATE INDEX IF NOT EXISTS idx_dependencies_target ON dependencies(target_id);
CREATE INDEX IF NOT EXISTS idx_snippets_prefix ON snippets(prefix);
CREATE INDEX IF NOT EXISTS idx_component_tags_comp ON component_tags(component_id);
