import { _ as O, a as $, b as R, r as S, j as v, B as D, c as L, C as F, __tla as __tla_0 } from "./index-DyzPd4zG.js";
import { g as x } from "./getDataFromClipboard-DEAZh6Be.js";
let j;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  class r {
    constructor(e, t, a, i, s) {
      this._legacyCanvasSize = r.DEFAULT_CANVAS_SIZE, this._preferredCamera = "environment", this._maxScansPerSecond = 25, this._lastScanTimestamp = -1, this._destroyed = this._flashOn = this._paused = this._active = false, this.$video = e, this.$canvas = document.createElement("canvas"), a && typeof a == "object" ? this._onDecode = t : this._legacyOnDecode = t, t = typeof a == "object" ? a : {}, this._onDecodeError = t.onDecodeError || (typeof a == "function" ? a : this._onDecodeError), this._calculateScanRegion = t.calculateScanRegion || (typeof i == "function" ? i : this._calculateScanRegion), this._preferredCamera = t.preferredCamera || s || this._preferredCamera, this._legacyCanvasSize = typeof a == "number" ? a : typeof i == "number" ? i : this._legacyCanvasSize, this._maxScansPerSecond = t.maxScansPerSecond || this._maxScansPerSecond, this._onPlay = this._onPlay.bind(this), this._onLoadedMetaData = this._onLoadedMetaData.bind(this), this._onVisibilityChange = this._onVisibilityChange.bind(this), this._updateOverlay = this._updateOverlay.bind(this), e.disablePictureInPicture = true, e.playsInline = true, e.muted = true;
      let o = false;
      if (e.hidden && (e.hidden = false, o = true), document.body.contains(e) || (document.body.appendChild(e), o = true), a = e.parentElement, t.highlightScanRegion || t.highlightCodeOutline) {
        if (i = !!t.overlay, this.$overlay = t.overlay || document.createElement("div"), s = this.$overlay.style, s.position = "absolute", s.display = "none", s.pointerEvents = "none", this.$overlay.classList.add("scan-region-highlight"), !i && t.highlightScanRegion) {
          this.$overlay.innerHTML = '<svg class="scan-region-highlight-svg" viewBox="0 0 238 238" preserveAspectRatio="none" style="position:absolute;width:100%;height:100%;left:0;top:0;fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"><path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"/></svg>';
          try {
            this.$overlay.firstElementChild.animate({
              transform: [
                "scale(.98)",
                "scale(1.01)"
              ]
            }, {
              duration: 400,
              iterations: 1 / 0,
              direction: "alternate",
              easing: "ease-in-out"
            });
          } catch {
          }
          a.insertBefore(this.$overlay, this.$video.nextSibling);
        }
        t.highlightCodeOutline && (this.$overlay.insertAdjacentHTML("beforeend", '<svg class="code-outline-highlight" preserveAspectRatio="none" style="display:none;width:100%;height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;stroke-linecap:round;stroke-linejoin:round"><polygon/></svg>'), this.$codeOutlineHighlight = this.$overlay.lastElementChild);
      }
      this._scanRegion = this._calculateScanRegion(e), requestAnimationFrame(() => {
        let h = window.getComputedStyle(e);
        h.display === "none" && (e.style.setProperty("display", "block", "important"), o = true), h.visibility !== "visible" && (e.style.setProperty("visibility", "visible", "important"), o = true), o && (e.style.opacity = "0", e.style.width = "0", e.style.height = "0", this.$overlay && this.$overlay.parentElement && this.$overlay.parentElement.removeChild(this.$overlay), delete this.$overlay, delete this.$codeOutlineHighlight), this.$overlay && this._updateOverlay();
      }), e.addEventListener("play", this._onPlay), e.addEventListener("loadedmetadata", this._onLoadedMetaData), document.addEventListener("visibilitychange", this._onVisibilityChange), window.addEventListener("resize", this._updateOverlay), this._qrEnginePromise = r.createQrEngine();
    }
    static set WORKER_PATH(e) {
    }
    static async hasCamera() {
      try {
        return !!(await r.listCameras(false)).length;
      } catch {
        return false;
      }
    }
    static async listCameras(e = false) {
      if (!navigator.mediaDevices) return [];
      let t = async () => (await navigator.mediaDevices.enumerateDevices()).filter((i) => i.kind === "videoinput"), a;
      try {
        e && (await t()).every((i) => !i.label) && (a = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true
        }));
      } catch {
      }
      try {
        return (await t()).map((i, s) => ({
          id: i.deviceId,
          label: i.label || (s === 0 ? "Default Camera" : `Camera ${s + 1}`)
        }));
      } finally {
        a && r._stopVideoStream(a);
      }
    }
    async hasFlash() {
      let e;
      try {
        if (this.$video.srcObject) {
          if (!(this.$video.srcObject instanceof MediaStream)) return false;
          e = this.$video.srcObject;
        } else e = (await this._getCameraStream()).stream;
        return "torch" in e.getVideoTracks()[0].getSettings();
      } catch {
        return false;
      } finally {
        e && e !== this.$video.srcObject && r._stopVideoStream(e);
      }
    }
    isFlashOn() {
      return this._flashOn;
    }
    async toggleFlash() {
      this._flashOn ? await this.turnFlashOff() : await this.turnFlashOn();
    }
    async turnFlashOn() {
      if (!this._flashOn && !this._destroyed && (this._flashOn = true, this._active && !this._paused)) try {
        if (!await this.hasFlash()) throw "No flash available";
        await this.$video.srcObject.getVideoTracks()[0].applyConstraints({
          advanced: [
            {
              torch: true
            }
          ]
        });
      } catch (e) {
        throw this._flashOn = false, e;
      }
    }
    async turnFlashOff() {
      this._flashOn && (this._flashOn = false, await this._restartVideoStream());
    }
    destroy() {
      this.$video.removeEventListener("loadedmetadata", this._onLoadedMetaData), this.$video.removeEventListener("play", this._onPlay), document.removeEventListener("visibilitychange", this._onVisibilityChange), window.removeEventListener("resize", this._updateOverlay), this._destroyed = true, this._flashOn = false, this.stop(), r._postWorkerMessage(this._qrEnginePromise, "close");
    }
    async start() {
      if (this._destroyed) throw Error("The QR scanner can not be started as it had been destroyed.");
      if ((!this._active || this._paused) && (window.location.protocol, this._active = true, !document.hidden)) if (this._paused = false, this.$video.srcObject) await this.$video.play();
      else try {
        let { stream: e, facingMode: t } = await this._getCameraStream();
        !this._active || this._paused ? r._stopVideoStream(e) : (this._setVideoMirror(t), this.$video.srcObject = e, await this.$video.play(), this._flashOn && (this._flashOn = false, this.turnFlashOn().catch(() => {
        })));
      } catch (e) {
        if (!this._paused) throw this._active = false, e;
      }
    }
    stop() {
      this.pause(), this._active = false;
    }
    async pause(e = false) {
      if (this._paused = true, !this._active) return true;
      this.$video.pause(), this.$overlay && (this.$overlay.style.display = "none");
      let t = () => {
        this.$video.srcObject instanceof MediaStream && (r._stopVideoStream(this.$video.srcObject), this.$video.srcObject = null);
      };
      return e ? (t(), true) : (await new Promise((a) => setTimeout(a, 300)), this._paused ? (t(), true) : false);
    }
    async setCamera(e) {
      e !== this._preferredCamera && (this._preferredCamera = e, await this._restartVideoStream());
    }
    static async scanImage(e, t, a, i, s = false, o = false) {
      let h, g = false;
      t && ("scanRegion" in t || "qrEngine" in t || "canvas" in t || "disallowCanvasResizing" in t || "alsoTryWithoutScanRegion" in t || "returnDetailedScanResult" in t) && (h = t.scanRegion, a = t.qrEngine, i = t.canvas, s = t.disallowCanvasResizing || false, o = t.alsoTryWithoutScanRegion || false, g = true), t = !!a;
      try {
        let m, c;
        [a, m] = await Promise.all([
          a || r.createQrEngine(),
          r._loadImage(e)
        ]), [i, c] = r._drawToCanvas(m, h, i, s);
        let f;
        if (a instanceof Worker) {
          let n = a;
          t || r._postWorkerMessageSync(n, "inversionMode", "both"), f = await new Promise((d, p) => {
            let w, l, u, y = -1;
            l = (_) => {
              _.data.id === y && (n.removeEventListener("message", l), n.removeEventListener("error", u), clearTimeout(w), _.data.data !== null ? d({
                data: _.data.data,
                cornerPoints: r._convertPoints(_.data.cornerPoints, h)
              }) : p(r.NO_QR_CODE_FOUND));
            }, u = (_) => {
              n.removeEventListener("message", l), n.removeEventListener("error", u), clearTimeout(w), p("Scanner error: " + (_ ? _.message || _ : "Unknown Error"));
            }, n.addEventListener("message", l), n.addEventListener("error", u), w = setTimeout(() => u("timeout"), 1e4);
            let E = c.getImageData(0, 0, i.width, i.height);
            y = r._postWorkerMessageSync(n, "decode", E, [
              E.data.buffer
            ]);
          });
        } else f = await Promise.race([
          new Promise((n, d) => window.setTimeout(() => d("Scanner error: timeout"), 1e4)),
          (async () => {
            try {
              var [n] = await a.detect(i);
              if (!n) throw r.NO_QR_CODE_FOUND;
              return {
                data: n.rawValue,
                cornerPoints: r._convertPoints(n.cornerPoints, h)
              };
            } catch (d) {
              if (n = d.message || d, /not implemented|service unavailable/.test(n)) return r._disableBarcodeDetector = true, r.scanImage(e, {
                scanRegion: h,
                canvas: i,
                disallowCanvasResizing: s,
                alsoTryWithoutScanRegion: o
              });
              throw `Scanner error: ${n}`;
            }
          })()
        ]);
        return g ? f : f.data;
      } catch (m) {
        if (!h || !o) throw m;
        let c = await r.scanImage(e, {
          qrEngine: a,
          canvas: i,
          disallowCanvasResizing: s
        });
        return g ? c : c.data;
      } finally {
        t || r._postWorkerMessage(a, "close");
      }
    }
    setGrayscaleWeights(e, t, a, i = true) {
      r._postWorkerMessage(this._qrEnginePromise, "grayscaleWeights", {
        red: e,
        green: t,
        blue: a,
        useIntegerApproximation: i
      });
    }
    setInversionMode(e) {
      r._postWorkerMessage(this._qrEnginePromise, "inversionMode", e);
    }
    static async createQrEngine(e) {
      if (e = () => O(() => import("./qr-scanner-worker.min-D85Z9gVD.js"), []).then((a) => a.createWorker()), !(!r._disableBarcodeDetector && "BarcodeDetector" in window && BarcodeDetector.getSupportedFormats && (await BarcodeDetector.getSupportedFormats()).includes("qr_code"))) return e();
      let t = navigator.userAgentData;
      return t && t.brands.some(({ brand: a }) => /Chromium/i.test(a)) && /mac ?OS/i.test(t.platform) && await t.getHighEntropyValues([
        "architecture",
        "platformVersion"
      ]).then(({ architecture: a, platformVersion: i }) => /arm/i.test(a || "arm") && 13 <= parseInt(i || "13")).catch(() => true) ? e() : new BarcodeDetector({
        formats: [
          "qr_code"
        ]
      });
    }
    _onPlay() {
      this._scanRegion = this._calculateScanRegion(this.$video), this._updateOverlay(), this.$overlay && (this.$overlay.style.display = ""), this._scanFrame();
    }
    _onLoadedMetaData() {
      this._scanRegion = this._calculateScanRegion(this.$video), this._updateOverlay();
    }
    _onVisibilityChange() {
      document.hidden ? this.pause() : this._active && this.start();
    }
    _calculateScanRegion(e) {
      let t = Math.round(0.6666666666666666 * Math.min(e.videoWidth, e.videoHeight));
      return {
        x: Math.round((e.videoWidth - t) / 2),
        y: Math.round((e.videoHeight - t) / 2),
        width: t,
        height: t,
        downScaledWidth: this._legacyCanvasSize,
        downScaledHeight: this._legacyCanvasSize
      };
    }
    _updateOverlay() {
      requestAnimationFrame(() => {
        if (this.$overlay) {
          var e = this.$video, t = e.videoWidth, a = e.videoHeight, i = e.offsetWidth, s = e.offsetHeight, o = e.offsetLeft, h = e.offsetTop, g = window.getComputedStyle(e), m = g.objectFit, c = t / a, f = i / s;
          switch (m) {
            case "none":
              var n = t, d = a;
              break;
            case "fill":
              n = i, d = s;
              break;
            default:
              (m === "cover" ? c > f : c < f) ? (d = s, n = d * c) : (n = i, d = n / c), m === "scale-down" && (n = Math.min(n, t), d = Math.min(d, a));
          }
          var [p, w] = g.objectPosition.split(" ").map((u, y) => {
            const E = parseFloat(u);
            return u.endsWith("%") ? (y ? s - d : i - n) * E / 100 : E;
          });
          g = this._scanRegion.width || t, f = this._scanRegion.height || a, m = this._scanRegion.x || 0;
          var l = this._scanRegion.y || 0;
          c = this.$overlay.style, c.width = `${g / t * n}px`, c.height = `${f / a * d}px`, c.top = `${h + w + l / a * d}px`, a = /scaleX\(-1\)/.test(e.style.transform), c.left = `${o + (a ? i - p - n : p) + (a ? t - m - g : m) / t * n}px`, c.transform = e.style.transform;
        }
      });
    }
    static _convertPoints(e, t) {
      if (!t) return e;
      let a = t.x || 0, i = t.y || 0, s = t.width && t.downScaledWidth ? t.width / t.downScaledWidth : 1;
      t = t.height && t.downScaledHeight ? t.height / t.downScaledHeight : 1;
      for (let o of e) o.x = o.x * s + a, o.y = o.y * t + i;
      return e;
    }
    _scanFrame() {
      !this._active || this.$video.paused || this.$video.ended || ("requestVideoFrameCallback" in this.$video ? this.$video.requestVideoFrameCallback.bind(this.$video) : requestAnimationFrame)(async () => {
        if (!(1 >= this.$video.readyState)) {
          var e = Date.now() - this._lastScanTimestamp, t = 1e3 / this._maxScansPerSecond;
          e < t && await new Promise((i) => setTimeout(i, t - e)), this._lastScanTimestamp = Date.now();
          try {
            var a = await r.scanImage(this.$video, {
              scanRegion: this._scanRegion,
              qrEngine: this._qrEnginePromise,
              canvas: this.$canvas
            });
          } catch (i) {
            if (!this._active) return;
            this._onDecodeError(i);
          }
          !r._disableBarcodeDetector || await this._qrEnginePromise instanceof Worker || (this._qrEnginePromise = r.createQrEngine()), a ? (this._onDecode ? this._onDecode(a) : this._legacyOnDecode && this._legacyOnDecode(a.data), this.$codeOutlineHighlight && (clearTimeout(this._codeOutlineHighlightRemovalTimeout), this._codeOutlineHighlightRemovalTimeout = void 0, this.$codeOutlineHighlight.setAttribute("viewBox", `${this._scanRegion.x || 0} ${this._scanRegion.y || 0} ${this._scanRegion.width || this.$video.videoWidth} ${this._scanRegion.height || this.$video.videoHeight}`), this.$codeOutlineHighlight.firstElementChild.setAttribute("points", a.cornerPoints.map(({ x: i, y: s }) => `${i},${s}`).join(" ")), this.$codeOutlineHighlight.style.display = "")) : this.$codeOutlineHighlight && !this._codeOutlineHighlightRemovalTimeout && (this._codeOutlineHighlightRemovalTimeout = setTimeout(() => this.$codeOutlineHighlight.style.display = "none", 100));
        }
        this._scanFrame();
      });
    }
    _onDecodeError(e) {
      r.NO_QR_CODE_FOUND;
    }
    async _getCameraStream() {
      if (!navigator.mediaDevices) throw "Camera not found.";
      let e = /^(environment|user)$/.test(this._preferredCamera) ? "facingMode" : "deviceId", t = [
        {
          width: {
            min: 1024
          }
        },
        {
          width: {
            min: 768
          }
        },
        {}
      ], a = t.map((i) => Object.assign({}, i, {
        [e]: {
          exact: this._preferredCamera
        }
      }));
      for (let i of [
        ...a,
        ...t
      ]) try {
        let s = await navigator.mediaDevices.getUserMedia({
          video: i,
          audio: false
        }), o = this._getFacingMode(s) || (i.facingMode ? this._preferredCamera : this._preferredCamera === "environment" ? "user" : "environment");
        return {
          stream: s,
          facingMode: o
        };
      } catch {
      }
      throw "Camera not found.";
    }
    async _restartVideoStream() {
      let e = this._paused;
      await this.pause(true) && !e && this._active && await this.start();
    }
    static _stopVideoStream(e) {
      for (let t of e.getTracks()) t.stop(), e.removeTrack(t);
    }
    _setVideoMirror(e) {
      this.$video.style.transform = "scaleX(" + (e === "user" ? -1 : 1) + ")";
    }
    _getFacingMode(e) {
      return (e = e.getVideoTracks()[0]) ? /rear|back|environment/i.test(e.label) ? "environment" : /front|user|face/i.test(e.label) ? "user" : null : null;
    }
    static _drawToCanvas(e, t, a, i = false) {
      a = a || document.createElement("canvas");
      let s = t && t.x ? t.x : 0, o = t && t.y ? t.y : 0, h = t && t.width ? t.width : e.videoWidth || e.width, g = t && t.height ? t.height : e.videoHeight || e.height;
      return i || (i = t && t.downScaledWidth ? t.downScaledWidth : h, t = t && t.downScaledHeight ? t.downScaledHeight : g, a.width !== i && (a.width = i), a.height !== t && (a.height = t)), t = a.getContext("2d", {
        alpha: false
      }), t.imageSmoothingEnabled = false, t.drawImage(e, s, o, h, g, 0, 0, a.width, a.height), [
        a,
        t
      ];
    }
    static async _loadImage(e) {
      if (e instanceof Image) return await r._awaitImageLoad(e), e;
      if (e instanceof HTMLVideoElement || e instanceof HTMLCanvasElement || e instanceof SVGImageElement || "OffscreenCanvas" in window && e instanceof OffscreenCanvas || "ImageBitmap" in window && e instanceof ImageBitmap) return e;
      if (e instanceof File || e instanceof Blob || e instanceof URL || typeof e == "string") {
        let t = new Image();
        t.src = e instanceof File || e instanceof Blob ? URL.createObjectURL(e) : e.toString();
        try {
          return await r._awaitImageLoad(t), t;
        } finally {
          (e instanceof File || e instanceof Blob) && URL.revokeObjectURL(t.src);
        }
      } else throw "Unsupported image type.";
    }
    static async _awaitImageLoad(e) {
      e.complete && e.naturalWidth !== 0 || await new Promise((t, a) => {
        let i = (s) => {
          e.removeEventListener("load", i), e.removeEventListener("error", i), s instanceof ErrorEvent ? a("Image load error") : t();
        };
        e.addEventListener("load", i), e.addEventListener("error", i);
      });
    }
    static async _postWorkerMessage(e, t, a, i) {
      return r._postWorkerMessageSync(await e, t, a, i);
    }
    static _postWorkerMessageSync(e, t, a, i) {
      if (!(e instanceof Worker)) return -1;
      let s = r._workerMessageId++;
      return e.postMessage({
        id: s,
        type: t,
        data: a
      }, i), s;
    }
  }
  r.DEFAULT_CANVAS_SIZE = 400;
  r.NO_QR_CODE_FOUND = "No QR code found";
  r._disableBarcodeDetector = false;
  r._workerMessageId = 0;
  const P = "/assets/flashlightNoFillWhite-CdV3vayt.png", M = "/assets/flashlight-B4g_STge.png", k = "/assets/images-CgrKhsiD.png";
  j = function() {
    const C = $(), e = R(), t = S.useRef(null), a = S.useRef(null), i = S.useRef(false), s = document.getElementById("file-selector"), [o, h] = S.useState(false), [g, m] = S.useState(false), [c, f] = S.useState(false);
    S.useEffect(() => {
      if (o || i.current || !t.current) return;
      const l = new r(t.current, (u) => {
        const y = u.data;
        y && (i.current || (i.current = true, l.stop(), h(true), C("/send", {
          state: {
            btcAddress: y
          }
        })));
      }, {
        returnDetailedScanResult: true,
        highlightScanRegion: false,
        highlightCodeOutline: false
      });
      return a.current = l, l.start().then(() => m(true)).catch((u) => {
        m(false);
      }), () => {
        l.stop(), l.destroy(), a.current = null;
      };
    }, [
      C,
      o
    ]);
    const n = async () => {
      if (i.current) return;
      i.current = true, h(true);
      const l = await x();
      C("/send", {
        state: {
          btcAddress: l
        }
      });
    }, d = async () => {
      try {
        if (!await a.current.hasFlash()) {
          C("/error", {
            state: {
              errorMessage: "Device does not have a flash",
              background: e
            }
          });
          return;
        }
        await a.current.toggleFlash();
        const u = a.current.isFlashOn();
        f(u);
      } catch {
      }
    }, p = () => {
      const l = s.files[0];
      l && r.scanImage(l, {
        returnDetailedScanResult: true
      }).then((u) => {
        const y = u.data;
        y && (i.current || (i.current = true, C("/send", {
          state: {
            btcAddress: y
          }
        }), s.removeEventListener("change", p)));
      }).catch((u) => {
        C("/error", {
          state: {
            errorMessage: "No QR code found.",
            background: e
          }
        }), s.removeEventListener("change", p);
      });
    }, w = async () => {
      try {
        s.addEventListener("change", p), s.click();
      } catch {
      }
    };
    return v.jsxs("div", {
      className: "camera-page",
      children: [
        v.jsx("div", {
          className: "backContainer",
          children: v.jsx(D, {
            showWhite: true
          })
        }),
        v.jsxs("div", {
          id: "video-container",
          className: "example-style-2",
          children: [
            v.jsx("video", {
              ref: t,
              className: "camera-video",
              disablePictureInPicture: true,
              playsInline: true,
              muted: true,
              style: {
                width: "100%"
              }
            }),
            v.jsx("div", {
              className: "scan-region-highlight",
              style: {
                border: `4px solid ${L.light.blue}`
              },
              children: !g && v.jsx("p", {
                children: "Loading camera..."
              })
            })
          ]
        }),
        v.jsxs("div", {
          onClick: w,
          className: "fileContainer",
          children: [
            v.jsx("input", {
              hidden: true,
              type: "file",
              id: "file-selector",
              accept: "image/*"
            }),
            v.jsx("img", {
              className: "optionImage",
              src: k,
              alt: "images icon"
            })
          ]
        }),
        v.jsx("div", {
          onClick: d,
          className: "flashLightContainer",
          children: v.jsx("img", {
            className: "optionImage",
            src: c ? M : P,
            alt: "flash light icon"
          })
        }),
        v.jsx(F, {
          actionFunction: n,
          textContent: "Paste",
          buttonClassName: "handleCameraPaste",
          textClassName: "handleCameraPasteText"
        })
      ]
    });
  };
});
export {
  __tla,
  j as default
};
