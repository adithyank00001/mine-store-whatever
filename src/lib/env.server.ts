import "server-only";

type ServiceStatus = "configured" | "not_configured";

function readOptionalEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function readIntEnv(name: string, fallback: number): number {
  const raw = readOptionalEnv(name);
  if (!raw) {
    return fallback;
  }

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readFloatEnv(name: string, fallback: number): number {
  const raw = readOptionalEnv(name);
  if (!raw) {
    return fallback;
  }

  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * Server-only environment values for the Ecommerce Store. Never import this file from client components.
 */
export const serverEnv = {
  supabaseUrl: readOptionalEnv("SUPABASE_URL"),
  supabaseServiceRoleKey: readOptionalEnv("SUPABASE_SERVICE_ROLE_KEY"),
  appUrl: readOptionalEnv("NEXT_PUBLIC_APP_URL") ?? "http://localhost:3000",
  dodoPaymentsApiKey: readOptionalEnv("DODO_PAYMENTS_API_KEY"),
  dodoPaymentsWebhookKey: readOptionalEnv("DODO_PAYMENTS_WEBHOOK_KEY"),
  dodoPaymentsEnvironment:
    readOptionalEnv("DODO_PAYMENTS_ENVIRONMENT") ?? "test_mode",
  /** One-time digital store product (Kids Learning Bundle). */
  dodoStoreProductId: readOptionalEnv("DODO_STORE_PRODUCT_ID"),
  dodoPaymentsReturnUrl: readOptionalEnv("DODO_PAYMENTS_RETURN_URL"),
  /** Optional Google Drive URL shown on /store/success as backup download. */
  storeDriveDownloadUrl: readOptionalEnv("STORE_DRIVE_DOWNLOAD_URL"),
  razorpayKeyId: readOptionalEnv("RAZORPAY_KEY_ID"),
  razorpayKeySecret: readOptionalEnv("RAZORPAY_KEY_SECRET"),
  razorpayWebhookSecret: readOptionalEnv("RAZORPAY_WEBHOOK_SECRET"),
  /**
   * Optional store checkout price override (INR major units).
   * Prefer NEXT_PUBLIC_STORE_PRICE_INR so UI + order stay in sync.
   */
  storePriceInr: readFloatEnv(
    "NEXT_PUBLIC_STORE_PRICE_INR",
    readFloatEnv("STORE_PRICE_INR", 397),
  ),
  metaCapiAccessToken: readOptionalEnv("META_CAPI_ACCESS_TOKEN"),
  metaCapiTestEventCode: readOptionalEnv("META_CAPI_TEST_EVENT_CODE"),
  resendApiKey: readOptionalEnv("RESEND_API_KEY"),
  resendFromEmail:
    readOptionalEnv("RESEND_FROM_EMAIL") ??
    "ByePanda <notification@byepanda.com>",
  contactInboxEmail:
    readOptionalEnv("CONTACT_INBOX_EMAIL") ?? "byepanda.store@gmail.com",
} as const;

