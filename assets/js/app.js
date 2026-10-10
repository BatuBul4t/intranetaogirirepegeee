const view=document.getElementById("view");
const statusText=document.getElementById("statusText");
const addressInput=document.getElementById("addressInput");
const onlineCount=document.getElementById("onlineCount");
let activeRealtimeChannel=null;

const esc=value=>String(value??"")
    .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
    .replaceAll('"',"&quot;").replaceAll("'","&#039;");

function fmtDate(value){
    try{return new Date(value).toLocaleString("pt-BR")}catch(e){return String(value)}
}

function setStatus(text){statusText.textContent=text}

function clearRealtime(){
    if(activeRealtimeChannel){
        sb.removeChannel(activeRealtimeChannel);
        activeRealtimeChannel=null;
    }
}

function updateClock(){
    document.getElementById("clock").textContent=new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})
}
updateClock();
setInterval(updateClock,1000);
startPresence(count=>onlineCount.textContent=count);

function pushHash(path){
    if(location.hash!=="#"+path) location.hash=path;
}

function route(path){
    clearRealtime();
    const clean=(path||"home").replace(/^#/,"");
    const [page,arg]=clean.split("/");
    if(page==="home") return renderHome();
    if(page==="search") return renderSearch(decodeURIComponent(arg||""));
    if(page==="article") return renderArticle(arg);
    if(page==="ccg") return renderCCG(decodeURIComponent(arg||""));
    if(page==="publish") return renderPublishArticle();
    if(page==="community") return renderCommunityArticles();
    if(page==="community-article") return renderCommunityArticle(arg);
    if(page==="forum") return renderForum(arg||"");
    if(page==="chat") return renderTemporaryChat();
    if(page==="thread") return renderThread(arg);
    if(page==="sites") return renderSites();
    if(page==="history") return renderHistory();
    return renderHome();
}

function renderHome(){
    addressInput.value="http://home.aogiri.local/";
    view.innerHTML=`
      <div class="search-hero">
        <div class="h1">AOGIRI NET 2001</div>
        <div class="small mono">INTERNAL GATEWAY 04 :: ARCHIVE ONLINE :: <span class="blink">█</span></div>
        <p>Pesquisa, arquivo CCG, fórum anônimo global e páginas arquivadas.</p>
        <div class="search-row">
          <input id="homeSearch" placeholder="Pesquisar na rede...">
          <button id="homeSearchBtn">Pesquisar</button>
        </div>
      </div>

      <div class="h2">Acesso rápido</div>
      <div class="grid">
        <div class="card"><h3><a href="#ccg">Arquivo CCG</a></h3><p>${ARTICLES.filter(a=>a.id.startsWith("ccg-")).length} documentos indexados.</p></div>
        <div class="card"><h3><a href="#publish">Publicar Artigo</a></h3><p>Crie um artigo compartilhado para todos os visitantes.</p></div>
        <div class="card"><h3><a href="#community">Artigos da Comunidade</a></h3><p>Veja publicações enviadas em tempo real.</p></div>
        <div class="card"><h3><a href="#forum/ccg">2channel / CCG</a></h3><p>Fórum compartilhado via Supabase Realtime.</p></div>
        <div class="card"><h3><a href="#chat">Chat Temporário</a></h3><p>Conversa pública em tempo real. Mensagens expiram em 30 minutos.</p></div>
        <div class="card"><h3><a href="#forum/occult">Ocultismo</a></h3><p>Rumores, relatos noturnos e teorias.</p></div>
        <div class="card"><h3><a href="#search/Projeto%20Senkii">Projeto Senkii</a></h3><p>Pesquisar entradas relacionadas no índice.</p></div>
      </div>

      <div class="h2">Arquivo em destaque</div>
      ${ARTICLES.filter(a=>a.id.startsWith("ccg-")).slice(24,32).map(a=>`
        <div class="result"><h3 data-article="${a.id}">${esc(a.title)}</h3>
        <div class="meta">${esc(a.site)} · ${esc(a.date)}</div><p>${esc(a.summary)}</p></div>
      `).join("")}
    `;
    document.getElementById("homeSearchBtn").onclick=()=>pushHash("search/"+encodeURIComponent(document.getElementById("homeSearch").value));
    document.getElementById("homeSearch").onkeydown=e=>{if(e.key==="Enter")document.getElementById("homeSearchBtn").click()};
    view.querySelectorAll("[data-article]").forEach(el=>el.onclick=()=>pushHash("article/"+el.dataset.article));
    setStatus("Página inicial carregada")
}

function renderSearch(initial=""){
    addressInput.value="http://search.aogiri.local/?q="+encodeURIComponent(initial);
    const categories=[...new Set(ARTICLES.map(a=>a.category))].sort();
    view.innerHTML=`
      <div class="h1">Pesquisar na Internet</div>
      <div class="search-row">
        <div style="position:relative;flex:1">
          <input id="searchBox" style="width:100%" value="${esc(initial)}" autocomplete="off">
          <div id="suggestions"></div>
        </div>
        <select id="searchCategory"><option value="">Tudo</option>${categories.map(c=>`<option>${esc(c)}</option>`).join("")}</select>
        <button id="searchDo">Pesquisar</button>
      </div>
      <div id="searchResults"></div>`;
    const box=document.getElementById("searchBox");
    const sug=document.getElementById("suggestions");
    function refreshSuggestions(){
        const items=getSuggestions(box.value);
        sug.className=items.length?"suggestions":"";
        sug.innerHTML=items.map(q=>`<div class="suggestion">${esc(q)}</div>`).join("");
        sug.querySelectorAll(".suggestion").forEach(el=>el.onclick=()=>{box.value=el.textContent;run()})
    }
    function run(){
        const q=box.value.trim();
        const cat=document.getElementById("searchCategory").value;
        if(q){
            const hist=JSON.parse(localStorage.getItem("aogiri.history")||"[]");
            hist.unshift({query:q,date:new Date().toLocaleString("pt-BR")});
            localStorage.setItem("aogiri.history",JSON.stringify(hist.slice(0,200)));
        }
        const results=searchArticles(q,cat);
        document.getElementById("searchResults").innerHTML=`
          <p class="small muted">${results.length} resultado(s).</p>
          ${results.map(a=>`
            <div class="result">
              <h3 data-article="${a.id}">${esc(a.title)}</h3>
              <div class="url">http://archive.aogiri.local/${esc(a.id)}.html</div>
              <div class="meta">${esc(a.site)} · ${esc(a.date)} · ${esc(a.category)}</div>
              <p>${esc(a.summary)}</p>
            </div>`).join("") || `<div class="notice">Nenhum resultado encontrado no índice de 2001.</div>`}`;
        document.querySelectorAll("[data-article]").forEach(el=>el.onclick=()=>pushHash("article/"+el.dataset.article));
        sug.className="";sug.innerHTML="";
        setStatus("Pesquisa concluída")
    }
    box.oninput=refreshSuggestions;
    box.onkeydown=e=>{if(e.key==="Enter")run()};
    document.getElementById("searchDo").onclick=run;
    document.getElementById("searchCategory").onchange=run;
    if(initial) run()
}

async function renderArticle(id){
    const a=ARTICLES.find(x=>x.id===id);
    if(!a){view.innerHTML="<div class='errorbox'>404 - Documento não encontrado.</div>";return}
    addressInput.value="http://archive.aogiri.local/"+a.id+".html";
    view.innerHTML=`
      <div class="${a.id.startsWith("ccg-")?"ccg-header":""}">
        <div class="h1">${esc(a.title)}</div>
        <div class="small">${esc(a.site)} · ${esc(a.date)} · ${esc(a.category)}</div>
      </div>
      <p style="white-space:pre-wrap;line-height:1.65">${esc(a.body)}</p>
      <div>${(a.keywords||[]).map(k=>`<span class="tag">${esc(k)}</span>`).join("")}</div>
      <div class="comments">
        <div class="h2">Comentários do arquivo</div>
        <div class="small muted">Comentários são compartilhados em tempo real. Você aparece como <b>${esc(ANON_ID)}</b>.</div>
        <div id="commentsList"><p class="small">Carregando...</p></div>
        <div class="forum-form">
          <textarea id="commentText" class="forum-input" maxlength="2500" placeholder="Adicionar comentário anônimo..."></textarea>
          <button id="commentBtn" class="retro-btn">Enviar comentário</button>
        </div>
      </div>`;
    async function refresh(){
        try{
            const comments=await loadComments(a.id);
            document.getElementById("commentsList").innerHTML=comments.length?comments.map(c=>`
              <div class="comment"><b>${esc(c.anon_id)}</b> <span class="tiny muted">${esc(fmtDate(c.created_at))}</span>
              <div>${esc(c.content)}</div></div>`).join(""):"<p class='small muted'>Nenhum comentário ainda.</p>";
        }catch(err){
            document.getElementById("commentsList").innerHTML="<div class='errorbox'>Banco ainda não configurado. Execute sql/setup.sql no Supabase.</div>"
        }
    }
    await refresh();
    document.getElementById("commentBtn").onclick=async()=>{
        const text=document.getElementById("commentText").value.trim();
        if(!text)return;
        try{await createComment(a.id,text);document.getElementById("commentText").value=""}
        catch(err){alert("Não foi possível enviar. Confira o setup do Supabase.")}
    };
    activeRealtimeChannel=subscribeComments(a.id,()=>refresh());
    setStatus("Documento aberto")
}

function renderCCG(filter=""){
    addressInput.value="http://archive.ccg.go.jp/index.asp";
    const cats=[...new Set(ARTICLES.filter(a=>a.id.startsWith("ccg-")).map(a=>a.category))].sort();
    const items=ARTICLES.filter(a=>a.id.startsWith("ccg-") && (!filter||a.category===filter));
    view.innerHTML=`
      <div class="ccg-header">
        <div class="h1">CCG DIGITAL ARCHIVE</div>
        <div class="small">COMMISSION OF COUNTER GHOUL :: MIRROR 2001 :: ACCESS LEVEL: PUBLIC/RECOVERED</div>
      </div>
      <div class="notice">Este arquivo é ficcional e faz parte do cenário do site.</div>
      <div class="ccg-nav"><button class="retro-btn ccgCat" data-cat="">Todos (${ARTICLES.filter(a=>a.id.startsWith("ccg-")).length})</button>
      ${cats.map(c=>`<button class="retro-btn ccgCat" data-cat="${esc(c)}">${esc(c)}</button>`).join("")}</div>
      <div class="ccg-list">
        ${items.map(a=>`<div class="ccg-row">
          <span class="mono">${esc(a.id.toUpperCase())}</span>
          <span class="linkish" data-article="${a.id}">${esc(a.title)}</span>
          <span>${esc(a.category)}</span>
        </div>`).join("")}
      </div>`;
    view.querySelectorAll(".ccgCat").forEach(el=>el.onclick=()=>pushHash("ccg/"+encodeURIComponent(el.dataset.cat)));
    view.querySelectorAll("[data-article]").forEach(el=>el.onclick=()=>pushHash("article/"+el.dataset.article));
    setStatus(items.length+" registros CCG")
}

function renderSeedForum(board){
    const rows=SEED_THREADS.filter(t=>!board||t.board===board);
    return rows.map((t,i)=>`
      <div class="thread-line">
        <b>${esc(t.title)}</b>
        <div class="tiny muted">arquivo local · ${t.posts.length} respostas</div>
        ${t.posts.slice(0,2).map((p,j)=>`<div class="tiny" style="margin-top:4px">${j+1} 名前：名無しさん — ${esc(p)}</div>`).join("")}
      </div>`).join("")
}

async function renderForum(board=""){
    addressInput.value="http://www.2ch.net/"+(board||"");
    view.innerHTML=`
      <div class="forum-head">
        <div class="h1">２ちゃんねる / Aogiri Mirror</div>
        <div class="small"><span class="online-dot"></span><span id="forumOnline">${onlineCount.textContent}</span> online · seu ID: ${esc(ANON_ID)}</div>
      </div>
      <div class="forum-layout">
        <div class="board-list">
          <b>Boards</b>
          <div class="board-link" data-board="">Todas</div>
          ${FORUM_BOARDS.map(b=>`<div class="board-link" data-board="${b.id}">${esc(b.name)}<div class="tiny muted">${esc(b.description)}</div></div>`).join("")}
        </div>
        <div>
          <div id="globalThreads"><p class="small">Conectando ao servidor...</p></div>
          <div class="h2">Threads arquivadas do cenário</div>
          <div class="thread-list">${renderSeedForum(board)}</div>
          <div class="forum-form">
            <b>Nova thread global</b>
            <p><select id="newBoard">${FORUM_BOARDS.map(b=>`<option value="${b.id}" ${b.id===board?"selected":""}>${esc(b.name)}</option>`).join("")}</select></p>
            <input id="newTitle" maxlength="140" placeholder="Título" style="width:100%;padding:6px">
            <textarea id="newPost" maxlength="4000" class="forum-input" placeholder="Mensagem"></textarea>
            <button id="newThreadBtn" class="retro-btn">Postar como ${esc(ANON_ID)}</button>
          </div>
        </div>
      </div>`;
    document.getElementById("forumOnline").textContent=onlineCount.textContent;
    view.querySelectorAll(".board-link").forEach(el=>el.onclick=()=>pushHash("forum/"+el.dataset.board));

    async function refresh(){
        try{
            const rows=await loadThreads(board);
            document.getElementById("globalThreads").innerHTML=`
              <div class="h2">Threads globais em tempo real</div>
              <div class="thread-list">${rows.length?rows.map(t=>`
                <div class="thread-line" data-thread="${t.id}">
                  <b>${esc(t.title)}</b>
                  <div class="tiny muted">#${t.id} · ${esc(t.anon_id)} · ${t.reply_count} post(s) · bump ${esc(fmtDate(t.last_post_at))}</div>
                </div>`).join(""):"<div class='thread-line'>Nenhuma thread global neste board ainda.</div>"}</div>`;
            document.querySelectorAll("[data-thread]").forEach(el=>el.onclick=()=>pushHash("thread/"+el.dataset.thread));
        }catch(err){
            document.getElementById("globalThreads").innerHTML="<div class='errorbox'><b>Banco não configurado.</b><br>Abra o Supabase SQL Editor e execute o arquivo <span class='mono'>sql/setup.sql</span>.</div>";
        }
    }
    await refresh();
    document.getElementById("newThreadBtn").onclick=async()=>{
        const title=document.getElementById("newTitle").value.trim();
        const content=document.getElementById("newPost").value.trim();
        const newBoard=document.getElementById("newBoard").value;
        if(!title||!content)return alert("Preencha título e mensagem.");
        try{
            const thread=await createGlobalThread(newBoard,title,content);
            pushHash("thread/"+thread.id)
        }catch(err){alert("Falha ao criar thread. Execute sql/setup.sql no Supabase e tente novamente.")}
    };
    activeRealtimeChannel=subscribeBoard(board,()=>refresh());
    setStatus("Fórum global conectado")
}

function postText(text){
    return esc(text).replace(/&gt;&gt;(\d+)/g,'<span class="post-ref" data-ref="$1">&gt;&gt;$1</span>').replace(/\n/g,"<br>")
}

async function renderThread(id){
    addressInput.value="http://www.2ch.net/test/read.cgi/aogiri/"+id+"/";
    view.innerHTML="<p>Carregando thread...</p>";
    try{
        const {data:thread,error}=await sb.from("forum_threads").select("*").eq("id",id).single();
        if(error)throw error;
        const posts=await loadPosts(id);
        view.innerHTML=`
          <div class="forum-head"><b>#${thread.id} ${esc(thread.title)}</b>
          <div class="tiny">${esc(thread.board)} · iniciado por ${esc(thread.anon_id)}</div></div>
          <div id="postsBox" class="thread"></div>
          <div class="forum-form">
            <b>Responder como ${esc(ANON_ID)}</b>
            <textarea id="replyText" maxlength="4000" class="forum-input"></textarea>
            <button id="replyBtn" class="retro-btn">Enviar resposta</button>
            <button id="backBoard" class="retro-btn">Voltar ao board</button>
          </div>`;
        function draw(rows){
            document.getElementById("postsBox").innerHTML=rows.map((p,index)=>`
              <div class="post" id="post-${p.id}">
                <div class="post-head">${index+1} 名前：${esc(p.anon_id)} <span class="tiny muted">${esc(fmtDate(p.created_at))} ID:${p.id}</span></div>
                <div>${postText(p.content)}</div>
              </div>`).join("");
            document.querySelectorAll(".post-ref").forEach(el=>el.onclick=()=>{
                const target=document.querySelector("#post-"+el.dataset.ref);
                if(target)target.scrollIntoView({behavior:"smooth",block:"center"})
            });
        }
        draw(posts);
        document.getElementById("replyBtn").onclick=async()=>{
            const text=document.getElementById("replyText").value.trim();
            if(!text)return;
            try{
                await createGlobalPost(id,text);
                document.getElementById("replyText").value=""
            }catch(err){alert("Não foi possível enviar a resposta.")}
        };
        document.getElementById("backBoard").onclick=()=>pushHash("forum/"+thread.board);
        activeRealtimeChannel=subscribeThread(id,async()=>draw(await loadPosts(id)));
        setStatus("Thread #"+id+" conectada em tempo real")
    }catch(err){
        view.innerHTML="<div class='errorbox'>Thread não encontrada ou banco ainda não configurado.</div>"
    }
}


async function renderCommunityArticles(){
    addressInput.value="http://archive.aogiri.local/community/";
    view.innerHTML=`
      <div class="h1">Artigos da Comunidade</div>
      <div class="notice">Publicações feitas por visitantes aparecem aqui para todo mundo em tempo real.</div>
      <p><button id="openPublish" class="retro-btn">Publicar novo artigo</button></p>
      <div id="communityList"><p class="small">Carregando publicações...</p></div>`;
    document.getElementById("openPublish").onclick=()=>pushHash("publish");

    async function refresh(){
        try{
            const rows=await loadCommunityArticles();
            document.getElementById("communityList").innerHTML=rows.length?rows.map(a=>`
              <div class="result">
                <h3 data-community-id="${a.id}">${esc(a.title)}</h3>
                <div class="url">http://archive.aogiri.local/community/${a.id}.html</div>
                <div class="meta">${esc(a.source_name)} · ${esc(a.date_label)} · ${esc(a.category)} · por ${esc(a.anon_id)}</div>
                <p>${esc(a.summary)}</p>
                <div>${(a.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
              </div>`).join(""):"<p class='small muted'>Ainda não há artigos publicados pela comunidade.</p>";
            view.querySelectorAll("[data-community-id]").forEach(el=>el.onclick=()=>pushHash("community-article/"+el.dataset.communityId));
        }catch(err){
            document.getElementById("communityList").innerHTML="<div class='errorbox'><b>Banco ainda não configurado para artigos comunitários.</b><br>Execute novamente <span class='mono'>sql/setup.sql</span> no Supabase.</div>";
        }
    }

    await refresh();
    activeRealtimeChannel=subscribeCommunityArticles(()=>refresh());
    setStatus("Artigos comunitários em tempo real");
}

function renderPublishArticle(){
    addressInput.value="http://archive.aogiri.local/community/new.asp";
    view.innerHTML=`
      <div class="h1">Publicar Artigo</div>
      <div class="notice">O artigo ficará visível para todos os visitantes. Seu identificador público será <b>${esc(ANON_ID)}</b>.</div>
      <div class="forum-form">
        <p><b>Título</b><br><input id="pubTitle" maxlength="180" style="width:100%;padding:7px"></p>
        <p><b>Categoria</b><br>
          <select id="pubCategory">
            <option>Comunidade</option>
            <option>CCG</option>
            <option>Notícias</option>
            <option>Rumores</option>
            <option>Tecnologia</option>
            <option>Vida prática</option>
            <option>Cultura</option>
            <option>Pesquisa</option>
            <option>Arquivo</option>
          </select>
        </p>
        <p><b>Fonte / site</b><br><input id="pubSource" maxlength="120" value="Arquivo Comunitário" style="width:100%;padding:7px"></p>
        <p><b>Data mostrada no artigo</b><br><input id="pubDate" maxlength="40" value="2001" style="width:100%;padding:7px"></p>
        <p><b>Resumo</b><br><textarea id="pubSummary" maxlength="600" class="forum-input" style="min-height:70px"></textarea></p>
        <p><b>Conteúdo</b><br><textarea id="pubBody" maxlength="12000" class="forum-input" style="min-height:260px"></textarea></p>
        <p><b>Tags</b> <span class="tiny muted">separadas por vírgula</span><br><input id="pubTags" maxlength="500" placeholder="ccg, distrito 20, rumor" style="width:100%;padding:7px"></p>
        <button id="publishArticleBtn" class="retro-btn">PUBLICAR PARA TODOS</button>
        <button id="cancelPublishBtn" class="retro-btn">Cancelar</button>
        <div id="publishStatus" class="small" style="margin-top:10px"></div>
      </div>`;
    document.getElementById("cancelPublishBtn").onclick=()=>pushHash("community");
    document.getElementById("publishArticleBtn").onclick=async()=>{
        const title=document.getElementById("pubTitle").value.trim();
        const summary=document.getElementById("pubSummary").value.trim();
        const body=document.getElementById("pubBody").value.trim();
        if(!title||!summary||!body){
            document.getElementById("publishStatus").innerHTML="<span class='danger'>Preencha título, resumo e conteúdo.</span>";
            return;
        }
        const button=document.getElementById("publishArticleBtn");
        button.disabled=true;
        document.getElementById("publishStatus").textContent="Publicando...";
        try{
            const article=await createCommunityArticle({
                title,
                category:document.getElementById("pubCategory").value,
                source_name:document.getElementById("pubSource").value.trim()||"Arquivo Comunitário",
                date_label:document.getElementById("pubDate").value.trim()||"2001",
                summary,
                body,
                tags:document.getElementById("pubTags").value.split(",").map(x=>x.trim()).filter(Boolean).slice(0,20)
            });
            pushHash("community-article/"+article.id);
        }catch(err){
            button.disabled=false;
            document.getElementById("publishStatus").innerHTML="<span class='danger'>Falha ao publicar. Execute o setup.sql atualizado no Supabase.</span>";
        }
    };
    setStatus("Editor de artigo aberto");
}

async function renderCommunityArticle(id){
    addressInput.value="http://archive.aogiri.local/community/"+id+".html";
    view.innerHTML="<p>Carregando artigo...</p>";
    try{
        const a=await loadCommunityArticle(id);
        view.innerHTML=`
          <div class="ccg-header">
            <div class="h1">${esc(a.title)}</div>
            <div class="small">${esc(a.source_name)} · ${esc(a.date_label)} · ${esc(a.category)} · publicado por ${esc(a.anon_id)}</div>
          </div>
          <p style="white-space:pre-wrap;line-height:1.7">${esc(a.body)}</p>
          <div>${(a.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
          <hr class="sep">
          <div class="small muted">Publicado no banco global em ${esc(fmtDate(a.created_at))}.</div>
          <p><button id="backCommunity" class="retro-btn">Voltar aos artigos da comunidade</button></p>`;
        document.getElementById("backCommunity").onclick=()=>pushHash("community");
        setStatus("Artigo comunitário aberto");
    }catch(err){
        view.innerHTML="<div class='errorbox'>Artigo não encontrado ou banco ainda não configurado.</div>";
    }
}



function getTemporaryChatName(){
    return sessionStorage.getItem("aogiri.chat.name")||"";
}

function setTemporaryChatName(name){
    sessionStorage.setItem("aogiri.chat.name",name);
}

function validChatName(name){
    return /^[^<>]{1,32}$/.test(name.trim());
}

async function renderTemporaryChat(){
    addressInput.value="http://chat.aogiri.local/public/";
    let chatName=getTemporaryChatName();

    view.innerHTML=`
      <div class="h1">Chat Temporário Público</div>
      <div class="notice">Este chat é separado do nickname/ID do fórum. Você escolhe um nome só para esta sessão. As mensagens expiram após aproximadamente 30 minutos.</div>
      <div id="chatNameSetup" class="${chatName?"hidden":""}">
        <div class="forum-form">
          <b>Escolha seu nome para o chat</b>
          <p><input id="chatNameInput" maxlength="32" placeholder="Ex.: Anonymous17" style="width:100%;padding:7px"></p>
          <button id="chatNameBtn" class="retro-btn">Entrar no chat</button>
        </div>
      </div>
      <div id="chatMain" class="${chatName?"":"hidden"}" style="height:calc(100% - 85px)">
        <div class="chat-wrap">
          <div class="chat-top">
            <span><span class="online-dot"></span><b id="chatOnline">${onlineCount.textContent}</b> online</span>
            <span>Nome no chat: <b id="currentChatName">${esc(chatName)}</b></span>
            <button id="changeChatName" class="retro-btn">Trocar nome</button>
          </div>
          <div id="chatLog" class="chat-log"><div class="chat-empty">Conectando...</div></div>
          <div class="chat-compose">
            <input id="chatMessageInput" maxlength="800" autocomplete="off" placeholder="Digite uma mensagem...">
            <button id="chatSendBtn" class="retro-btn">Enviar</button>
          </div>
        </div>
      </div>`;

    const setup=document.getElementById("chatNameSetup");
    const main=document.getElementById("chatMain");

    function enterWithName(){
        const input=document.getElementById("chatNameInput");
        const name=(input?.value||"").trim();
        if(!validChatName(name)){
            alert("Escolha um nome de 1 a 32 caracteres.");
            return;
        }
        setTemporaryChatName(name);
        renderTemporaryChat();
    }

    const nameBtn=document.getElementById("chatNameBtn");
    if(nameBtn) nameBtn.onclick=enterWithName;
    const nameInput=document.getElementById("chatNameInput");
    if(nameInput) nameInput.onkeydown=e=>{if(e.key==="Enter")enterWithName()};

    if(!chatName){
        setStatus("Aguardando nome do chat");
        return;
    }

    document.getElementById("changeChatName").onclick=()=>{
        sessionStorage.removeItem("aogiri.chat.name");
        renderTemporaryChat();
    };

    async function draw(){
        try{
            const rows=await loadTemporaryChatMessages();
            const log=document.getElementById("chatLog");
            log.innerHTML=rows.length?rows.map(m=>{
                const exp=Math.max(0,Math.ceil((new Date(m.expires_at)-Date.now())/60000));
                return `<div class="chat-msg">
                  <span class="chat-name">${esc(m.chat_name)}</span>
                  <span class="chat-time">${esc(fmtDate(m.created_at))}</span>
                  <span class="chat-expire">· expira em ~${exp} min</span>
                  <div>${esc(m.content)}</div>
                </div>`;
            }).join(""):`<div class="chat-empty">Nenhuma mensagem ativa. Seja o primeiro a falar.</div>`;
            log.scrollTop=log.scrollHeight;
        }catch(err){
            document.getElementById("chatLog").innerHTML="<div class='errorbox'>Chat ainda não configurado no Supabase. Execute novamente sql/setup.sql.</div>";
        }
    }

    async function send(){
        const input=document.getElementById("chatMessageInput");
        const text=input.value.trim();
        if(!text)return;
        const button=document.getElementById("chatSendBtn");
        button.disabled=true;
        try{
            await sendTemporaryChatMessage(chatName,text);
            input.value="";
            input.focus();
        }catch(err){
            alert("Não foi possível enviar. Confira o setup do Supabase.");
        }finally{
            button.disabled=false;
        }
    }

    document.getElementById("chatSendBtn").onclick=send;
    document.getElementById("chatMessageInput").onkeydown=e=>{
        if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}
    };

    await draw();
    activeRealtimeChannel=subscribeTemporaryChat(message=>{
        if(new Date(message.expires_at)>new Date()) draw();
    });
    setStatus("Chat temporário conectado")
}

