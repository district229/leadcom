"use client";

import Script from "next/script";
import jsQR from "jsqr";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { APPS_SCRIPT_URL } from "@/lib/registration";
import { GOOGLE_CLIENT_ID } from "@/lib/desk";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google?: any;
  }
}

type Stage = "signin" | "verifying" | "scan";
type Cam = "off" | "starting" | "on" | "denied" | "unsupported";
type Person = { id: string; name: string; org: string; designation: string };
type Result =
  | { kind: "ok"; person: Person; at: string; by: string }
  | { kind: "already"; person: Person; at: string; by: string }
  | { kind: "missing"; text: string }
  | { kind: "error"; message: string };

const SESSION_KEY = "leadcom-desk-session";
const SAME_CODE_PAUSE_MS = 5000;

async function call(body: Record<string, unknown>) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20_000);
  try {
    // No custom headers, so the browser sends a plain request that Google Apps Script accepts.
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(body),
      cache: "no-store",
      signal: ctrl.signal,
    });
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function readSession(): { session: string; email: string } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    return v?.session && v?.email ? v : null;
  } catch {
    return null;
  }
}
function saveSession(v: { session: string; email: string } | null) {
  try {
    if (v) sessionStorage.setItem(SESSION_KEY, JSON.stringify(v));
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* private mode: the session simply lasts until the page is closed */
  }
}

