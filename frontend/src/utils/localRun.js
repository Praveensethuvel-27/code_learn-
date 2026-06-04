import DOMPurify from "dompurify";

let sqlInitPromise = null;

async function getSqlJs() {
  if (!sqlInitPromise) {
    sqlInitPromise = (async () => {
      const [{ default: wasmUrl }, sqlModule] = await Promise.all([
        import("sql.js/dist/sql-wasm-browser.wasm?url"),
        import("sql.js/dist/sql-wasm-browser.js"),
      ]);
      const initSqlJs = sqlModule.default ?? sqlModule;
      if (typeof initSqlJs !== "function") {
        throw new Error("sql.js failed to load in the browser.");
      }
      return initSqlJs({ locateFile: () => wasmUrl });
    })();
  }
  return sqlInitPromise;
}

function formatSqlResults(results) {
  return results
    .map((block) => {
      const cols = block.columns.join(" | ");
      const sep = block.columns.map(() => "---").join(" | ");
      const rows = block.values.map((row) =>
        row.map((v) => (v == null ? "NULL" : String(v))).join(" | "),
      );
      return [cols, sep, ...rows].join("\n");
    })
    .join("\n\n");
}

/** Live HTML preview (iframe srcdoc). */
export function buildHtmlPreview(source) {
  const trimmed = String(source || "").trim();
  const doc = trimmed.toLowerCase().startsWith("<!doctype") || trimmed.startsWith("<html")
    ? trimmed
    : `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${trimmed}</body></html>`;
  return DOMPurify.sanitize(doc, {
    ADD_TAGS: ["style", "link"],
    ADD_ATTR: ["style", "class", "id", "href", "src", "alt", "type", "rel"],
  });
}

/** CSS wrapped in a sample page. */
export function buildCssPreview(css) {
  const safe = String(css || "").replace(/<\/style/gi, "<\\/style");
  const doc = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>${safe}</style></head>
<body>
  <div class="preview-box">
    <h2>CSS Preview</h2>
    <p>Sample paragraph and <a href="#">link</a>.</p>
    <button type="button">Button</button>
  </div>
</body></html>`;
  return DOMPurify.sanitize(doc, {
    ADD_TAGS: ["style"],
    ADD_ATTR: ["style", "class", "id", "href", "type"],
  });
}

/** SQLite in browser (sql.js + bundled wasm). */
export async function runSqlLocal(source) {
  const SQL = await getSqlJs();
  const db = new SQL.Database();
  const chunks = String(source || "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

  if (chunks.length === 0) {
    return { ok: false, output: "No SQL statements found." };
  }

  const lines = [];
  for (const stmt of chunks) {
    try {
      const results = db.exec(`${stmt};`);
      if (results.length > 0) {
        lines.push(formatSqlResults(results));
      } else {
        lines.push(`OK — ${stmt.split(/\s+/)[0]?.toUpperCase() || "DONE"}`);
      }
    } catch (e) {
      lines.push(`Error: ${e.message}\n\nStatement:\n${stmt}`);
      return { ok: false, output: lines.join("\n\n") };
    }
  }
  return { ok: true, output: lines.join("\n\n") };
}
