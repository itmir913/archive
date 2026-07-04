"""
Naver 블로그 카테고리 페이지 HTML → 여러 포스트 Markdown 변환
--------------------------------------------------------------
사용법:
  1. 브라우저에서 비공개 Naver 블로그 포스트 페이지를 열고 소스 전체를 복사
  2. naver_pasted.html 파일에 붙여넣기
  3. 이 스크립트 실행: python naver_multi.py
  4. OUT_BASE 폴더에 {logNo}/index.md + images/ 생성됨
  5. 각 포스트를 src/content/itmir/{year}/naver-N/ 에 복사

설정 항목 (아래 CONFIG 섹션만 수정):
  HTML_FILE : 붙여넣은 HTML 파일 경로
  OUT_BASE  : 파싱 결과를 저장할 폴더
  BLOG_ID   : 블로그 아이디 (original_url 생성에 사용)
"""

import re, sys
from pathlib import Path
from html import unescape
import requests

# ── CONFIG ──────────────────────────────────────────────────────────
HTML_FILE = Path(__file__).parent / "naver_pasted.html"
OUT_BASE  = Path(__file__).parent / "naver_parsed"
BLOG_ID   = "whdghks913"
# ────────────────────────────────────────────────────────────────────

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36"}
session = requests.Session()
session.headers.update(HEADERS)


def download_image(url, dest_dir, idx):
    url_hq = re.sub(r'\?type=\w+', '?type=w966', url)
    for try_url in [url_hq, url]:
        try:
            r = session.get(try_url, timeout=20, stream=True)
            if r.status_code == 200:
                ct = r.headers.get("Content-Type", "")
                ext = ".png" if "png" in ct else ".gif" if "gif" in ct else ".jpg"
                fname = f"img_{idx:03d}{ext}"
                (dest_dir / fname).write_bytes(r.content)
                print(f"    이미지 {idx}: {fname} ({len(r.content):,} bytes)")
                return fname
        except Exception:
            pass
    print(f"    이미지 {idx}: 다운로드 실패 ({url[:60]})")
    return None


def _strip(html):
    return re.sub(r'<[^>]+>', '', unescape(html)).strip()


def parse_date(date_raw):
    dm = re.match(r'(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{1,2}):(\d{2})', date_raw.strip())
    if dm:
        y, mo, d, hh, mm = dm.groups()
        return f"{y}-{int(mo):02d}-{int(d):02d}T{int(hh):02d}:{mm}:00+09:00"
    dm2 = re.match(r'(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})', date_raw.strip())
    if dm2:
        y, mo, d = dm2.groups()
        return f"{y}-{int(mo):02d}-{int(d):02d}T00:00:00+09:00"
    return "2012-01-01T00:00:00+09:00"


def body_to_markdown(body_html, img_dir):
    img_count = [0]
    imgs_done = []

    def replace_img(m):
        attrs = m.group(0)
        lazy = re.search(r'data-lazy-src=["\']([^"\']+)["\']', attrs)
        src_m = re.search(r'\bsrc=["\']([^"\']+)["\']', attrs)
        url = unescape((lazy.group(1) if lazy else "") or (src_m.group(1) if src_m else ""))
        if not url or url.startswith("data:") or "blogimgs.pstatic.net/nblog" in url:
            return ""
        img_count[0] += 1
        fname = download_image(url, img_dir, img_count[0])
        if fname:
            imgs_done.append(fname)
            return f"![](./images/{fname})"
        return f"![image]({url})"

    body = re.sub(r'<img[^>]+>', replace_img, body_html)
    body = re.sub(r'<(?:video|iframe)[^>]*>.*?</(?:video|iframe)>', '\n[임베드 콘텐츠]\n', body, flags=re.DOTALL)
    body = re.sub(r'<strong[^>]*>(.*?)</strong>', lambda m: f"**{_strip(m.group(1))}**", body, flags=re.DOTALL)
    body = re.sub(r'<b[^>]*>(.*?)</b>', lambda m: f"**{_strip(m.group(1))}**", body, flags=re.DOTALL)
    body = re.sub(r'<em[^>]*>(.*?)</em>', lambda m: f"*{_strip(m.group(1))}*", body, flags=re.DOTALL)
    body = re.sub(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>',
                  lambda m: f"[{_strip(m.group(2))}]({unescape(m.group(1))})", body, flags=re.DOTALL)
    body = re.sub(r'<br\s*/?>', '\n', body)
    body = re.sub(r'<p[^>]*>', '\n', body)
    body = re.sub(r'</p>', '\n', body)
    body = re.sub(r'<div[^>]*>', '\n', body)
    body = re.sub(r'</div>', '\n', body)
    body = re.sub(r'<[^>]+>', '', body)
    body = unescape(body)
    body = re.sub(r'&nbsp;', ' ', body)
    body = re.sub(r'\n{3,}', '\n\n', body).strip()
    return body, imgs_done


if not HTML_FILE.exists():
    print(f"오류: {HTML_FILE} 파일이 없습니다.")
    print("브라우저에서 페이지 HTML을 복사해서 naver_pasted.html에 붙여넣으세요.")
    sys.exit(1)

html = HTML_FILE.read_text(encoding="utf-8")

view_areas = list(re.finditer(
    r'<div id="postViewArea">\s*<div id="post-view(\d+)"[^>]*>(.*?)</div>\s*</div>',
    html, re.DOTALL
))

if not view_areas:
    print("postViewArea를 찾을 수 없습니다.")
    sys.exit(1)

print(f"포스트 {len(view_areas)}개 발견\n")

for va in view_areas:
    log_no = va.group(1)
    body_html = va.group(2)

    preceding = html[max(0, va.start()-5000):va.start()]
    title_m = re.search(r'<span class="pcol1 itemSubjectBoldfont">([^<]+)</span>', preceding)
    title = unescape(title_m.group(1)).strip() if title_m else f"(제목없음 {log_no})"
    date_m = re.search(r'<span class="r _postAddDate">([^<]+)</span>', preceding)
    date_iso = parse_date(date_m.group(1)) if date_m else "2012-01-01T00:00:00+09:00"

    print(f"[{log_no}] {title} / {date_iso}")

    out_dir = OUT_BASE / log_no
    if out_dir.exists():
        print(f"  -> 이미 존재, 스킵\n")
        continue

    out_dir.mkdir(parents=True, exist_ok=True)
    img_dir = out_dir / "images"
    img_dir.mkdir(exist_ok=True)

    body, imgs = body_to_markdown(body_html, img_dir)

    if not imgs:
        img_dir.rmdir()

    fm = f"""---
title: "{title.replace('"', "'")}"
date: "{date_iso}"
category: ""
tags: []
description: ""
draft: false
original_url: "https://blog.naver.com/{BLOG_ID}/{log_no}"
---

"""
    (out_dir / "index.md").write_text(fm + body, encoding="utf-8")
    print(f"  -> 저장 완료 (이미지 {len(imgs)}개)\n")

print("완료")
print(f"결과: {OUT_BASE}")
