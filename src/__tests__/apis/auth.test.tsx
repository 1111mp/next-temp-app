// @vitest-environment node

import { describe, expect, test } from "vitest";
import { NextRequest } from "next/server";
import { POST as LoginHandler } from "@/app/api/auth/login/route";
import { env } from "@/env.mjs";

describe("apis: /api/auth", () => {
  test("/api/auth/login", async () => {
    const req = new NextRequest("http://127.0.0.1:3000", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: env.TEST_USER_EMAIL,
        password: env.TEST_USER_PASSWORD,
        remember: false,
      }),
    });

    const resp = await LoginHandler(req);
    expect(resp).toBeDefined();
    expect(resp.status).toBe(200);

    const ret = await resp.json();
    expect(ret).toBeDefined();
    expect(ret.code).toBe(200);
    expect(ret.data).toMatchObject({
      id: 1,
      name: env.TEST_USER_NAME,
      email: env.TEST_USER_EMAIL,
    });
    expect(ret.message).toBe("Successful");
  });
});
