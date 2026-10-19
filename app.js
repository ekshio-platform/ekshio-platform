(function(){
"use strict";

const $ = id => document.getElementById(id);
const storageKey = "ekshio-opportunities-v1";
let lang = "bn";
let items = [];
let storageAvailable = true;

const words = {
bn:{
tag:"একসাথে সুযোগ খুঁজি, এগিয়ে যাই",
headline:"আপনার পরবর্তী সুযোগ, এক জায়গায়।",
intro:"চাকরি, বৃত্তি, ভর্তি ও প্রশিক্ষণের তথ্য গুছিয়ে রাখুন। নিজের অগ্রগতি নিজেই ট্র্যাক করুন।",
totalLabel:"মোট সুযোগ",activeLabel:"চলমান",doneLabel:"সম্পন্ন",
addTitle:"＋ নিজের সুযোগ যোগ করুন",titleLabel:"সুযোগের নাম *",
titlePH:"যেমন: প্রশিক্ষণ বা চাকরির নাম",
categoryLabel:"ধরন",job:"চাকরি",scholarship:"বৃত্তি",
admission:"ভর্তি",training:"প্রশিক্ষণ",other:"অন্যান্য",
deadlineLabel:"শেষ তারিখ (ঐচ্ছিক)",urlLabel:"তথ্যের লিংক (ঐচ্ছিক)",
urlPH:"https://...",sourceLabel:"উৎস/প্রতিষ্ঠানের নাম (ঐচ্ছিক)",
sourcePH:"যেমন: প্রতিষ্ঠানের নাম",addButton:"＋ সুযোগ সংরক্ষণ করুন",
listTitle:"আপনার সুযোগসমূহ",searchPH:"নাম বা প্রতিষ্ঠান দিয়ে খুঁজুন",
all:"সব অবস্থা",inProgress:"চলমান",completed:"সম্পন্ন",
privacy:"আপনার তথ্য এই ব্রাউজারেই সংরক্ষিত হয়। অন্য ডিভাইসে নিজে থেকে সিঙ্ক হয় না। ব্রাউজারের ডেটা মুছে ফেললে তথ্য হারাতে পারে।",
directoryTitle:"সুযোগ খুঁজুন",
directoryIntro:"নিচের উৎসগুলো থেকে সুযোগ খুঁজুন। আবেদন করার আগে মূল বিজ্ঞপ্তি ও শেষ তারিখ যাচাই করুন।",
jobsHeading:"চাকরি",govJobs:"সরকারি নিয়োগ বিজ্ঞপ্তি ↗",
bpsc:"সরকারি কর্ম কমিশনের নোটিশ ↗",
admissionHeading:"ভর্তি ও বিশ্ববিদ্যালয়",
nu:"জাতীয় বিশ্ববিদ্যালয়ের ভর্তি নোটিশ ↗",
ugc:"ইউজিসির বিশ্ববিদ্যালয় ডিরেক্টরি ↗",
scholarshipHeading:"বৃত্তি",merit:"ইউজিসির মেধাবৃত্তি ↗",
commonwealth:"কমনওয়েলথ বৃত্তি ↗",
education:"শিক্ষা বিভাগের বৃত্তি ↗",
trainingHeading:"প্রশিক্ষণ ও দক্ষতা উন্নয়ন",
skills:"জাতীয় দক্ষতা উন্নয়ন পোর্টাল ↗",
directoryNote:"এগুলো তথ্য খোঁজার উৎস; সব সুযোগ বর্তমানে খোলা আছে এমন নিশ্চয়তা নেই। আবেদন করার আগে মূল বিজ্ঞপ্তি পড়ুন।",
footer:"প্রথম সংস্করণ · কাজ চলছে",
empty:"এখনো কোনো সুযোগ যোগ করা হয়নি। উপরের ফর্ম দিয়ে প্রথমটি যোগ করুন।",
source:"উৎস",deadline:"শেষ তারিখ",markDone:"সম্পন্ন করুন",
markActive:"চলমান করুন",delete:"মুছুন",
confirm:"এই সুযোগটি মুছে ফেলবেন?",
invalidUrl:"সঠিক http:// অথবা https:// লিংক দিন।",
saved:"সুযোগ সংরক্ষিত হয়েছে।",
storageError:"তথ্য সংরক্ষণ করা যায়নি। ব্রাউজারের স্টোরেজ পরীক্ষা করুন।",
saveWarning:"সুযোগটি দেখা যাচ্ছে, কিন্তু স্থায়ীভাবে সংরক্ষণ করা যায়নি।",
notSaved:"সুযোগ সংরক্ষণ করা যায়নি।",
emptySearch:"এই অনুসন্ধানে কোনো সুযোগ পাওয়া যায়নি।",
statusDone:"সম্পন্ন",statusActive:"চলমান"
},
en:{
tag:"Discover opportunities. Move forward together.",
headline:"Your next opportunity, in one place.",
intro:"Organize jobs, scholarships, admissions and training. Track your own progress.",
totalLabel:"Total opportunities",activeLabel:"In progress",doneLabel:"Completed",
addTitle:"＋ Add an opportunity",titleLabel:"Opportunity name *",
titlePH:"e.g. Training or job title",
categoryLabel:"Category",job:"Job",scholarship:"Scholarship",
admission:"Admission",training:"Training",other:"Other",
deadlineLabel:"Deadline (optional)",urlLabel:"Source link (optional)",
urlPH:"https://...",sourceLabel:"Source or organization (optional)",
sourcePH:"e.g. Organization name",addButton:"＋ Save opportunity",
listTitle:"Your opportunities",searchPH:"Search name or organization",
all:"All statuses",inProgress:"In progress",completed:"Completed",
privacy:"Your entries are saved in this browser only. They do not sync to other devices. Clearing browser data may remove them.",
directoryTitle:"Find opportunities",
directoryIntro:"Explore the sources below. Verify the original announcement and deadline before applying.",
jobsHeading:"Jobs",govJobs:"Government job announcements ↗",
bpsc:"Public Service Commission notices ↗",
admissionHeading:"Admissions and universities",
nu:"National University admission notices ↗",
ugc:"UGC university directory ↗",
scholarshipHeading:"Scholarships",merit:"UGC merit scholarship ↗",
commonwealth:"Commonwealth scholarship ↗",
education:"Education ministry scholarships ↗",
trainingHeading:"Training and skills",
skills:"National Skills Development Portal ↗",
directoryNote:"These are information sources, not a guarantee that opportunities are currently open. Check the original announcement before applying.",
footer:"First version · In progress",
empty:"No opportunities yet. Add your first one using the form above.",
source:"Source",deadline:"Deadline",markDone:"Mark complete",
markActive:"Mark in progress",delete:"Delete",
confirm:"Delete this opportunity?",
invalidUrl:"Please use a valid http:// or https:// link.",
saved:"Opportunity saved.",
storageError:"Could not save data. Check your browser storage.",
saveWarning:"The opportunity is visible but could not be saved permanently.",
notSaved:"The opportunity could not be saved.",
emptySearch:"No opportunities match this search.",
statusDone:"Completed",statusActive:"In progress"
}
};

function t(key){return words[lang][key] || key;}

function showMessage(message){
  const box = $("formMessage");
  box.textContent = message;
  box.hidden = false;
}

function hideMessage(){
  $("formMessage").hidden = true;
}

function loadItems(){
  try{
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    if(Array.isArray(parsed)){
      items = parsed.filter(x => x && typeof x.title === "string");
    }
  }catch(e){
    storageAvailable = false;
    items = [];
  }
}

function saveItems(){
  try{
    localStorage.setItem(storageKey, JSON.stringify(items));
    return true;
  }catch(e){
    storageAvailable = false;
    return false;
  }
}

function safeUrl(raw){
  try{
    const u = new URL(raw);
    return ["http:","https:"].includes(u.protocol) ? u.href : "";
  }catch(e){
    return "";
  }
}

function makeButton(label, className, action){
  const b = document.createElement("button");
  b.type = "button";
  b.className = className;
  b.textContent = label;
  b.addEventListener("click", action);
  return b;
}

function render(){
  $("total").textContent = items.length;
  $("active").textContent = items.filter(x => !x.done).length;
  $("done").textContent = items.filter(x => x.done).length;

  const q = $("search").value.trim().toLowerCase();
  const filter = $("filter").value;
  const shown = items.filter(x => {
    const statusMatch = filter === "all" ||
      (filter === "done" ? x.done : !x.done);
    const text = [x.title,x.category,x.source].join(" ").toLowerCase();
    return statusMatch && text.includes(q);
  });

  const box = $("items");
  box.replaceChildren();

  if(!shown.length){
    const p = document.createElement("div");
    p.className = "empty";
    p.textContent = items.length ? t("emptySearch") : t("empty");
    box.append(p);
    return;
  }

  shown.forEach(x => {
    const card = document.createElement("article");
    card.className = "item";

    const top = document.createElement("div");
    top.className = "itemtop";
    const left = document.createElement("div");
    const h = document.createElement("h3");
    h.textContent = x.title;

    const meta = document.createElement("div");
    meta.className = "meta";
    const categoryName = t(x.category || "other");
    const details = [categoryName];
    if(x.deadline) details.push(t("deadline") + ": " + x.deadline);
    if(x.source) details.push(t("source") + ": " + x.source);
    meta.textContent = details.join(" · ");

    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = x.done ? t("statusDone") : t("statusActive");

    left.append(h,meta);
    top.append(left,pill);
    card.append(top);

    if(x.url){
      const a = document.createElement("a");
      a.href = x.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = x.url;
      card.append(a);
    }

    const actions = document.createElement("div");
    actions.className = "actions";

    actions.append(makeButton(
      x.done ? t("markActive") : t("markDone"),
      "small",
      () => {
        const old = x.done;
        x.done = !x.done;
        if(!saveItems()) x.done = old;
        render();
      }
    ));

    actions.append(makeButton(
      t("delete"),"small danger",
      () => {
        if(!confirm(t("confirm"))) return;
        const previous = items;
        items = items.filter(y => y.id !== x.id);
        if(!saveItems()) items = previous;
        render();
      }
    ));

    card.append(actions);
    box.append(card);
  });
}

function setLang(next){
  lang = next;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i]").forEach(el => {
    const key = el.dataset.i;
    if(words[lang][key]) el.textContent = words[lang][key];
  });

  document.querySelectorAll("[data-ph]").forEach(el => {
    el.placeholder = t(el.dataset.ph);
  });

  $("langBtn").textContent = lang === "bn" ? "English" : "বাংলা";
  $("filter").setAttribute("aria-label", t("all"));
  render();
}

$("langBtn").addEventListener("click", () => {
  setLang(lang === "bn" ? "en" : "bn");
});

$("search").addEventListener("input", render);
$("filter").addEventListener("change", render);

$("addForm").addEventListener("submit", e => {
  e.preventDefault();
  hideMessage();

  const title = $("title").value.trim();
  const raw = $("url").value.trim();
  const url = raw ? safeUrl(raw) : "";

  if(!title) return;
  if(raw && !url){
    showMessage(t("invalidUrl"));
    return;
  }

  const opportunity = {
    id: Date.now().toString() + "-" +
      Math.random().toString(36).slice(2,8),
    title,
    category: $("category").value,
    deadline: $("deadline").value,
    source: $("source").value.trim(),
    url,
    done: false
  };

  items.unshift(opportunity);

  if(saveItems()){
    $("addForm").reset();
    render();
    showMessage(t("saved"));
  }else{
    items.shift();
    render();
    showMessage(t("notSaved"));
  }
});

loadItems();
setLang("bn");

if(!storageAvailable){
  showMessage(t("storageError"));
}
})();
