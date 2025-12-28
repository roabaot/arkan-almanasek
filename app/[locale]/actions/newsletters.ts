type SlettersBodyT = {
  newsletter: {
    email: string;
  };
};

export const postSletters = async (
  body: SlettersBodyT
): Promise<SlettersBodyT | null> => {
  try {
    const serviceRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/newsletters`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    ).then((res) => res.json());

    if (serviceRes.status === 200) {
      return serviceRes.body;
    }
    return null;
  } catch (error) {
    console.error("[services] postSletters error", error);
    return null;
  }
};
