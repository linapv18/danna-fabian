export type RsvpInput = {
  submissionId: string;
  name: string;
  email: string;
  attending: boolean;
  companions: string[];
  dietary: string;
  message: string;
};

export function parseRsvp(value: unknown): RsvpInput {
  if (!value || typeof value !== "object") throw new Error("Revisa los datos del formulario.");
  const v = value as Record<string, unknown>;
  const text = (key: string, max: number, min = 0) => {
    const raw = v[key];
    if (typeof raw !== "string" || raw.trim().length < min || raw.trim().length > max) {
      throw new Error("Revisa los campos y la longitud de tus respuestas.");
    }
    return raw.trim();
  };
  const submissionId = text("submissionId", 36, 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) throw new Error("Recarga la página e intenta nuevamente.");
  const name = text("name", 120, 2);
  const email = text("email", 254, 3).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Escribe un correo válido.");
  if (typeof v.attending !== "boolean") throw new Error("Indica si podrás asistir.");
  if (!Array.isArray(v.companions) || v.companions.length > 9 || v.companions.some(n => typeof n !== "string" || n.trim().length < 2 || n.trim().length > 120)) throw new Error("Revisa los nombres de tus acompañantes.");
  const dietary = text("dietary", 1000);
  const message = text("message", 2000);
  return { submissionId, name, email, attending: v.attending, companions: v.attending ? v.companions.map(n => n.trim()) : [], dietary: v.attending ? dietary : "", message };
}
