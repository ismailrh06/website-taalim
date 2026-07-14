// Explore les options réelles (parcours, matières) du formulaire CNEE pour
// une liste de branches, afin de construire des combinaisons valides pour
// scrape-cnee.mjs. Usage : node scripts/explore-cnee.mjs
import { Agent, setGlobalDispatcher } from "undici";

setGlobalDispatcher(
  new Agent({
    connect: {
      lookup: (_h, _o, cb) => cb(null, [{ address: "196.200.143.71", family: 4 }]),
    },
  }),
);

const BASE = "https://cnee.men.gov.ma/WebNational.aspx";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function field(html, name) {
  const m = html.match(new RegExp(`${name}" id="${name}" value="([^"]*)"`));
  return m ? m[1] : "";
}
function options(html, name) {
  const block = html.match(new RegExp(`name="${name}"[\\s\\S]*?<\\/select>`));
  if (!block) return [];
  return [...block[0].matchAll(/<option[^>]*value="([^"]*)"/g)].map((m) => m[1]);
}
async function post(fields) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", "user-agent": "Mozilla/5.0" },
    body: new URLSearchParams(fields),
  });
  return res.text();
}
function state(html) {
  return {
    __VIEWSTATE: field(html, "__VIEWSTATE"),
    __VIEWSTATEGENERATOR: field(html, "__VIEWSTATEGENERATOR"),
    __EVENTVALIDATION: field(html, "__EVENTVALIDATION"),
  };
}

const BRANCHES = [
  "شعبة العلوم الرياضية",
  "شعبة العلوم التجريبية",
  "شعبة علوم الاقتصاد والتدبير",
  "شعبة الآداب والعلوم الإنسانية",
  "شعبة العلوم والتكنولوجيات",
];

async function main() {
  const out = {};
  for (const branch of BRANCHES) {
    let html = await post({});
    let s = state(html);
    html = await post({ ...s, DropDownList1n: branch, Button1n: "نعم" });
    s = state(html);
    const tracks = options(html, "DropDownList2n");
    out[branch] = {};
    // On explore seulement le 1er parcours de chaque branche pour limiter les requêtes.
    const track = tracks[0];
    if (track) {
      await sleep(700);
      html = await post({ ...s, DropDownList1n: branch, DropDownList2n: track, Button2n: "نعم" });
      s = state(html);
      const subjects = options(html, "DropDownList3n");
      out[branch] = { tracks, firstTrackSubjects: { [track]: subjects } };
    } else {
      out[branch] = { tracks, firstTrackSubjects: {} };
    }
    process.stderr.write(`✓ ${branch}\n`);
    await sleep(700);
  }
  console.log(JSON.stringify(out, null, 2));
}

main();
