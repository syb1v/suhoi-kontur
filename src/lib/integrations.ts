type LeadPayload = {
  phone: string;
  messenger: string;
  objectType: string;
  length: number;
  estimateMin: number;
  estimateMax: number;
  location?: string | null;
};

type NotifyResult = { telegram: "sent" | "failed" | "not_configured"; email: "not_configured" };

export async function notifyNewLead(lead: LeadPayload): Promise<NotifyResult> {
  const result: NotifyResult = { telegram: "not_configured", email: "not_configured" };
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (token && chatId) {
    try {
      const text = [
        "Новая заявка — Сухой Контур",
        `Телефон: ${lead.phone}`,
        `Связь: ${lead.messenger}`,
        `Объект: ${lead.objectType}`,
        `Локация: ${lead.location ?? "не указана"}`,
        `Длина: ${lead.length} м`,
        `Ориентир: ${lead.estimateMin}–${lead.estimateMax} ₽`,
      ].join("\n");
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
      result.telegram = response.ok ? "sent" : "failed";
    } catch {
      result.telegram = "failed";
    }
  }
  return result;
}
