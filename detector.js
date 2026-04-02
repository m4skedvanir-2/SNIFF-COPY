const PATTERNS = [
  // 赤: フォーマットの決まっている API keys
  { id: "openai",        label: "OpenAI API Key",          level: "red",    re: /sk-[a-zA-Z0-9]{48}|sk-proj-[a-zA-Z0-9\-_]{40,}/g },
  { id: "anthropic",     label: "Anthropic API Key",       level: "red",    re: /sk-ant-[a-zA-Z0-9\-_]{40,}/g },
  { id: "aws_access",    label: "AWS Access Key ID",       level: "red",    re: /AKIA[0-9A-Z]{16}/g },
  { id: "github_pat",    label: "GitHub PAT",              level: "red",    re: /ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{82}/g },
  { id: "stripe_sk",     label: "Stripe Secret Key",       level: "red",    re: /sk_live_[0-9a-zA-Z]{24,}/g },
  { id: "stripe_pk",     label: "Stripe Publishable Key",  level: "red",    re: /pk_live_[0-9a-zA-Z]{24,}/g },
  { id: "google_api",    label: "Google API Key",          level: "red",    re: /AIza[0-9A-Za-z\-_]{35}/g },
  { id: "slack",         label: "Slack Token",             level: "red",    re: /xox[baprs]-[0-9a-zA-Z]{10,}-[0-9a-zA-Z\-]*/g },
  { id: "sendgrid",      label: "SendGrid API Key",        level: "red",    re: /SG\.[a-zA-Z0-9_\-]{22}\.[a-zA-Z0-9_\-]{43}/g },
  { id: "huggingface",   label: "Hugging Face Token",      level: "red",    re: /hf_[a-zA-Z0-9]{36,}/g },
  { id: "mailgun",       label: "Mailgun API Key",         level: "red",    re: /key-[a-f0-9]{32}/g },
  { id: "twilio",        label: "Twilio API Key",          level: "red",    re: /SK[0-9a-fA-F]{32}/g },
  { id: "jwt",           label: "JWT Token",               level: "red",    re: /eyJ[a-zA-Z0-9_\-]+\.eyJ[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+/g },
  { id: "private_block", label: "Private Key Block",       level: "red",    re: /-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/g },
  { id: "firebase_sk",   label: "Firebase Server Key",     level: "red",    re: /AAAA[A-Za-z0-9_\-]{7}:[A-Za-z0-9_\-]{100,}/g },

  // オレンジ: 変数代入値で実際代入されてるとき (${}のプレースホルダーは除外する)
  { id: "var_password",  label: "Password Assignment",     level: "orange", re: /\b(?:password|passwd|pwd)\s*[:=]\s*["'](?!\$\{)[^"'\s]{4,}["']/gi },
  { id: "var_secret",    label: "Secret Assignment",       level: "orange", re: /\b(?:secret|client_secret|app_secret)\s*[:=]\s*["'](?!\$\{)[^"'\s]{4,}["']/gi },
  { id: "var_token",     label: "Token Assignment",        level: "orange", re: /\b(?:token|access_token|auth_token|refresh_token)\s*[:=]\s*["'](?!\$\{)[^"'\s]{8,}["']/gi },
  { id: "var_apikey",    label: "API Key Assignment",      level: "orange", re: /\b(?:api_key|apikey|api-key)\s*[:=]\s*["'](?!\$\{)[^"'\s]{8,}["']/gi },
  { id: "var_privkey",   label: "Private Key Assignment",  level: "orange", re: /\b(?:private_key|privatekey|priv_key)\s*[:=]\s*["'](?!\$\{)[^"'\s]{8,}["']/gi },
  { id: "db_url",        label: "DB URL w/ credentials",   level: "orange", re: /\b(?:database_url|db_url|connection_string)\s*[:=]\s*["'][^"']+["']/gi },

  // 黄色: 40文字以上の怪しい文字列 (APIキーやパスワードの可能性があるが、フォーマットが特定できないもの)
  { id: "long_hex",      label: "Long Hex String",         level: "yellow", re: /\b[0-9a-f]{40,}\b/gi },
  { id: "long_b64",      label: "Long Base64-like String", level: "yellow", re: /["'][A-Za-z0-9+\/]{40,}={0,2}["']/g },
  { id: "long_rand",     label: "Long Random String",      level: "yellow", re: /["'][A-Za-z0-9_\-]{48,}["']/g },
];

function mask(str) {
  if (str.length <= 12) return str;
  return str.slice(0, 6) + "••••" + str.slice(-4);
}

function detect(text) {
  const lines = text.split("\n");
  const results = [];
  const seen = new Set();

  for (const p of PATTERNS) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const re = new RegExp(p.re.source, p.re.flags);
      let m;
      while ((m = re.exec(line)) !== null) {
        const key = `${i}:${m.index}:${p.id}`;
        if (seen.has(key)) continue;
        seen.add(key);
        results.push({
          line:    i + 1,
          col:     m.index + 1,
          id:      p.id,
          label:   p.label,
          level:   p.level,
          masked:  mask(m[0]),
          context: line.trim().slice(0, 120),
        });
      }
    }
  }

  results.sort((a, b) => a.line - b.line || a.col - b.col);
  return results;
}
