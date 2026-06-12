import { Radio, Key, Link2, Code, Terminal, CheckCircle2 } from "lucide-react"

export default function ApiBridgePage() {
  const bridgeSecret = process.env.BRIDGE_SECRET || "bridge_prod_key_77a9cfef12bc"
  // Mask the secret for safety
  const maskedSecret = `${bridgeSecret.substring(0, 12)}••••••••••••`

  const snippets = [
    {
      lang: "JavaScript / Node",
      code: `// Fetch connection test from Client Portal
const response = await fetch("https://hxrshrathore.vercel.app/api/bridge", {
  method: "GET",
  headers: {
    "Authorization": "Bearer ${bridgeSecret}",
    "Content-Type": "application/json"
  }
});

const data = await response.json();
console.log("Bridge Status:", data);`,
    },
    {
      lang: "Python / Requests",
      code: `# Python connection request from Client Portal
import requests

url = "https://hxrshrathore.vercel.app/api/bridge"
headers = {
    "Authorization": "Bearer ${bridgeSecret}",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
print("Bridge Status:", response.json())`,
    },
    {
      lang: "cURL Terminal",
      code: `# cURL command line check
curl -X GET https://hxrshrathore.vercel.app/api/bridge \\
  -H "Authorization: Bearer ${bridgeSecret}" \\
  -H "Content-Type: application/json"`,
    },
  ]

  return (
    <div className="space-y-8 select-text font-mono text-xs">
      {/* Header */}
      <div className="border-b border-neutral-900 pb-5">
        <h1 className="text-lg font-bold tracking-tight text-white uppercase">API Bridge Console</h1>
        <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">
          Secure foundation for connecting your future Client Portal database and automations.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Connection Credentials Card */}
        <div className="lg:col-span-1 rounded-xl border border-neutral-900 bg-[#09090b] p-5 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Key className="h-4 w-4 text-neutral-500" />
              Credentials Config
            </h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Secret credentials loaded from .env.local</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                <Link2 className="h-3 w-3" /> Base Endpoint URL
              </span>
              <p className="font-mono bg-neutral-950 p-2.5 rounded border border-neutral-900 text-neutral-400 break-all select-all">
                https://hxrshrathore.vercel.app/api/bridge
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-neutral-500">
                Bearer Secret Token
              </span>
              <p className="font-mono bg-neutral-950 p-2.5 rounded border border-neutral-900 text-neutral-400 select-all">
                {maskedSecret}
              </p>
              <span className="text-[8px] text-neutral-600 block uppercase mt-0.5">
                Key name in env: <code className="text-neutral-500 font-bold">BRIDGE_SECRET</code>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-neutral-500">
                Bridge Status
              </span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                <span className="rounded border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[8px] font-bold text-neutral-400 uppercase tracking-wider">
                  Scaffold Live & Secure
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Instructions */}
        <div className="lg:col-span-2 rounded-xl border border-neutral-900 bg-[#09090b] p-5 space-y-5">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-neutral-500" />
              How the Bridge Works
            </h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Secure cross-origin data bridge protocol details</p>
          </div>

          <div className="space-y-4 text-xs text-neutral-400 leading-relaxed font-sans">
            <p>
              When you build your Client Portal in the future (hosted on a separate server/domain with its own database), 
              it will need to fetch portfolio statistics or push new client inquiries. 
              The **API Bridge** acts as the secure doorway.
            </p>

            <ul className="list-disc pl-5 space-y-2 text-neutral-500 font-mono text-[11px]">
              <li>
                <strong className="text-neutral-300">Security:</strong> Every request is checked against a cryptographic bearer key. No unauthenticated user can fetch database schemas.
              </li>
              <li>
                <strong className="text-neutral-300">CORS Handshake:</strong> Fully configured serverless route, allowing client portal apps to execute secure requests.
              </li>
              <li>
                <strong className="text-neutral-300">Bridge Extension:</strong> When expanding, we can add GET/POST handlers to read/write specific models.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Snippets Section */}
      <div className="rounded-xl border border-neutral-900 bg-[#09090b] p-5 space-y-5">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Code className="h-4 w-4 text-neutral-500" />
            Client Connection Snippets
          </h3>
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Integration code templates for the client portal client</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {snippets.map((snippet) => (
            <div key={snippet.lang} className="space-y-2 flex flex-col justify-between">
              <span className="text-[9px] uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-neutral-600" />
                {snippet.lang}
              </span>
              <pre className="flex-1 font-mono text-[9px] bg-neutral-950 p-4 rounded border border-neutral-900 text-neutral-400 overflow-x-auto select-all whitespace-pre leading-relaxed">
                {snippet.code}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
