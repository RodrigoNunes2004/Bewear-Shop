import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/lib/auth";

const handler = toNextJsHandler(auth.handler);

export const GET = handler.GET;
export const POST = handler.POST;