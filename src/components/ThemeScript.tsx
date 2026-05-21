export function ThemeScript() {
  const script = `
    (function () {
      try {
        var t = localStorage.getItem("sorteio-times-theme");
        var dark =
          t === "dark" ||
          (!t && window.matchMedia("(prefers-color-scheme: dark)").matches);
        if (dark) document.documentElement.classList.add("dark");
      } catch (e) {}
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
