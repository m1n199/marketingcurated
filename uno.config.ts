import { defineConfig } from "unocss";
import { presetUno, presetAttributify } from "unocss";
import type { Rule } from "unocss";
import { presetScrollbarHide } from "unocss-preset-scrollbar-hide";
const customRules: Rule[] = [];

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetScrollbarHide()],
  rules: [
    [
      "navbar",
      {
        "background-color": "#60a5fa",
        color: "#000000",
        "border-color": "#00000044",
        "box-shadow":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    ],
    [
      "navbar-search-btn",
      {
        "background-color": "#f3f4f666",
        "border-top": "1px solid #d1d5db",
        "border-bottom": "1px solid #d1d5db",
        color: "#00000088",
      },
    ],
    [
      "navbar-model-overlay",
      {
        "backdrop-filter": "blur(10px)", // Apply blur effect
        "background-color": "rgba(0, 0, 0, 0.5)", // Semi-transparent background
      },
    ],
    [
      "navbar-model-search-wrap",
      {
        "background-color": "#f3f4f666",
        "border-top": "1px solid #d1d5db",
        "border-bottom": "1px solid #d1d5db",
        color: "#00000088",
      },
    ],
    [
      "navbar-search-suggestions",
      {
        "background-color": "#f3f4f666",
        "border-top": "1px solid #d1d5db",
        "border-bottom": "1px solid #d1d5db",
        "color": "#ffffff"
      },
    ],
    [
      "hover_navbar-search-suggestions",
      {
        "background-color": "#f3f4f644",
        "border-top": "1px solid #d1d5db",
        "border-bottom": "1px solid #d1d5db",
      },
    ],
    [
      "navbar-feature-filter-wrap",
      {
        "background-color": "#f3f4f644",
        "border-top": "1px solid #d1d5db",
        "border-bottom": "1px solid #d1d5db",
        color: "#00000088",
      },
    ],
    [
      "navbar-feature-wrap",
      {
        "background-color": "#f3f4f644",
        "border-top": "1px solid #d1d5db",
        "border-bottom": "1px solid #d1d5db",
        color: "#00000088",
      }
    ],
    [
      "feature-list-item",
      {
        "background-color": "#3b82f6"
      }
    ],
    [
      "sm_hover_feature-list-item",
      {
        "background-color": "#60a5fa"
      }
    ],
    [
      "active_feature-list-item",
      {
        "background-color": "#1d4ed8"
      }
    ],
    [
      "active_sm_feature-list-item",
      {
        "background-color": "#3b82f6"
      }
    ],
    [
      "hover_filter-list-item",
      {
        "background-color": "#3b82f6"
      }
    ],
    [
      "browse-hero-section",
      {
        "color": "#00000077"
      }
    ],
    [
      "browse-hero-section-btn",
      {
        "background-color": "#4ade80",
        "color": "#ffffff"
      }
    ],
    [
      "browse", {
        "color": "#000000"
      }
    ],
    [
      "browse-feature-label",
      {
        "color": "#00000077",
      }
    ],
    [
      "hover_browse-feature-label",
      {
        "color": "#00000099",
        "border-color": "#00000033"
      }
    ],
    [
      "active_browse-feature-label",
      {
        "color": "#000000",
        "border-color": "#000000"
      }
    ],
    [
      "browse-filter-label",
      {
        "color": "#a1a1aa",
        "border-color": "#a1a1aa"
      }
    ],
    [
      "hover_browse-filter-label",
      {
        "color": "#00000099"
      }
    ],
    [
      "active_browse-filter-label",
      {
        "color": "#ffffff",
        "background-color": "#3b82f6",
        "border-color": "#ffffff"
      }
    ]
  ],
});