export default function DeskScanner() {
  const [stage, setStage] = useState<Stage>("signin");
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [gsiReady, setGsiReady] = useState(false);
  const [cam, setCam] = useState<Cam>("off");
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [manual, setManual] = useState("");
  const [count, setCount] = useState(0);

  const sessionRef = useRef("");
  const btnRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const busyRef = useRef(false);
  const lastRef = useRef({ text: "", at: 0 });
  const credentialRef = useRef<(r: { credential?: string }) => void>(() => {});

  /* ---------- resume an earlier sign-in on this phone ---------- */
  useEffect(() => {
    const s = readSession();
    if (s) {
      sessionRef.current = s.session;
      setEmail(s.email);
      setStage("scan");
    }
    if (window.google?.accounts?.id) setGsiReady(true);
  }, []);

  /* ---------- Google sign-in ---------- */
  credentialRef.current = async (resp) => {
    if (!resp?.credential) return;
    setStage("verifying");
    setNotice("");
    try {
      const data = await call({ action: "auth", idToken: resp.credential });
      if (data?.ok) {
        sessionRef.current = data.session;
        saveSession({ session: data.session, email: data.email });
        setEmail(data.email);
        setResult(null);
        setStage("scan");
        return;
      }
      if (data?.code === "forbidden") {
        setNotice(`${data.email} is not on the check-in list. Ask the organiser to add this email address.`);
      } else if (data?.code === "not_configured") {
        setNotice("The check-in desk is not set up yet. The Google client ID is missing in the script.");
      } else {
        setNotice("We could not verify your sign-in. Please try again.");
      }
    } catch {
      setNotice("We could not reach the server. Check the Wi-Fi and try again.");
    }
    setStage("signin");
  };

  useEffect(() => {
    if (stage !== "signin" || !gsiReady || !GOOGLE_CLIENT_ID) return;
    const id = window.google?.accounts?.id;
    if (!id || !btnRef.current) return;
    id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (r: { credential?: string }) => credentialRef.current(r),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    btnRef.current.innerHTML = "";
    id.renderButton(btnRef.current, {
      theme: "filled_blue",
      size: "large",
      text: "signin_with",
      shape: "rectangular",
      width: 300,
    });
  }, [stage, gsiReady]);

  const signOut = useCallback((message = "") => {
    saveSession(null);
    sessionRef.current = "";
    window.google?.accounts?.id?.disableAutoSelect?.();
    setEmail("");
    setResult(null);
    setNotice(message);
    setStage("signin");
  }, []);

  /* ---------- sending a scan or a typed ID ---------- */
  const submit = useCallback(
    async (text: string) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setBusy(true);
      try {
        const data = await call({ action: "checkin", session: sessionRef.current, id: text });
        if (data?.ok && (data.result === "checked_in" || data.result === "already")) {
          const kind = data.result === "checked_in" ? "ok" : "already";
          setResult({ kind, person: data.reg, at: data.at, by: data.by });
          if (kind === "ok") setCount((n) => n + 1);
          navigator.vibrate?.(kind === "ok" ? 90 : [60, 60, 60]);
        } else if (data?.code === "not_found") {
          setResult({ kind: "missing", text: text.slice(0, 40) });
          navigator.vibrate?.([120, 60, 120]);
        } else if (data?.code === "auth") {
          signOut("Your sign-in expired. Please sign in again.");
        } else {
          lastRef.current = { text: "", at: 0 };
          setResult({ kind: "error", message: "Something went wrong. Please scan again." });
        }
      } catch {
        lastRef.current = { text: "", at: 0 };
        setResult({ kind: "error", message: "Could not reach the server. Check the Wi-Fi and scan again." });
      } finally {
        busyRef.current = false;
        setBusy(false);
      }
    },
    [signOut]
  );

  /* ---------- camera ---------- */
  const stopCamera = useCallback(() => {
    activeRef.current = false;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCam("off");
  }, []);

  const loop = useCallback(() => {
    timerRef.current = window.setTimeout(() => {
      const v = videoRef.current;
      const c = canvasRef.current;
      if (v && c && v.readyState >= 2 && v.videoWidth > 0 && !busyRef.current) {
        const scale = Math.min(1, 640 / v.videoWidth);
        c.width = Math.round(v.videoWidth * scale);
        c.height = Math.round(v.videoHeight * scale);
        const g = c.getContext("2d", { willReadFrequently: true });
        if (g) {
          g.drawImage(v, 0, 0, c.width, c.height);
          const img = g.getImageData(0, 0, c.width, c.height);
          const code = jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
          const text = code?.data?.trim();
          if (text) {
            const now = Date.now();
            const last = lastRef.current;
            if (text !== last.text || now - last.at > SAME_CODE_PAUSE_MS) {
              lastRef.current = { text, at: now };
              void submit(text);
            }
          }
        }
      }
      if (activeRef.current) loop();
    }, 130);
  }, [submit]);

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCam("unsupported");
      return;
    }
    setCam("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      const v = videoRef.current;
      if (!v) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      v.srcObject = stream;
      await v.play();
      activeRef.current = true;
      setCam("on");
      loop();
    } catch (err) {
      const name = (err as { name?: string })?.name;
      setCam(name === "NotAllowedError" || name === "SecurityError" ? "denied" : "unsupported");
    }
  }, [loop]);

  useEffect(() => {
    if (stage === "scan") void startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  function onManual(e: FormEvent) {
    e.preventDefault();
    const text = manual.trim();
    if (!text) return;
    void submit(text).then(() => setManual(""));
  }

  /* ---------- screens ---------- */
  const bar = (
    <header className="desk-bar">
      <div>
        <p className="desk-title">Check-in desk</p>
        <p className="desk-sub">LeadCom 2026 · Toastmasters District 229</p>
      </div>
      {stage === "scan" && (
        <button type="button" className="desk-link" onClick={() => signOut()}>
          Sign out
        </button>
      )}
    </header>
  );

  if (stage !== "scan") {
    return (
      <div className="desk">
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          onReady={() => setGsiReady(true)}
        />
        {bar}
        <main className="desk-main">
          <div className="desk-card">
            <h1>Staff sign-in</h1>
            <p>For registration desk staff only. Sign in with the Google account the organiser added.</p>
            {stage === "verifying" ? (
              <p className="desk-wait" role="status">
                <span className="spin" aria-hidden="true" /> Checking your account…
              </p>
            ) : !GOOGLE_CLIENT_ID ? (
              <p className="desk-note" role="alert">
                The Google client ID is not set yet. Add it in <code>lib/desk.ts</code>.
              </p>
            ) : (
              <div className="desk-gsi" ref={btnRef} aria-label="Sign in with Google" />
            )}
            {notice && (
              <p className="desk-note" role="alert">
                {notice}
              </p>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="desk">
      {bar}
      <main className="desk-main">
        <p className="desk-who">
          Signed in as <strong>{email}</strong>
          {count > 0 && <span className="desk-count">{count} checked in on this phone</span>}
        </p>

        <div className={`desk-view ${cam === "on" ? "is-on" : ""}`}>
          <video ref={videoRef} playsInline muted autoPlay aria-label="Camera preview" />
          <canvas ref={canvasRef} hidden />
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
          {cam !== "on" && (
            <div className="desk-cam-msg">
              {cam === "starting" && <p>Starting the camera…</p>}
              {cam === "denied" && (
                <>
                  <p>Camera access is blocked. Allow the camera for this site in your browser settings, then try again.</p>
                  <button type="button" className="btn btn-light" onClick={() => void startCamera()}>
                    Try again
                  </button>
                </>
              )}
              {cam === "unsupported" && (
                <>
                  <p>This browser cannot use the camera here. Use the box below to type the registration ID.</p>
                  <button type="button" className="btn btn-light" onClick={() => void startCamera()}>
                    Try again
                  </button>
                </>
              )}
              {cam === "off" && (
                <button type="button" className="btn btn-light" onClick={() => void startCamera()}>
                  Start camera
                </button>
              )}
            </div>
          )}
          {busy && <div className="desk-busy" role="status">Checking…</div>}
        </div>

        <div className={`desk-result res-${result?.kind ?? "idle"}`} role="status" aria-live="assertive">
          {!result && (
            <>
              <p className="res-label">Ready</p>
              <p className="res-text">Point the camera at the guest&apos;s QR code.</p>
            </>
          )}
          {result?.kind === "ok" && (
            <>
              <p className="res-label">Checked in</p>
              <p className="res-name">{result.person.name}</p>
              <p className="res-text">
                {result.person.designation}, {result.person.org}
              </p>
              <p className="res-meta">{result.person.id}</p>
            </>
          )}
          {result?.kind === "already" && (
            <>
              <p className="res-label">Already checked in</p>
              <p className="res-name">{result.person.name}</p>
              <p className="res-text">
                {result.person.designation}, {result.person.org}
              </p>
              <p className="res-meta">
                {result.person.id} · {result.at}
                {result.by ? ` · by ${result.by}` : ""}
              </p>
            </>
          )}
          {result?.kind === "missing" && (
            <>
              <p className="res-label">Not found</p>
              <p className="res-text">
                No registration matches <strong>{result.text}</strong>. Check the ID or ask the guest to show the email
                again.
              </p>
            </>
          )}
          {result?.kind === "error" && (
            <>
              <p className="res-label">Try again</p>
              <p className="res-text">{result.message}</p>
            </>
          )}
        </div>

        <form className="desk-manual" onSubmit={onManual}>
          <label htmlFor="manual-id">QR not working? Type the registration ID</label>
          <div className="desk-manual-row">
            <input
              id="manual-id"
              value={manual}
              onChange={(e) => setManual(e.target.value.toUpperCase())}
              placeholder="LC26-0007 or just 7"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
            />
            <button type="submit" className="btn btn-primary" disabled={busy || !manual.trim()}>
              Check in
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