function adminIsLoggedIn(){
    return sessionStorage.getItem("aogiri.admin.session")==="1";
}

function openAdminLogin(){
    const old=document.getElementById("adminOverlay");
    if(old)old.remove();

    const overlay=document.createElement("div");
    overlay.id="adminOverlay";
    overlay.className="admin-overlay";
    overlay.innerHTML=`
      <div class="admin-dialog">
        <div class="admin-dialog-title">AOGIRI SYSTEM ADMINISTRATION</div>
        <div class="admin-dialog-body">
          ${adminIsLoggedIn()?`
            <div class="admin-panel">
              <span class="admin-badge">ADMIN</span>
              <p>Sessão administrativa local ativa.</p>
              <p class="small">Este painel secreto é um recurso da interface. Para privilégios administrativos reais no Supabase, use autenticação segura no backend.</p>
              <button id="adminOpenStats" class="retro-btn">Informações do sistema</button>
              <button id="adminLogout" class="retro-btn">Sair</button>
              <button id="adminClose" class="retro-btn">Fechar</button>
            </div>
          `:`
            <label>Usuário</label>
            <input id="adminUser" class="admin-field" autocomplete="off">
            <label>Senha</label>
            <input id="adminPass" class="admin-field" type="password">
            <div id="adminError" class="small danger"></div>
            <button id="adminLoginBtn" class="retro-btn">Entrar</button>
            <button id="adminClose" class="retro-btn">Cancelar</button>
          `}
        </div>
      </div>`;
    document.body.appendChild(overlay);

    document.getElementById("adminClose").onclick=()=>overlay.remove();

    if(adminIsLoggedIn()){
        document.getElementById("adminLogout").onclick=()=>{
            sessionStorage.removeItem("aogiri.admin.session");
            overlay.remove();
        };
        document.getElementById("adminOpenStats").onclick=()=>{
            const el=overlay.querySelector(".admin-panel");
            const extra=document.createElement("div");
            extra.className="small mono";
            extra.style.marginTop="10px";
            extra.innerHTML=`NODE: AOG-04<br>SUPABASE: CONNECTED<br>ANON ID: ${esc(ANON_ID)}<br>CHAT NAME: ${esc(getTemporaryChatName()||"(nenhum)")}`;
            el.appendChild(extra);
        };
    }else{
        const login=()=>{
            const user=document.getElementById("adminUser").value;
            const pass=document.getElementById("adminPass").value;
            if(user==="batu"&&pass==="bulat"){
                sessionStorage.setItem("aogiri.admin.session","1");
                overlay.remove();
                openAdminLogin();
            }else{
                document.getElementById("adminError").textContent="ACCESS DENIED";
            }
        };
        document.getElementById("adminLoginBtn").onclick=login;
        document.getElementById("adminPass").onkeydown=e=>{if(e.key==="Enter")login()};
        document.getElementById("adminUser").focus();
    }

    overlay.addEventListener("click",e=>{if(e.target===overlay)overlay.remove()});
}

