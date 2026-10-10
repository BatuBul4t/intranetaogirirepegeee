const view=document.getElementById("view");
const statusText=document.getElementById("statusText");
const addressInput=document.getElementById("addressInput");

const esc=value=>String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");

function setStatus(text){statusText.textContent=text}

function updateClock(){
    document.getElementById("clock").textContent=new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})
}
updateClock();
setInterval(updateClock,1000);

function route(name,data={}){
    if(name==="home") renderHome();
    if(name==="search") renderSearch(data.query||"");
    if(name==="article") renderArticle(data.id);
    if(name==="forum") renderForum(data.board||"");
    if(name==="thread") renderThread(data.id);
    if(name==="sites") renderSites();
    if(name==="history") renderHistory();
    if(name==="favorites") renderFavorites();
}

function renderHome(){
    addressInput.value="http://home.aogiri.local/";
    view.innerHTML=`
        <div class="search-hero">
            <div class="h1">AOGIRI NET 2001</div>
            <p>Portal local de pesquisa, fóruns e páginas arquivadas.</p>
            <div class="search-row">
                <input id="homeSearch" placeholder="Pesquisar na rede...">
                <button id="homeSearchBtn">Pesquisar</button>
            </div>
        </div>
        <div class="h2">Sites populares</div>
        <div class="site-grid">
            ${SITES.map(site=>`<div class="site-card"><h3><a href="${site.url}">${esc(site.name)}</a></h3><div class="small muted">${esc(site.description)}</div></div>`).join("")}
        </div>
        <div class="h2">Pesquisas recentes</div>
        ${getHistory().slice(0,10).map(item=>`<div class="history-item"><span class="linkish history-query">${esc(item.query)}</span><div class="small muted">${esc(item.engine)} · ${esc(item.date)}</div></div>`).join("")}
    `;
    document.getElementById("homeSearchBtn").onclick=()=>route("search",{query:document.getElementById("homeSearch").value});
    document.getElementById("homeSearch").onkeydown=e=>{if(e.key==="Enter") route("search",{query:e.target.value})};
    view.querySelectorAll(".history-query").forEach(el=>el.onclick=()=>route("search",{query:el.textContent}));
    setStatus("Página inicial carregada")
}

function renderSearch(initial=""){
    addressInput.value="http://search.aogiri.local/?q="+encodeURIComponent(initial);
    view.innerHTML=`
        <div class="h1">Pesquisar na Internet</div>
        <div class="search-row">
            <div style="flex:1;position:relative">
                <input id="searchBox" style="width:100%;padding:7px;border:2px inset #ddd" value="${esc(initial)}" autocomplete="off">
                <div id="suggestions"></div>
            </div>
            <button id="searchDo">Pesquisar</button>
        </div>
        <div id="searchResults"></div>
    `;
    const box=document.getElementById("searchBox");
    const sug=document.getElementById("suggestions");
    function refreshSuggestions(){
        const items=searchSuggestions(box.value);
        sug.className=items.length?"suggestions":"";
        sug.innerHTML=items.map(q=>`<div class="suggestion">${esc(q)}</div>`).join("");
        sug.querySelectorAll(".suggestion").forEach(el=>el.onclick=()=>{box.value=el.textContent;doSearch()})
    }
    function doSearch(){
        const q=box.value.trim();
        addHistory(q,"Aogiri Search");
        const results=searchArticles(q);
        document.getElementById("searchResults").innerHTML=`
            <p class="small muted">${results.length} resultado(s) no índice local.</p>
            ${results.map(a=>`
                <div class="result">
                    <h3 data-id="${esc(a.id)}">${esc(a.title)}</h3>
                    <div class="url">http://archive.aogiri.local/articles/${esc(a.id)}.html</div>
                    <div class="meta">${esc(a.site)} · ${esc(a.date)} · ${esc(a.category)}</div>
                    <p>${esc(a.summary)}</p>
                </div>
            `).join("") || `<div class="panel"><b>Nenhum resultado encontrado.</b><p>O índice simulado de 2001 não encontrou páginas para esta consulta.</p></div>`}
        `;
        document.querySelectorAll(".result h3").forEach(el=>el.onclick=()=>route("article",{id:el.dataset.id}));
        sug.innerHTML="";
        sug.className="";
        addressInput.value="http://search.aogiri.local/?q="+encodeURIComponent(q);
        setStatus("Pesquisa concluída")
    }
    box.oninput=refreshSuggestions;
    box.onkeydown=e=>{if(e.key==="Enter")doSearch()};
    document.getElementById("searchDo").onclick=doSearch;
    if(initial) doSearch();
    else refreshSuggestions()
}

function renderArticle(id){
    const a=ARTICLES.find(item=>item.id===id);
    if(!a){view.innerHTML="<h1>404</h1><p>Documento não encontrado.</p>";return}
    addressInput.value="http://archive.aogiri.local/articles/"+a.id+".html";
    const fav=getFavorites().includes(a.id);
    view.innerHTML=`
        <div class="h1">${esc(a.title)}</div>
        <div class="small muted">${esc(a.site)} · ${esc(a.date)} · ${esc(a.category)}</div>
        <hr class="sep">
        <p style="line-height:1.7;white-space:pre-wrap">${esc(a.body)}</p>
        <div>${(a.keywords||[]).map(k=>`<span class="tag">${esc(k)}</span>`).join("")}</div>
        <hr class="sep">
        <button id="favArticle">${fav?"Remover dos favoritos":"Adicionar aos favoritos"}</button>
    `;
    document.getElementById("favArticle").onclick=()=>{toggleFavorite(a.id);renderArticle(a.id)};
    setStatus("Documento carregado")
}

