// /api/TradingView/index.js
import historyProvider from './historyProvider';
import stream from './stream';

const supportedResolutions = ["1", "5", "15", "30", "60", "240", "D"];

export default function handler(req, res) {
  const { method, query } = req;

  if (method === 'GET') {
    switch (query.type) {
      case 'config':
        res.status(200).json({
          supports_search: true,
          supports_group_request: false,
          supports_marks: false,
          supports_timescale_marks: false,
          supports_time: true,
          supported_resolutions: supportedResolutions,
        });
        break;

      case 'symbols':
        res.status(200).json({
          ticker: query.symbol,
          name: query.symbol,
          description: "",
          type: "crypto",
          session: "24x7",
          timezone: "Etc/UTC",
          exchange: "",
          minmov: 1,
          pricescale: 100,
          has_intraday: true,
          supported_resolutions: supportedResolutions,
          volume_precision: 2,
        });
        break;

      case 'history':
        historyProvider(query.symbol, query.resolution, query.from, query.to).then(bars => {
          if (bars.length) {
            res.status(200).json({ s: "ok", t: bars.map(bar => bar.time), c: bars.map(bar => bar.close), o: bars.map(bar => bar.open), h: bars.map(bar => bar.high), l: bars.map(bar => bar.low), v: bars.map(bar => bar.volume) });
          } else {
            res.status(200).json({ s: "no_data" });
          }
        }).catch(err => {
          console.error(err);
          res.status(500).json({ s: "error", errmsg: err });
        });
        break;

      case 'timescale_marks':
        res.status(200).json([]);
        break;

      case 'time':
        res.status(200).json({ time: Math.floor(Date.now() / 1000) });
        break;

      default:
        res.status(400).json({ s: "error", errmsg: "Invalid request" });
    }
  } else {
    res.status(405).json({ s: "error", errmsg: "Method not allowed" });
  }
}
