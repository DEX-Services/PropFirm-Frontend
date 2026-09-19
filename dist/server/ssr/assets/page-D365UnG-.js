import { C as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import { c as ShieldCheck, l as createLucideIcon } from "./ThemeSwitcher-CSO9oVP4.js";
import { t as LockKeyhole } from "./lock-keyhole-BGj-sh00.js";
import { a as UserRound, o as KeyRound, t as PropShell } from "./PropShell-DWj8H339.js";
//#region node_modules/lucide-react/dist/esm/icons/calendar-days.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$4 = {
	name: "calendar-days",
	size: 24,
	node: [
		["path", {
			d: "M8 2v3",
			key: "1ioesn"
		}],
		["path", {
			d: "M16 2v3",
			key: "otl347"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2",
			key: "h1oib"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}],
		["path", {
			d: "M8 13h.01",
			key: "1sbv64"
		}],
		["path", {
			d: "M12 13h.01",
			key: "y0uutt"
		}],
		["path", {
			d: "M16 13h.01",
			key: "wip0gl"
		}],
		["path", {
			d: "M8 17h.01",
			key: "p3bg7i"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}],
		["path", {
			d: "M16 17h.01",
			key: "ql8jdd"
		}]
	]
};
__iconData$4.node;
var CalendarDays = createLucideIcon(__iconData$4);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/check.mjs
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$3 = {
	name: "check",
	size: 24,
	node: [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]
};
__iconData$3.node;
var Check = createLucideIcon(__iconData$3);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/chevron-right.mjs
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$2 = {
	name: "chevron-right",
	size: 24,
	node: [["path", {
		d: "m9 18 6-6-6-6",
		key: "mthhwq"
	}]]
};
__iconData$2.node;
var ChevronRight = createLucideIcon(__iconData$2);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/circle-dollar-sign.mjs
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$1 = {
	name: "circle-dollar-sign",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",
			key: "1h4pet"
		}],
		["path", {
			d: "M12 18V6",
			key: "zqpxq5"
		}]
	]
};
__iconData$1.node;
var CircleDollarSign = createLucideIcon(__iconData$1);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/mail.mjs
/**
* @license lucide-react v1.46.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData = {
	name: "mail",
	size: 24,
	node: [["path", {
		d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
		key: "132q7q"
	}], ["rect", {
		x: "2",
		y: "4",
		width: "20",
		height: "16",
		rx: "2",
		key: "izxlao"
	}]]
};
__iconData.node;
var Mail = createLucideIcon(__iconData);
//#endregion
//#region app/profile/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const [saved, setSaved] = (0, import_react.useState)(false);
	function saveProfile() {
		setSaved(true);
		window.setTimeout(() => setSaved(false), 2600);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropShell, {
		active: "profile",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "profile-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "profile-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "eyebrow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), " ACCOUNT & SECURITY"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Your PropFirm profile" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Review your identity, purchased account, and login security." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "status-chip active",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), " Account active"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "profile-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "profile-main",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "profile-card identity-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "profile-avatar",
									children: "U"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Username" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "PropFirm trader" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "identity-tags",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 14 }), " rohit@example.com"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 14 }), " Joined Sep 2026"] })]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "secondary-button",
									children: "Edit profile"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "profile-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-heading",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "section-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDollarSign, { size: 18 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Trading account" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your purchased PropFirm account" })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "status-chip active",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), " Active"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "account-summary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LOGIN ID" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "PF-105827" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PROGRAM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "2-Step Challenge" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ACCOUNT SIZE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "$10,000" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CURRENT STAGE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Challenge 1 of 2" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "MAX LEVERAGE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "5×" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PURCHASED" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "12 Sep 2026" })] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "progress-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evaluation progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Requirements pending definition" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "info-banner",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "The backend will calculate your progress and decide when an account changes stage." })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "profile-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "card-heading",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "section-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 18 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Personal information" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Used for account communication" })] })] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-grid",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Full name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { defaultValue: "Username" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Email address", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											defaultValue: "user@example.com"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Country", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { defaultValue: "India" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Timezone", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { defaultValue: "Asia/Kolkata (IST)" })] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "card-actions",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "primary-button",
										onClick: saveProfile,
										children: saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), " Saved"] }) : "Save changes"
									})
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "profile-side",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "profile-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "card-heading",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "section-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 18 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Login security" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Protect your PropFirm access" })] })] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "settings-row",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "settings-icon",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 17 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Change password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Last changed 2 days ago" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 17 })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "settings-row",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "settings-icon",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Two-factor authentication" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Not configured" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "setup-label",
											children: "Set up"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 17 })
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "profile-card rule-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "eyebrow",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), " ACCOUNT RULES"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Know your limits" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rule-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Maximum leverage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "5×" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rule-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Daily loss limit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Awaiting confirmation" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rule-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total loss limit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Awaiting confirmation" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Confirmed rules will be loaded from the server—not written permanently into this page." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "profile-card help-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Need help?" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Contact support for purchase, login, or account questions." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "secondary-button",
									children: "Contact support"
								})
							]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { ProfilePage as default };
