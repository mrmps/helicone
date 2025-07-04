import { ProviderStatusPage } from "@/app/status/ProviderStatusPage";
import { Suspense } from "react";

const PROVIDERS = [
  "OPENAI",
  "ANTHROPIC",
  "TOGETHER",
  "FIREWORKS",
  "GOOGLE",
  "OPENROUTER",
  "GROQ",
  "MISTRAL",
  "DEEPINFRA",
  "QSTASH",
  "PERPLEXITY",
  "INFERENCE",
] as const;

const displayToBackendName: Record<string, string> = {
  "Together AI": "TOGETHER",
};

export default async function Home({
  params,
}: {
  params: {
    provider?: string;
  };
}) {
  const { provider } = params;
  const decodedProvider = decodeURIComponent(provider || "");

  const backendProvider =
    displayToBackendName[decodedProvider] || decodedProvider;

  return (
    <div className="container mx-auto py-8">
      <Suspense
        fallback={
          <div className="flex flex-col gap-4 w-full max-w-6xl mx-auto">
            Loading...
          </div>
        }
      >
        <ProviderStatusPage provider={backendProvider} />
      </Suspense>
    </div>
  );
}

export async function generateStaticParams() {
  const paths = [];

  for (const provider of PROVIDERS) {
    paths.push({
      provider: encodeURIComponent(provider.toLowerCase()),
    });
  }

  return paths;
}
