import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/theme";

import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/components/(button|checkbox|input|link|navbar|spinner).js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(.21,1.02,.73,1)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    nextui({
      layout: {
        // https://nextui.org/docs/customization/layout#units
        spacingUnit: 3,
      },
      themes: {
        light: {
          colors: {
            background: "#ffffff",
          },
        },
        dark: {
          colors: {
            background: "#18181B",
          },
        },
      },
    }),
  ],
} satisfies Config;
