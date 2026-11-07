const c = (name) => `rgb(var(--${name}) / <alpha-value>)`;

tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        void: c("void"),
        panel: c("panel"),
        card: c("card"),
        chip: c("chip"),
        chiphi: c("chip-hi"),
        reiHair: c("hair"),
        reiLight: c("ink"),
        reiPupil: c("blood"),
        bloodDeep: c("blood-deep"),
        bloodMid: c("blood-mid"),
        mlpPink: c("bruise"),
        bruiseDeep: c("bruise-deep"),
        bruiseMid: c("bruise-mid"),
        wiredGreen: c("sick"),
        dim: c("dim"),
        line: c("line"),
      },
      fontFamily: {
        mono: ["Courier New", "VT323", "monospace"],
        sans: ["Tahoma", "Geneva", "Verdana", "sans-serif"],
        pixel: ["Comic Sans MS", "Trebuchet MS", "sans-serif"],
      },
    },
  },
};
