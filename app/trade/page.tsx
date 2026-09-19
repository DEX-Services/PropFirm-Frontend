"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Clock3, Info, Search, Settings2, ShieldCheck, Star, TrendingDown, TrendingUp, X } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { PropShell } from "../components/PropShell";
import { TradingViewChart } from "../components/TradingViewChart";

const markets = [
  { symbol: "BI2X", pair: "BI2X-BI2XUSD", quote: "BI2XUSD", chartSymbol: "BTC", price: "68,412.50", change: "+2.84%", up: true },
  { symbol: "ETH", pair: "ETH / BIUSDB", quote: "BIUSDB", chartSymbol: "ETH", price: "3,746.28", change: "+1.37%", up: true },
  { symbol: "SOL", pair: "SOL / BIUSDB", quote: "BIUSDB", chartSymbol: "SOL", price: "181.42", change: "+4.16%", up: true },
  { symbol: "BNB", pair: "BNB / BIUSDB", quote: "BIUSDB", chartSymbol: "BNB", price: "612.05", change: "-0.82%", up: false },
  { symbol: "LINK", pair: "LINK / BIUSDB", quote: "BIUSDB", chartSymbol: "LINK", price: "17.65", change: "+0.48%", up: true },
];

const asks = [
  ["68,454.70", "0.318", "21,772"],
  ["68,447.60", "0.192", "13,141"],
  ["68,438.20", "0.284", "19,440"],
  ["68,429.80", "0.176", "12,043"],
  ["68,421.10", "0.391", "26,751"],
  ["68,415.30", "0.227", "15,530"],
];
const bids = [
  ["68,407.90", "0.251", "17,171"],
  ["68,399.40", "0.438", "29,959"],
  ["68,390.80", "0.195", "13,336"],
  ["68,384.20", "0.342", "23,387"],
  ["68,375.60", "0.163", "11,145"],
  ["68,368.10", "0.276", "18,872"],
];

