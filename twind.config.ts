import { defineConfig, Preset } from "https://esm.sh/@twind/core@1.1.3";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.1.4";
import presetAutoprefix from "https://esm.sh/@twind/preset-autoprefix@1.0.7";

export default {
  ...defineConfig({
    presets: [presetTailwind() as Preset, presetAutoprefix()],
    theme: {
      mode: "strict",
      fontFamily: { pacifico: "Pacifico", secondary: "Sedgwick Ave Display" },
      extend: {
        keyframes: {
          flicker: {
            "0%": {
              border: "2px solid rgb(1, 235, 252)",
              "box-shadow":
                "0px 0px 100px rgb(1, 235, 252) , inset 0px 0px 10px rgb(1, 235, 252),0px 0px 5px rgb(255, 255, 255)",
            },
            "5%": {
              border: "none",
              "box-shadow": "none",
            },
            "10%": {
              border: "2px solid rgb(1, 235, 252)",
              "box-shadow":
                "0px 0px 100px rgb(1, 235, 252) , inset 0px 0px 10px rgb(1, 235, 252),0px 0px 5px rgb(255, 255, 255)",
            },
            "25%": {
              border: "none",
              "box-shadow": "none",
            },
            "30%": {
              border: "2px solid rgb(1, 235, 252)",
              "box-shadow":
                "0px 0px 100px rgb(1, 235, 252) , inset 0px 0px 10px rgb(1, 235, 252),0px 0px 5px rgb(255, 255, 255)",
            },
            "100%": {
              border: "2px solid rgb(1, 235, 252)",
              "box-shadow":
                "0px 0px 100px rgb(1, 235, 252) , inset 0px 0px 10px rgb(1, 235, 252),0px 0px 5px rgb(255, 255, 255)",
            },
          },
          iconflicker: {
            "0%": {
              opacity: "1",
            },
            "5%": {
              opacity: "0.2",
            },
            "10%": {
              opacity: "1",
            },
            "25%": {
              opacity: "0.2",
            },
            "30%": {
              opacity: "1",
            },
            "100%": {
              opacity: "1",
            },
          },
          animateC: {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
          animate: {
            "0%": { transform: "rotate(45deg)" },
            "100%": { transform: "rotate(405deg)" },
          },
        },
      },
    },
    darkMode: "media",
    rules: [
      [
        "file-input-container",
        "relative w-[100px] h-[100px] flex justify-center items-center overflow-hidden shadow-[0px_0px_100px_rgb(1,235,252),inset_0px_0px_10px_rgb(1,235,252),0px_0px_5px_rgb(255,255,255)] animate-[flicker_2s_linear_infinite] rounded-[50%] border-2 border-solid border-[rgb(1,235,252)]",
      ],
      [
        "icon",
        "text-[rgb(1,235,252)] text-[2rem] cursor-pointer animate-[iconflicker_2s_linear_infinite]",
      ],
      ["file-input", "absolute opacity-0 w-full h-full cursor-pointer"],
      [
        "loader",
        "absolute bg-transparent font-sans -translate-x-2/4 -translate-y-2/4 w-[150px] h-[150px] text-center leading-[150px] text-xl text-[#0066ff] tracking-[2px] uppercase shadow-[0_0_20px_rgba(0,0,0,0.15)] rounded-[50%] border-[3px] border-solid border-[rgba(0,102,255,0.1)] left-2/4 top-2/4 before:content-[''] before:absolute before:top-[-3px] before:left-[-3px] before:w-full before:h-full before:animate-[animateC_2s_linear_infinite] before:rounded-[50%] before:border-r-[#0066ff] before:border-t-[#0066ff] before:border-[3px] before:border-solid before:border-transparent",
      ],
      [
        "loader-text",
        "bg-transparent block absolute top-[calc(50%_-_2px)] w-6/12 h-1 origin-left animate-[animate_2s_linear_infinite] left-2/4 before:content-[''] before:bg-[#00aeff] before:absolute before:w-4 before:h-4 before:shadow-[0_0_20px_5px_#0066ff] before:rounded-[50%] before:-right-2 before:-top-1.5",
      ],
      ["hljs-punctuation", "text-black dark:text-white bg-inherit"],
      ["hljs-number", "text-violet-500 dark:text-violet-400 bg-inherit"],
      ["hljs-attr", "text-rose-500 dark:text-rose-200 bg-inherit"],
      ["hljs-string", "text-blue-700 dark:text-lime-400 bg-inherit"],
      ["hljs-keyword", "text-violet-500 dark:text-violet-400 bg-inherit"],
    ],
  }),
  selfURL: import.meta.url,
};
