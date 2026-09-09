/* ===========================================================
   견적 신청 폼 → FormSubmit (프라임포스)
   -----------------------------------------------------------
   수신함: ookkoo12@naver.com  (다른 사이트와 동일 릴레이, 이미 인증됨)
   최초 1회는 FormSubmit 인증 메일 클릭이 필요합니다.
   =========================================================== */

const FORM_ENDPOINT = "https://formsubmit.co/ajax/ookkoo12@naver.com";

function _val(id){ const el = document.getElementById(id); return el ? String(el.value).trim() : ""; }

(function(){
  const form = document.getElementById("quoteForm");
  if(!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const focusErr = (id, msg) => { alert(msg); const el = document.getElementById(id); if(el) el.focus(); };
    if(!_val("q_name"))  return focusErr("q_name",  "이름 또는 상호를 입력해 주세요.");
    const phone = _val("q_phone").replace(/[^0-9]/g, "");
    if(phone.length < 10) return focusErr("q_phone", "연락처를 정확히 입력해 주세요.");
    if(!_val("q_biz"))   return focusErr("q_biz",   "업종을 선택해 주세요.");
    const items = [...document.querySelectorAll("#q_items input:checked")].map(cb => cb.value);
    if(!items.length){ alert("필요한 장비를 하나 이상 선택해 주세요."); return; }
    if(!document.getElementById("q_agree").checked){ alert("연락처 수집·이용에 동의해 주세요."); return; }

    const payload = {
      _subject: `[프라임포스] 견적신청 · ${_val("q_name")} (${_val("q_biz")})`,
      _template: "table",
      _captcha: "false",
      이름상호: _val("q_name"),
      연락처: _val("q_phone"),
      업종: _val("q_biz"),
      지역: _val("q_area"),
      필요장비: items.join(", "),
      도입방식: _val("q_mode"),
      희망시기: _val("q_when"),
      남길말: _val("q_memo"),
      접수페이지: location.pathname,
      접수시각: new Date().toLocaleString("ko-KR")
    };

    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.disabled = true; btn.textContent = "접수 중…";

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      });
      if(!res.ok) throw new Error("bad status " + res.status);
      document.getElementById("quoteOk").hidden = false;
      btn.textContent = "접수 완료 ✓";
      form.querySelectorAll("input,select,textarea").forEach(el => {
        if(el.type === "checkbox") el.checked = false;
        else if(el.tagName !== "BUTTON") el.value = "";
      });
    } catch(err){
      console.warn("[프라임포스] 폼 전송 실패:", err);
      alert("전송에 실패했습니다. 잠시 후 다시 시도하시거나 010-3131-5305 로 연락 주세요.");
      btn.disabled = false; btn.textContent = orig;
    }
  });
})();