function renderSites(){
    addressInput.value="http://directory.aogiri.local/sites/";
    view.innerHTML=`
        <div class="h1">Diretório de Sites</div>
        <div class="site-grid">${SITES.map(site=>`
            <div class="site-card">
                <h3><a href="${site.url}">${esc(site.name)}</a></h3>
                <div class="small muted">${esc(site.year)}</div>
                <p>${esc(site.description)}</p>
            </div>`).join("")}
        </div>`;
    setStatus("Diretório carregado")
}

function renderHistory(){
    addressInput.value="http://history.aogiri.local/";
    const history=getHistory();
    view.innerHTML=`
        <div class="h1">Histórico de pesquisa</div>
        <button id="clearHistory">Limpar histórico local</button>
        <div>${history.map(item=>`<div class="history-item"><span class="linkish history-query">${esc(item.query)}</span><div class="small muted">${esc(item.engine)} · ${esc(item.date)}</div></div>`).join("")}</div>
    `;
    view.querySelectorAll(".history-query").forEach(el=>el.onclick=()=>route("search",{query:el.textContent}));
    document.getElementById("clearHistory").onclick=()=>{Store.set("aogiri.history",[]);renderHistory()};
    setStatus(history.length+" item(ns) no histórico")
}

function renderFavorites(){
    addressInput.value="http://favorites.aogiri.local/";
    const favs=getFavorites().map(id=>ARTICLES.find(a=>a.id===id)).filter(Boolean);
    view.innerHTML=`<div class="h1">Favoritos</div>${favs.length?favs.map(a=>`<div class="result"><h3 data-id="${a.id}">${esc(a.title)}</h3><p>${esc(a.summary)}</p></div>`).join(""):"<p>Nenhum favorito salvo.</p>"}`;
    view.querySelectorAll(".result h3").forEach(el=>el.onclick=()=>route("article",{id:el.dataset.id}));
    setStatus("Favoritos carregados")
}

function renderForum(board=""){
    addressInput.value="http://www.2ch.net/"+(board||"");
    const boards=FORUM_BOARDS;
    const threads=allThreads().filter(t=>!board||t.board===board);
    view.innerHTML=`
        <div class="forum-head">
            <div class="h1">2channel mirror</div>
            <div class="small">Fórum de texto anônimo simulado</div>
        </div>
        <div style="margin:10px 0">${boards.map(b=>`<button class="boardBtn" data-board="${b.id}">${esc(b.name)}</button>`).join(" ")}</div>
        <div>${threads.map(t=>`<div class="thread"><div class="post"><b class="linkish threadLink" data-id="${t.id}">#${t.id} ${esc(t.title)}</b><div class="small muted">${t.posts.length} resposta(s)</div></div></div>`).join("")}</div>
        <div class="forum-form">
            <b>Criar nova thread</b>
            <p><select id="newBoard">${boards.map(b=>`<option value="${b.id}" ${b.id===board?"selected":""}>${esc(b.name)}</option>`).join("")}</select></p>
            <p><input id="newTitle" placeholder="Título" style="width:100%;padding:6px"></p>
            <textarea id="newText" class="forum-input" placeholder="Mensagem"></textarea>
            <p><button id="newThreadBtn">Postar como 名無しさん</button></p>
        </div>
    `;
    view.querySelectorAll(".boardBtn").forEach(el=>el.onclick=()=>renderForum(el.dataset.board));
    view.querySelectorAll(".threadLink").forEach(el=>el.onclick=()=>route("thread",{id:el.dataset.id}));
    document.getElementById("newThreadBtn").onclick=()=>{
        const id=createThread(document.getElementById("newBoard").value,document.getElementById("newTitle").value,document.getElementById("newText").value);
        route("thread",{id})
    };
    setStatus("2channel carregado")
}

function renderThread(id){
    const t=allThreads().find(item=>String(item.id)===String(id));
    if(!t){view.innerHTML="<h1>Thread não encontrada</h1>";return}
    addressInput.value="http://www.2ch.net/test/read.cgi/"+t.board+"/"+t.id+"/";
    view.innerHTML=`
        <div class="forum-head"><b>${esc(t.title)}</b></div>
        <div class="thread">${t.posts.map(p=>`
            <div class="post">
                <div class="post-head">${p.id} 名前：${esc(p.author)} <span class="post-id">${esc(p.date)}</span></div>
                <div>${esc(p.text)}</div>
            </div>`).join("")}
        </div>
        <div class="forum-form">
            <b>Responder</b>
            <textarea id="replyText" class="forum-input"></textarea>
            <p><button id="replyBtn">Enviar</button> <button id="backForum">Voltar ao board</button></p>
        </div>
    `;
    document.getElementById("replyBtn").onclick=()=>{const text=document.getElementById("replyText").value;if(text.trim()){replyThread(t.id,text);renderThread(t.id)}};
    document.getElementById("backForum").onclick=()=>renderForum(t.board);
    setStatus("Thread #"+t.id)
}

document.querySelectorAll(".side-link").forEach(btn=>btn.onclick=()=>route(btn.dataset.route));
document.getElementById("homeBtn").onclick=()=>route("home");
document.getElementById("historyBtn").onclick=()=>route("history");
document.getElementById("favoritesBtn").onclick=()=>route("favorites");
document.getElementById("refreshBtn").onclick=()=>location.reload();
document.getElementById("stopBtn").onclick=()=>setStatus("Carregamento interrompido");
document.getElementById("backBtn").onclick=()=>history.back();
document.getElementById("forwardBtn").onclick=()=>history.forward();
document.getElementById("goBtn").onclick=()=>{const value=addressInput.value.trim();if(value.includes("2ch"))route("forum");else if(value.includes("search"))route("search");else route("home")};
addressInput.onkeydown=e=>{if(e.key==="Enter")document.getElementById("goBtn").click()};
route("home");