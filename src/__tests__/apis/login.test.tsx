// @vitest-environment node

import { describe, expect, test } from "vitest";
import { POST as LoginHandler } from "@/app/api/auth/login/route";

import { NextRequest } from "next/server";

describe("api login", () => {
  test("/api/auth/login", async () => {
    const req = new NextRequest("http://127.0.0.1:3000", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: "temp@gmail.com",
        password: "password123",
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
      email: "temp@gmail.com",
    });
    expect(ret.message).toBe("Successful");
  });
});
