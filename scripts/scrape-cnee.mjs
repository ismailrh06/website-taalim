// Récupère les vraies URLs de PDF d'examens nationaux depuis cnee.men.gov.ma.
//
// Le site est un formulaire ASP.NET WebForms à 5 sélections successives
// (branche → parcours → matière → année → session), chacune validée par un
// postback. Le PDF final n'est révélé qu'après la 5ᵉ sélection, sous la forme
// `NATIONAL\{année}\NS {code}.pdf` (sujet) et `NR {code}.pdf` (corrigé) —
// un motif qu'on ne peut pas deviner (espace dans le nom, code non séquentiel).
//
// Pour certaines matières (notamment les filières Maths, sous l'option
// « جميع المواد »), CNEE ne publie qu'une archive .rar groupant toutes les
// matières plutôt qu'un PDF par matière — ces combinaisons sont volontairement
// exclues ici : on ne veut que des liens qui s'ouvrent directement en PDF.
//
// Usage : node scripts/scrape-cnee.mjs > scripts/cnee-results.json
// Respectueux du serveur : requêtes séquentielles, délai entre chaque combo,
// DNS épinglé sur l'IP publique (le résolveur du bac à sable est instable
// sur ce domaine .gov.ma, pas le domaine lui-même).

import { Agent, setGlobalDispatcher } from "undici";

setGlobalDispatcher(
  new Agent({
    connect: {
      lookup: (_hostname, _opts, cb) =>
        cb(null, [{ address: "196.200.143.71", family: 4 }]),
    },
  }),
);

const BASE = "https://cnee.men.gov.ma/WebNational.aspx";
const DELAY_MS = 900;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function extractField(html, name) {
  const m = html.match(new RegExp(`${name}" id="${name}" value="([^"]*)"`));
  return m ? m[1] : "";
}
function extractOptions(html, selectName) {
  const block = html.match(new RegExp(`name="${selectName}"[\\s\\S]*?<\\/select>`));
  if (!block) return [];
  return [...block[0].matchAll(/<option[^>]*value="([^"]*)"/g)].map((m) => m[1]);
}
function extractPdfCodes(html) {
  const subject = html.match(/الموضوع#NATIONAL\\(\d{4})\\NS%20(\d+)\.pdf#/);
  const correction = html.match(/الاجابة#NATIONAL\\(\d{4})\\NR%20(\d+)\.pdf#/);
  return {
    subjectUrl: subject
      ? `https://cnee.men.gov.ma/NATIONAL/${subject[1]}/NS%20${subject[2]}.pdf`
      : undefined,
    correctionUrl: correction
      ? `https://cnee.men.gov.ma/NATIONAL/${correction[1]}/NR%20${correction[2]}.pdf`
      : undefined,
  };
}
async function post(fields, attempt = 1) {
  try {
    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "user-agent": "Mozilla/5.0 (compatible; QimmaBot/1.0; +https://qimma.ma)",
      },
      body: new URLSearchParams(fields),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    if (attempt >= 4) throw err;
    await sleep(1000 * attempt);
    return post(fields, attempt + 1);
  }
}
function state(html) {
  return {
    __VIEWSTATE: extractField(html, "__VIEWSTATE"),
    __VIEWSTATEGENERATOR: extractField(html, "__VIEWSTATEGENERATOR"),
    __EVENTVALIDATION: extractField(html, "__EVENTVALIDATION"),
  };
}

/** Traverse les 3 premières étapes et renvoie les années disponibles pour cette matière. */
async function listYears({ branch, track, subject }) {
  let html = await post({});
  let s = state(html);
  html = await post({ ...s, DropDownList1n: branch, Button1n: "نعم" });
  s = state(html);
  await sleep(DELAY_MS);
  html = await post({ ...s, DropDownList1n: branch, DropDownList2n: track, Button2n: "نعم" });
  s = state(html);
  await sleep(DELAY_MS);
  html = await post({
    ...s,
    DropDownList1n: branch,
    DropDownList2n: track,
    DropDownList3n: subject,
    Button3n: "نعم",
  });
  return { html, state: state(html), years: extractOptions(html, "DropDownList4n") };
}

/** Termine les étapes 4-5 pour une année/session donnée et extrait les PDF. */
async function fetchForYear({ branch, track, subject, year, session, state: s }) {
  let html = await post({
    ...s,
    DropDownList1n: branch,
    DropDownList2n: track,
    DropDownList3n: subject,
    DropDownList4n: year,
    Button4n: "نعم",
  });
  const s2 = state(html);
  await sleep(DELAY_MS);
  html = await post({
    ...s2,
    DropDownList1n: branch,
    DropDownList2n: track,
    DropDownList3n: subject,
    DropDownList4n: year,
    DropDownList5n: session,
    Button5n: "نعم",
  });
  return extractPdfCodes(html);
}

/** Filière → branche/parcours/matières CNEE, mappé sur features/catalog/taxonomy.ts. */
const TARGETS = [
  {
    streamId: "2bac-pc",
    branch: "شعبة العلوم التجريبية",
    track: "مسلك العلوم الفيزيائية",
    subjects: { math: "الرياضيات", pc: "الفيزياء والكيمياء", svt: "علوم الحياة والأرض" },
  },
  {
    streamId: "2bac-svt",
    branch: "شعبة العلوم التجريبية",
    track: "مسلك علوم الحياة والأرض",
    subjects: { math: "الرياضيات", pc: "الفيزياء والكيمياء", svt: "علوم الحياة والأرض" },
  },
  {
    streamId: "2bac-eco",
    branch: "شعبة علوم الاقتصاد والتدبير",
    track: "مسلك العلوم الاقتصادية",
    subjects: { math: "الرياضيات", eco: "الاقتصاد العام والإحصاء" },
  },
  {
    streamId: "2bac-lettres",
    branch: "شعبة الآداب والعلوم الإنسانية",
    track: " مسلك العلوم الإنسانية",
    subjects: { philo: "الفلسفة", hg: "التاريخ والجغرافيا", ar: "اللغة العربية وآدابها" },
  },
  {
    streamId: "2bac-ste",
    branch: "شعبة العلوم والتكنولوجيات",
    track: "مسلك العلوم والتكنولوجيات الكهربائية",
    subjects: { math: "الرياضيات", pc: "الفيزياء والكيمياء", si: "علوم المهندس" },
  },
];

const SESSION_NORMALE = "العادية";

async function main() {
  const results = [];
  for (const target of TARGETS) {
    for (const [subjectId, subjectLabel] of Object.entries(target.subjects)) {
      const key = `${target.streamId}/${subjectId}`;
      try {
        const { state: s, years } = await listYears({
          branch: target.branch,
          track: target.track,
          subject: subjectLabel,
        });
        // Année la plus récente en session normale, en repartant du plus récent.
        const candidateYears = [...years].reverse();
        let done = false;
        for (const year of candidateYears) {
          await sleep(DELAY_MS);
          const urls = await fetchForYear({
            branch: target.branch,
            track: target.track,
            subject: subjectLabel,
            year,
            session: SESSION_NORMALE,
            state: s,
          });
          if (urls.subjectUrl) {
            process.stderr.write(`✓ ${key} ${year}\n`);
            results.push({ streamId: target.streamId, subjectId, year: Number(year), ...urls });
            done = true;
            break;
          }
        }
        if (!done) process.stderr.write(`✗ ${key} — aucun PDF direct trouvé\n`);
      } catch (err) {
        process.stderr.write(`✗ ${key} ERROR ${err.message}\n`);
      }
      await sleep(DELAY_MS);
    }
  }
  console.log(JSON.stringify(results, null, 2));
}

main();
