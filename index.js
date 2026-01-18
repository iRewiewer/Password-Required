(() => {
    const PASSWORD = "theshire";

    const hintByFailCount = new Map([
        [3, "Hint: Where hobbits begin."],
        [5, "Hint: Home."]
    ]);

    const form = document.getElementById("form");
    const input = document.getElementById("pw");
    const panel = document.getElementById("panel");
    const statusEl = document.getElementById("status");
    const hintsEl = document.getElementById("hints");

    let fails = 0;
    const shownHints = new Set();

    function normalizeAttempt(value) {
        return (value || "").toLowerCase().replace(/\s+/g, "");
    }

    function setStatus(text) {
        statusEl.textContent = text;
    }

    function addHint(text) {
        if (!text || shownHints.has(text)) return;

        shownHints.add(text);

        const line = document.createElement("div");
        line.textContent = text;
        hintsEl.appendChild(line);
    }

    function shakePanel() {
        if (!panel) return;

        panel.classList.remove("shake");
        void panel.offsetWidth; // force reflow so animation can retrigger
        panel.classList.add("shake");
    }

    function deny() {
        setStatus("ACCESS DENIED");
        shakePanel();
    }

    function maybeHint() {
        if (hintByFailCount.has(fails)) {
            addHint(hintByFailCount.get(fails));
        }
    }

    function success() {
        setStatus("ACCESS GRANTED\n\nPopflix \"e2901dhj28\"");

        hintsEl.innerHTML = "";
        shownHints.clear();

        input.disabled = true;
        input.value = "";
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const attempt = normalizeAttempt(input.value);

        if (attempt === PASSWORD) {
            success();
            return;
        }

        fails += 1;
        input.value = "";
        deny();
        maybeHint();
    });

    window.addEventListener("load", () => {
        input.focus();
    });
})();
