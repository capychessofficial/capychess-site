
    document.querySelectorAll('.capy-video').forEach(function (b) {
      b.addEventListener('click', function () {
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + b.dataset.yt + '?autoplay=1&rel=0&playsinline=1';
        f.title = b.getAttribute('aria-label');
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.allowFullscreen = true;
        f.className = 'capy-video__frame';
        b.replaceWith(f);
      }, { once: true });
    });
    
if(document.querySelector(".svc-dialog")){
const formats=[{"name": "Private lessons", "tag": "Online \u00b7 Onsite", "desc": "One-to-one coaching shaped around your pace, experience, and goals. Learn online or meet your teacher in person.", "points": ["Individual attention from your teacher", "A pace that matches your experience", "Choose online or onsite learning"]}, {"name": "Group lessons", "tag": "Seacon Square", "desc": "Learn with peers, share ideas, and put new skills into practice in a friendly, supportive setting.", "points": ["Practise with peers in a supportive environment", "Learn together at Seacon Square", "Follow a structured learning pathway"]}, {"name": "After-school program", "tag": "For schools", "desc": "Make chess part of the school day with lessons that help students begin, develop, and build their skills together.", "points": ["Chess lessons for school communities", "Group students by their experience", "Contact our team to discuss your school\u2019s needs"]}];const dialog=document.querySelector(".svc-dialog");document.querySelectorAll("[data-format]").forEach(button=>button.addEventListener("click",()=>{const f=formats[button.dataset.format];document.getElementById("detail-title").textContent=f.name;document.getElementById("detail-tag").textContent=f.tag;document.getElementById("detail-desc").textContent=f.desc;document.getElementById("detail-list").replaceChildren(...f.points.map(t=>{const li=document.createElement("li");li.textContent=t;return li}));dialog.showModal()}));document.querySelector(".svc-close").onclick=()=>dialog.close();dialog.addEventListener("click",e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});


}
document.querySelectorAll('.mobile-nav nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('.mobile-nav').forEach(d=>d.open=false)}));
// Keep previously shared preview hash links usable.
const legacy={home:'index.html',services:'services.html',teachers:'teachers.html',curriculum:'curriculum.html',about:'about.html','lesson-formats':'services.html#lesson-formats','teaching-team':'teachers.html#teaching-team','learning-stages':'curriculum.html#learning-stages','our-story':'about.html#our-story','co-founders':'about.html#co-founders'};
if(location.pathname.endsWith('/')||location.pathname.endsWith('/index.html')){const target=legacy[location.hash.slice(1)];if(target)location.replace(target);}
