import { NextRequest, NextResponse } from "next/server";
import { postService } from "@/app/[locale]/actions/services";
import { ServiceFormInputsT } from "@/app/[locale]/lib/schemas/serviceFormSchema";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ServiceFormInputsT;

    const result = await postService(body);

    if (!result) {
      return NextResponse.json(
        { status: 400, message: "Failed to submit service request" },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: 200, body: result }, { status: 200 });
  } catch (error) {
    console.error("[api/request-services] error", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