document.addEventListener("keydown",e=>{
    if(e.ctrlKey&&(e.key==="6"||e.code==="Digit6")){
        e.preventDefault();
        openAdminLogin();
    }
});

function renderSites(){
    addressInput.value="http://directory.aogiri.local/";
    view.innerHTML=`
      <div class="h1">Diretório de Sites</div>
      <div class="grid">
        <div class="card"><h3><a href="sites/ccg/index.html">CCG Archive</a></h3><p>Mirror institucional.</p></div>
        <div class="card"><h3><a href="sites/2channel/index.html">2channel</a></h3><p>Entrada para o fórum anônimo.</p></div>
        <div class="card"><h3><a href="sites/google/index.html">Google</a></h3><p>Busca minimalista.</p></div>
        <div class="card"><h3><a href="sites/yahoo/index.html">Yahoo!</a></h3><p>Portal e diretório.</p></div>
      </div>`;
    setStatus("Diretório carregado")
}

function renderHistory(){
    const hist=JSON.parse(localStorage.getItem("aogiri.history")||"[]");
    view.innerHTML=`<div class="h1">Histórico local</div>${hist.length?hist.map(x=>`
      <div class="result"><h3 data-q="${esc(x.query)}">${esc(x.query)}</h3><div class="meta">${esc(x.date)}</div></div>`).join(""):"<p>Nenhuma pesquisa local ainda.</p>"}`;
    view.querySelectorAll("[data-q]").forEach(el=>el.onclick=()=>pushHash("search/"+encodeURIComponent(el.dataset.q)));
    setStatus(hist.length+" pesquisas locais")
}

document.querySelectorAll(".side-link").forEach(btn=>btn.onclick=()=>pushHash(btn.dataset.route));
document.getElementById("homeBtn").onclick=()=>pushHash("home");
document.getElementById("historyBtn").onclick=()=>pushHash("history");
document.getElementById("refreshBtn").onclick=()=>route(location.hash||"#home");
document.getElementById("stopBtn").onclick=()=>setStatus("Carregamento interrompido");
document.getElementById("backBtn").onclick=()=>history.back();
document.getElementById("forwardBtn").onclick=()=>history.forward();
document.getElementById("goBtn").onclick=()=>{
    const value=addressInput.value.toLowerCase();
    if(value.includes("2ch"))pushHash("forum");
    else if(value.includes("ccg"))pushHash("ccg");
    else if(value.includes("search"))pushHash("search");
    else pushHash("home")
};
window.addEventListener("hashchange",()=>route(location.hash));
route(location.hash||"#home");