export default function TradePage() {
  const [marketMode, setMarketMode] = useState<"spot" | "futures">("futures");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit">("limit");
  const [market, setMarket] = useState(markets[0]);
  const [size, setSize] = useState(25);
  const [positionTab, setPositionTab] = useState("Positions");
  const [bookTab, setBookTab] = useState("Order Book");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [rulesOpen, setRulesOpen] = useState(false);
  const [tpSlEnabled, setTpSlEnabled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [orderValue, setOrderValue] = useState("1000.00");
  const [limitPrice, setLimitPrice] = useState(markets[0].price.replace(",", ""));
  const [openOrders, setOpenOrders] = useState<{ id: number; market: string; mode: string; side: string; type: string; value: string; status: string }[]>([]);
  const filteredMarkets = markets.filter((item) => item.pair.toLowerCase().includes(query.trim().toLowerCase()));
  const margin = useMemo(() => {
    const numericOrderValue = Number(orderValue.replace(/,/g, "")) || 0;
    const selectedValue = numericOrderValue * size / 100;
    return (marketMode === "futures" ? selectedValue / 5 : selectedValue).toFixed(2);
  }, [marketMode, orderValue, size]);

  function changeMarketMode(nextMode: "spot" | "futures") {
    setMarketMode(nextMode);
    setPositionTab(nextMode === "spot" ? "Holdings" : "Positions");
  }

  function placeDemoOrder() {
    setOpenOrders((orders) => [{ id: Date.now(), market: market.pair, mode: marketMode, side: side.toUpperCase(), type: orderType.toUpperCase(), value: orderValue, status: "Awaiting backend" }, ...orders]);
    setPositionTab("Open Orders");
    setNotice(`Demo ${marketMode} ${side} order prepared. The PropFirm backend must approve a real order.`);
    window.setTimeout(() => setNotice(""), 3500);
  }

  function selectMarket(item: (typeof markets)[number]) {
    setMarket(item);
    setLimitPrice(item.price.replace(",", ""));
  }

  return (
    <PropShell active="trade">
      <main className="trade-page">
        <section className="instrument-strip" aria-label="Selected market and account status">
          <div className="instrument-primary"><span className="asset-icon instrument-icon">{market.symbol.slice(0, 3)}</span><span><strong>{market.pair}</strong><small>{market.symbol} / {market.quote} <b>{marketMode === "spot" ? "SPOT" : "FUTURES"}</b></small></span></div>
          <div className="instrument-price"><strong>{market.price}</strong><small className={market.up ? "positive" : "negative"}>{market.change} today</small></div>
          <div className="instrument-stat"><span>24H HIGH</span><strong>69,124.80</strong></div>
          <div className="instrument-stat"><span>24H LOW</span><strong>65,907.30</strong></div>
          <div className="instrument-stat"><span>ACCOUNT</span><strong>2-Step Challenge</strong><small>Challenge 1 of 2</small></div>
          <div className="instrument-stat"><span>MAX LEVERAGE</span><strong>5x</strong><small>Server enforced</small></div>
          <div className="instrument-stat"><span>STATUS</span><strong className="positive">Active</strong><small>5x maximum leverage</small></div>
          <button className="rule-toggle" onClick={() => setRulesOpen((value) => !value)}><ShieldCheck size={16} /> Account Rules <ChevronDown size={14} /></button>
        </section>

        {rulesOpen && <section className="rules-panel" aria-label="2-Step Challenge rules">
          <div className="rules-heading"><span><ShieldCheck size={17} /><strong>2-Step Challenge rules</strong></span><button onClick={() => setRulesOpen(false)} aria-label="Close account rules"><X size={17} /></button></div>
          <div className="rules-grid">
            <div><span>CHALLENGE 1 LOSS LIMIT</span><strong>Not confirmed</strong><small>Original 10% / 8% note is ambiguous</small></div>
            <div><span>CHALLENGE 2 LOSS LIMIT</span><strong>Not confirmed</strong><small>Must be confirmed before enforcement</small></div>
            <div><span>FUNDED DAILY LOSS</span><strong>5%</strong><small>Confirmed supplied rule</small></div>
            <div><span>FUNDED TOTAL LOSS</span><strong>8%</strong><small>Confirmed supplied rule</small></div>
            <div><span>MAXIMUM LEVERAGE</span><strong>5x</strong><small>Applies to every account</small></div>
            <div><span>PROFIT TARGET</span><strong>Not provided</strong><small>No target is assumed</small></div>
          </div>
          <p><Info size={14} /> Evaluation limits remain informational until the business requirement is confirmed. The backend must calculate and enforce all final rules.</p>
        </section>}

        <section className="metrics-strip" aria-label="PropFirm risk metrics">
          <div className="metric"><span>STARTING BALANCE</span><strong>$10,000.00</strong><small>Challenge allocation</small></div>
          <div className="metric"><span>CURRENT BALANCE</span><strong>$10,240.00</strong><small className="positive">+$240.00 closed PnL</small></div>
          <div className="metric"><span>CURRENT EQUITY</span><strong>$10,186.42</strong><small>Includes open PnL</small></div>
          <div className="metric"><span>DAILY LOSS USED</span><strong>$146</strong><small>Challenge limit not confirmed</small></div>
          <div className="metric"><span>TOTAL LOSS USED</span><strong>$214</strong><small>Challenge limit not confirmed</small></div>
        </section>

        <PanelGroup direction="horizontal" className="terminal-grid">
          <Panel defaultSize={14} minSize={10} maxSize={24}>
          <aside className="panel market-panel">
            <div className="panel-title"><strong>Markets</strong><button aria-label="Market settings"><Settings2 size={16} /></button></div>
            <div className="market-search"><Search size={15} /><input aria-label="Search markets" placeholder="Search markets" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
            <div className="asset-category-tabs"><button className="active">Crypto</button><button disabled title="Supported Forex markets are not confirmed">Forex</button><button disabled title="Supported stock markets are not confirmed">Stocks</button></div>
            <div className="market-tabs">
              <button className={marketMode === "spot" ? "active" : ""} onClick={() => changeMarketMode("spot")}>Spot</button>
              <button className={marketMode === "futures" ? "active" : ""} onClick={() => changeMarketMode("futures")}>Futures</button>
            </div>
            <div className="market-list-head"><span>Pair</span><span>Price / 24h</span></div>
            <div className="market-list">
              {filteredMarkets.map((item) => (
                <button key={item.symbol} className={market.symbol === item.symbol ? "market-row selected" : "market-row"} onClick={() => selectMarket(item)}>
                  <Star size={13} /><span><strong>{item.symbol}</strong><small>{marketMode === "spot" ? "Spot" : "Perpetual"}</small></span><span className="market-price"><strong>{item.price}</strong><small className={item.up ? "positive" : "negative"}>{item.change}</small></span>
                </button>
              ))}
              {filteredMarkets.length === 0 && <div className="market-empty">No matching markets</div>}
            </div>
          </aside>
          </Panel>

          <PanelResizeHandle className="panel-resize-handle" aria-label="Resize markets and chart"><i /></PanelResizeHandle>

          <Panel defaultSize={69} minSize={44}>
          <div className="terminal-center">
            <section className="panel chart-panel">
              <div className="chart-titlebar"><span>TRADINGVIEW CHART</span><span>Live market data</span></div>
              <TradingViewChart symbol={market.chartSymbol} />
            </section>

            <section className="panel positions-panel">
              <div className="position-tabs">
                {(marketMode === "spot" ? ["Holdings", "Open Orders", "Trade History", "Rule Activity"] : ["Positions", "Open Orders", "Trade History", "Rule Activity"]).map((tab) => <button className={positionTab === tab ? "active" : ""} key={tab} onClick={() => setPositionTab(tab)}>{tab}<span>{tab === "Positions" || tab === "Holdings" ? "1" : tab === "Open Orders" ? String(openOrders.length) : ""}</span></button>)}
                <div className="total-pnl">Total PnL: <strong>+$240.00</strong></div>
              </div>
              {marketMode === "futures" && positionTab === "Positions" ? (
                <div className="table-scroll"><table><thead><tr><th>Market</th><th>Side</th><th>Size</th><th>Entry</th><th>Mark</th><th>Margin</th><th>Unrealized PnL</th><th>Action</th></tr></thead><tbody><tr><td><strong>BI2X-BI2XUSD</strong><small>Perpetual · 5x</small></td><td><span className="status-chip long">Long</span></td><td>0.018 BI2X</td><td>67,914.20</td><td>68,412.50</td><td>$244.49</td><td className="positive"><strong>+$8.97</strong><small>+3.67%</small></td><td><button className="close-button">Close</button></td></tr></tbody></table></div>
              ) : marketMode === "spot" && positionTab === "Holdings" ? (
                <div className="table-scroll"><table><thead><tr><th>Asset</th><th>Available</th><th>In Orders</th><th>Average Price</th><th>Current Value</th><th>Total PnL</th><th>Action</th></tr></thead><tbody><tr><td><strong>BI2X</strong><small>BI2XUSD spot</small></td><td>0.018 BI2X</td><td>0.000 BI2X</td><td>67,914.20</td><td>$1,231.43</td><td className="positive"><strong>+$8.97</strong><small>+0.73%</small></td><td><button className="close-button" onClick={() => setSide("sell")}>Sell</button></td></tr></tbody></table></div>
              ) : positionTab === "Open Orders" && openOrders.length > 0 ? (
                <div className="table-scroll"><table><thead><tr><th>Market</th><th>Mode</th><th>Side</th><th>Type</th><th>Order Value</th><th>Status</th><th>Action</th></tr></thead><tbody>{openOrders.map((order) => <tr key={order.id}><td><strong>{order.market}</strong><small>Frontend request</small></td><td>{order.mode}</td><td className={order.side === "BUY" ? "positive" : "negative"}>{order.side}</td><td>{order.type}</td><td>{order.value} BI2XUSD</td><td>{order.status}</td><td><button className="close-button" onClick={() => setOpenOrders((orders) => orders.filter((item) => item.id !== order.id))}>Cancel</button></td></tr>)}</tbody></table></div>
              ) : <div className="empty-state"><Clock3 size={22} /><strong>No {positionTab.toLowerCase()}</strong><span>Your {positionTab.toLowerCase()} will appear here.</span></div>}
            </section>
          </div>
          </Panel>

          <PanelResizeHandle className="panel-resize-handle" aria-label="Resize chart and order entry"><i /></PanelResizeHandle>

          <Panel defaultSize={17} minSize={15} maxSize={30}>
          <PanelGroup direction="vertical" className="terminal-right">
            <Panel defaultSize={58} minSize={38}>
            <aside className="panel order-panel">
              <div className="product-tabs">
                <button className={marketMode === "spot" ? "active" : ""} onClick={() => changeMarketMode("spot")}>Spot</button>
                <button className={marketMode === "futures" ? "active" : ""} onClick={() => changeMarketMode("futures")}>Futures</button>
                <button disabled>Options</button>
              </div>
              <div className="side-tabs"><button className={side === "buy" ? "buy active" : ""} onClick={() => setSide("buy")}><TrendingUp size={15} /> {marketMode === "spot" ? "Buy" : "Buy / Long"}</button><button className={side === "sell" ? "sell active" : ""} onClick={() => setSide("sell")}><TrendingDown size={15} /> {marketMode === "spot" ? "Sell" : "Sell / Short"}</button></div>
              <div className="order-type-tabs"><button className={orderType === "market" ? "active" : ""} onClick={() => setOrderType("market")}>Market</button><button className={orderType === "limit" ? "active" : ""} onClick={() => setOrderType("limit")}>Limit</button><button className={moreOpen ? "active" : ""} onClick={() => setMoreOpen((value) => !value)}>More <ChevronDown size={12} /></button></div>
              <div className="order-balance"><span>{marketMode === "spot" ? (side === "buy" ? "Available BI2XUSD" : "Available BI2X") : "Available margin"}</span><strong>{marketMode === "spot" && side === "sell" ? "0.018 BI2X" : marketMode === "spot" ? "$10,240.00" : "$8,420.18"}</strong></div>
              {marketMode === "futures" ? <div className="order-inline"><button>Isolated <ChevronDown size={14} /></button><button title="Leverage is capped for every PropFirm account">5x max</button></div> : <div className="spot-mode-note"><strong>Spot · 1x</strong><span>No leverage or liquidation price</span></div>}
              {moreOpen && <div className="advanced-options"><label><input type="checkbox" disabled={marketMode === "spot"} /> Reduce only</label><label>Slippage tolerance <span>0.50%</span></label></div>}
              {orderType === "limit" && <div className="trade-field"><label>Limit price</label><div><input inputMode="decimal" value={limitPrice} onChange={(event) => setLimitPrice(event.target.value)} /><span>{market.quote}</span></div></div>}
              <div className="trade-field"><label>Order value</label><div><input inputMode="decimal" value={orderValue} onChange={(event) => setOrderValue(event.target.value)} /><span>{market.quote}</span></div></div>
              <div className="size-slider"><input type="range" min="0" max="100" value={size} onChange={(event) => setSize(Number(event.target.value))} /><div><span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span></div></div>
              <div className="order-summary"><div><span>Selected size</span><strong>{size}%</strong></div><div><span>{marketMode === "spot" ? "Order amount" : "Required margin"}</span><strong>${margin}</strong></div><div><span>Leverage</span><strong>{marketMode === "spot" ? "1x" : "5x max"}</strong></div><div><span>Estimated fee</span><strong>$0.50</strong></div></div>
              <label className="check-row"><input type="checkbox" checked={tpSlEnabled} onChange={(event) => setTpSlEnabled(event.target.checked)} /> Take profit / Stop loss</label>
              {tpSlEnabled && <div className="tp-sl-grid"><div className="trade-field"><label>Take profit</label><div><input inputMode="decimal" placeholder="Price" /><span>{market.quote}</span></div></div><div className="trade-field"><label>Stop loss</label><div><input inputMode="decimal" placeholder="Price" /><span>{market.quote}</span></div></div></div>}
              <button className={side === "buy" ? "submit-order buy" : "submit-order sell"} onClick={placeDemoOrder}>{side === "buy" ? <TrendingUp size={18} /> : <TrendingDown size={18} />}{side === "buy" ? `Buy ${market.symbol}` : `Sell ${market.symbol}`}</button>
              <p className="order-disclaimer">The server must check account status, margin, leverage, and rule limits before executing a real trade.</p>
            </aside>
            </Panel>

            <PanelResizeHandle className="panel-resize-handle panel-resize-handle-row" aria-label="Resize order form and order book"><i /></PanelResizeHandle>

            <Panel defaultSize={42} minSize={24}>
            <aside className="panel orderbook-panel">
              <div className="book-tabs"><button className={bookTab === "Order Book" ? "active" : ""} onClick={() => setBookTab("Order Book")}>Order Book</button><button className={bookTab === "Trades" ? "active" : ""} onClick={() => setBookTab("Trades")}>Trades</button><span>DEMO</span></div>
              {bookTab === "Order Book" ? <>
                <div className="book-head"><span>PRICE</span><span>SIZE</span><span>TOTAL</span></div>
                <div className="book-rows">{asks.map((row) => <div className="ask" key={row[0]}>{row.map((value) => <span key={value}>{value}</span>)}</div>)}</div>
                <div className="spread-row"><strong>{market.price}</strong><span>Spread 0.012%</span></div>
                <div className="book-rows">{bids.map((row) => <div className="bid" key={row[0]}>{row.map((value) => <span key={value}>{value}</span>)}</div>)}</div>
              </> : <div className="empty-state"><Clock3 size={20} /><strong>No recent demo trades</strong><span>Live trades will come from the market data service.</span></div>}
            </aside>
            </Panel>
          </PanelGroup>
          </Panel>
        </PanelGroup>
      </main>
      {notice && <div className="toast">{notice}</div>}
    </PropShell>
  );
}
