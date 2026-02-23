type EnvConfig = {
    apiBaseUrl: string;
    wsBaseUrl: string;
};

let _config: EnvConfig | null = null;

export async function loadEnvConfig(): Promise<void> {
    _config = await fetch("/envConfig.json").then((r) => r.json());
}

export function getEnvConfig(): EnvConfig {
    if (!_config) throw new Error("EnvConfig not loaded. Call loadEnvConfig() before rendering the app.");
    return _config;
}
