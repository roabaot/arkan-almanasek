import { ConsultationFormDataT } from "../lib/schemas/consultationSchema";

export const postConsultation = async (
  body: ConsultationFormDataT
): Promise<ConsultationFormDataT | null> => {
  try {
    const { name, ...other } = body;
    const serviceRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact: { full_name: name, ...other } }),
        cache: "no-store",
      }
    ).then((res) => res.json());

    if (serviceRes.status === 200) {
      return serviceRes.body;
    }
    return null;
  } catch (error) {
    console.error("[services] postService error", error);
    return null;
  }
};
