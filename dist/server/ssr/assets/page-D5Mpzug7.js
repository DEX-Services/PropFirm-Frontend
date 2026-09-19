import { C as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import { c as ShieldCheck, l as createLucideIcon, n as Link, t as ThemeSwitcher } from "./ThemeSwitcher-CSO9oVP4.js";
import { t as LockKeyhole } from "./lock-keyhole-BGj-sh00.js";
//#region node_modules/lucide-react/dist/esm/icons/arrow-right.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$2 = {
	name: "arrow-right",
	size: 24,
	node: [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "m12 5 7 7-7 7",
		key: "xquz4c"
	}]]
};
__iconData$2.node;
var ArrowRight = createLucideIcon(__iconData$2);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/eye.mjs
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$1 = {
	name: "eye",
	size: 24,
	node: [["path", {
		d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
		key: "1nclc0"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]]
};
__iconData$1.node;
var Eye = createLucideIcon(__iconData$1);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/eye-off.mjs
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData = {
	name: "eye-off",
	size: 24,
	node: [
		["path", {
			d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
			key: "ct8e1f"
		}],
		["path", {
			d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
			key: "151rxh"
		}],
		["path", {
			d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
			key: "13bj9a"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]
};
__iconData.node;
var EyeOff = createLucideIcon(__iconData);
//#endregion
//#region app/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		window.setTimeout(() => window.location.assign("/trade"), 550);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "login-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "login-theme",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSwitcher, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ambient ambient-one" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ambient ambient-two" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "login-story",
				"aria-label": "About PropFirm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "brand",
						href: "/",
						"aria-label": "PropFirm home",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-mark",
								children: "P"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PropFirm" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "by BitDx" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "story-content",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "eyebrow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), " YOUR TRADING WORKSPACE"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
								"Your rules.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Your progress.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "One clear view." })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Trade your PropFirm account while keeping balance, equity, drawdown, and account status visible at every step." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "story-points",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Protected access" }), "Separate from your BitDx wallet login"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Backend-controlled rules" }), "Balances and limits cannot be changed in the browser"] })] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "login-footnote",
						children: "Purchased on BitDx. Managed securely on PropFirm."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "login-panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "login-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mobile-brand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-mark",
								children: "P"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PropFirm" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "demo-pill",
							children: "FRONTEND DEMO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Welcome back" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use the login details issued after your account purchase." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "loginId",
									children: "PropFirm login ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "loginId",
									name: "loginId",
									defaultValue: "PF-105827",
									autoComplete: "username",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "label-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "password",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-button",
										children: "Forgot password?"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "password-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "password",
										name: "password",
										type: showPassword ? "text" : "password",
										defaultValue: "demo1234",
										autoComplete: "current-password",
										required: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowPassword((value) => !value),
										"aria-label": showPassword ? "Hide password" : "Show password",
										children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "primary-button login-button",
									type: "submit",
									disabled: loading,
									children: [loading ? "Opening workspace…" : "Sign in to PropFirm", !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "security-note",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "In production, login is verified by the backend and uses a secure session cookie." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "support-copy",
							children: ["Need help with your account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-button",
								children: "Contact support"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { LoginPage as default };
