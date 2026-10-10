(() => {
    const CHAT_NAME_KEY = "aogiri.chat.name";
    const ADMIN_LOGIN = { username: "batu", email: "batu@aogiri.local" };
    const CHAT_TTL_MINUTES = 30;
    let chatChannel = null;
    const originalRoute = window.route;

    function clearChatChannel(){
        if(chatChannel){
            sb.removeChannel(chatChannel);
            chatChannel = null;
        }
    }

    async function loadChat(){
        const {data,error}=await sb.from("temporary_chat_messages")
            .select("*")
            .gt("expires_at",new Date().toISOString())
            .order("created_at",{ascending:true})
            .limit(250);
        if(error) throw error;
        return data||[];
    }

    async function sendChat(name,content){
        const expiresAt=new Date(Date.now()+CHAT_TTL_MINUTES*60*1000).toISOString();
        const {error}=await sb.from("temporary_chat_messages")
            .insert({chat_name:name,content,expires_at:expiresAt});
        if(error) throw error;
    }

    function getChatName(){
        return sessionStorage.getItem(CHAT_NAME_KEY)||"";
    }

    function setChatName(name){
        sessionStorage.setItem(CHAT_NAME_KEY,name);
    }

    async function renderTemporaryChat(){
        if(typeof clearRealtime==="function") clearRealtime();
        clearChatChannel();
        addressInput.value="http://chat.aogiri.local/public/";
        const chatName=getChatName();

        view.innerHTML=`
          <div class="h1">Chat Temporário Público</div>
          <div class="notice">O nome deste chat é separado do ID do fórum. As mensagens expiram em aproximadamente ${CHAT_TTL_MINUTES} minutos.</div>
          ${chatName?`
            <div class="chat-wrap">
              <div class="chat-top">
                <span><span class="online-dot"></span>${esc(onlineCount.textContent||"0")} online</span>
                <span>Nome no chat: <b>${esc(chatName)}</b></span>
                <button id="changeChatName" class="retro-btn">Trocar nome</button>
              </div>
              <div id="chatLog" class="chat-log"><div class="chat-empty">Conectando...</div></div>
              <div class="chat-compose">
                <input id="chatMessageInput" maxlength="800" autocomplete="off" placeholder="Digite uma mensagem...">
                <button id="chatSendBtn" class="retro-btn">Enviar</button>
              </div>
            </div>`:`
            <div class="forum-form">
              <b>Escolha um nome para esta sessão do chat</b>
              <p><input id="chatNameInput" maxlength="32" placeholder="Ex.: Anonymous17" style="width:100%;padding:7px"></p>
              <button id="chatNameBtn" class="retro-btn">Entrar no chat</button>
            </div>`}`;

        if(!chatName){
            const enter=()=>{
                const input=document.getElementById("chatNameInput");
                const name=(input.value||"").trim();
                if(!name||name.length>32||/[<>]/.test(name)) return alert("Escolha um nome de 1 a 32 caracteres.");
                setChatName(name);
                renderTemporaryChat();
            };
            document.getElementById("chatNameBtn").onclick=enter;
            document.getElementById("chatNameInput").onkeydown=e=>{if(e.key==="Enter")enter()};
            document.getElementById("chatNameInput").focus();
            setStatus("Aguardando nome do chat");
            return;
        }

        document.getElementById("changeChatName").onclick=()=>{
            sessionStorage.removeItem(CHAT_NAME_KEY);
            renderTemporaryChat();
        };

        async function draw(){
            const log=document.getElementById("chatLog");
            if(!log) return;
            try{
                const rows=await loadChat();
                log.innerHTML=rows.length?rows.map(m=>{
                    const mins=Math.max(0,Math.ceil((new Date(m.expires_at)-Date.now())/60000));
                    return `<div class="chat-msg"><span class="chat-name">${esc(m.chat_name)}</span><span class="chat-time">${esc(fmtDate(m.created_at))}</span><span class="chat-expire"> · ~${mins} min</span><div>${esc(m.content)}</div></div>`;
                }).join(""):`<div class="chat-empty">Nenhuma mensagem ativa.</div>`;
                log.scrollTop=log.scrollHeight;
            }catch(err){
                log.innerHTML="<div class='errorbox'>Execute sql/upgrade-chat-admin.sql no Supabase.</div>";
            }
        }

        async function send(){
            const input=document.getElementById("chatMessageInput");
            const text=input.value.trim();
            if(!text) return;
            const button=document.getElementById("chatSendBtn");
            button.disabled=true;
            try{
                await sendChat(chatName,text);
                input.value="";
                input.focus();
            }catch(err){
                alert("Não foi possível enviar. Confira o SQL do Supabase.");
            }finally{
                button.disabled=false;
            }
        }

        document.getElementById("chatSendBtn").onclick=send;
        document.getElementById("chatMessageInput").onkeydown=e=>{
            if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}
        };

        await draw();
        chatChannel=sb.channel("temporary-public-chat-"+Math.random().toString(36).slice(2))
            .on("postgres_changes",{event:"INSERT",schema:"public",table:"temporary_chat_messages"},()=>draw())
            .subscribe();
        setStatus("Chat temporário conectado");
    }

    async function isAdmin(){
        const {data:{user}}=await sb.auth.getUser();
        if(!user) return false;
        const {data,error}=await sb.rpc("is_admin");
        return !error&&data===true;
    }

    async function adminLogin(username,password){
        if(String(username||"").trim().toLowerCase()!==ADMIN_LOGIN.username) throw new Error("ACCESS_DENIED");
        const {error}=await sb.auth.signInWithPassword({email:ADMIN_LOGIN.email,password});
        if(error) throw error;
        if(!(await isAdmin())){
            await sb.auth.signOut();
            throw new Error("NOT_ADMIN");
        }
    }

    async function adminDelete(type,id){
        const tables={thread:"forum_threads",post:"forum_posts",article:"community_articles",comment:"article_comments",chat:"temporary_chat_messages"};
        const table=tables[type];
        if(!table) throw new Error("INVALID_TYPE");
        const {error}=await sb.from(table).delete().eq("id",id);
        if(error) throw error;
    }

    async function adminData(){
        const [threads,posts,articles,chat]=await Promise.all([
            sb.from("forum_threads").select("*").order("created_at",{ascending:false}).limit(8),
            sb.from("forum_posts").select("*").order("created_at",{ascending:false}).limit(12),
            sb.from("community_articles").select("*").order("created_at",{ascending:false}).limit(8),
            sb.from("temporary_chat_messages").select("*").order("created_at",{ascending:false}).limit(12)
        ]);
        const error=threads.error||posts.error||articles.error||chat.error;
        if(error) throw error;
        return {threads:threads.data||[],posts:posts.data||[],articles:articles.data||[],chat:chat.data||[]};
    }

    async function openAdmin(){
        document.getElementById("adminOverlay")?.remove();
        const overlay=document.createElement("div");
        overlay.id="adminOverlay";
        overlay.className="admin-overlay";
        overlay.innerHTML=`<div class="admin-dialog"><div class="admin-dialog-title">AOGIRI SYSTEM ADMINISTRATION</div><div class="admin-dialog-body"><div id="adminContent">Verificando sessão...</div></div></div>`;
        document.body.appendChild(overlay);
        overlay.addEventListener("click",e=>{if(e.target===overlay)overlay.remove()});
        const content=document.getElementById("adminContent");

        if(!(await isAdmin())){
            content.innerHTML=`
              <label>Usuário</label><input id="adminUser" class="admin-field" value="batu" autocomplete="off">
              <label>Senha</label><input id="adminPass" class="admin-field" type="password" autocomplete="current-password">
              <div id="adminError" class="small danger"></div>
              <button id="adminLoginBtn" class="retro-btn">Entrar</button> <button id="adminClose" class="retro-btn">Cancelar</button>`;
            document.getElementById("adminClose").onclick=()=>overlay.remove();
            const login=async()=>{
                const btn=document.getElementById("adminLoginBtn");
                const err=document.getElementById("adminError");
                btn.disabled=true;err.textContent="Autenticando...";
                try{
                    await adminLogin(document.getElementById("adminUser").value,document.getElementById("adminPass").value);
                    overlay.remove();
                    openAdmin();
                }catch(e){
                    err.textContent="ACCESS DENIED";
                    btn.disabled=false;
                }
            };
            document.getElementById("adminLoginBtn").onclick=login;
            document.getElementById("adminPass").onkeydown=e=>{if(e.key==="Enter")login()};
            document.getElementById("adminPass").focus();
            return;
        }

        content.innerHTML=`
          <div class="admin-panel">
            <span class="admin-badge">ADMIN / SUPABASE AUTH</span>
            <p>Autenticado como <b>batu</b>.</p>
            <p><button id="adminRefresh" class="retro-btn">Atualizar</button> <button id="adminLogout" class="retro-btn">Sair</button> <button id="adminClose" class="retro-btn">Fechar</button></p>
            <div id="adminModeration">Carregando...</div>
          </div>`;
        document.getElementById("adminClose").onclick=()=>overlay.remove();
        document.getElementById("adminLogout").onclick=async()=>{await sb.auth.signOut();overlay.remove()};

        async function refresh(){
            const box=document.getElementById("adminModeration");
            try{
                const data=await adminData();
                box.innerHTML=`
                  <div class="h2">Chat recente</div>${data.chat.map(m=>`<div class="admin-mod-row"><div><b>${esc(m.chat_name)}</b><br>${esc(m.content)}</div><button class="retro-btn adminDelete" data-type="chat" data-id="${m.id}">Excluir</button></div>`).join("")||"<div class='small muted'>Sem mensagens.</div>"}
                  <div class="h2">Posts recentes</div>${data.posts.map(p=>`<div class="admin-mod-row"><div><b>${esc(p.anon_id)}</b> · thread #${p.thread_id}<br>${esc(p.content)}</div><button class="retro-btn adminDelete" data-type="post" data-id="${p.id}">Excluir</button></div>`).join("")||"<div class='small muted'>Sem posts.</div>"}
                  <div class="h2">Threads recentes</div>${data.threads.map(t=>`<div class="admin-mod-row"><div><b>#${t.id} ${esc(t.title)}</b></div><button class="retro-btn adminDelete" data-type="thread" data-id="${t.id}">Excluir</button></div>`).join("")||"<div class='small muted'>Sem threads.</div>"}
                  <div class="h2">Artigos comunitários</div>${data.articles.map(a=>`<div class="admin-mod-row"><div><b>${esc(a.title)}</b></div><button class="retro-btn adminDelete" data-type="article" data-id="${a.id}">Excluir</button></div>`).join("")||"<div class='small muted'>Sem artigos.</div>"}`;
                box.querySelectorAll(".adminDelete").forEach(btn=>{
                    btn.onclick=async()=>{
                        if(!confirm("Excluir este registro?")) return;
                        btn.disabled=true;
                        try{await adminDelete(btn.dataset.type,btn.dataset.id);await refresh()}catch(e){alert("Falha ao excluir.");btn.disabled=false}
                    };
                });
            }catch(e){
                box.innerHTML="<div class='errorbox'>Execute sql/upgrade-chat-admin.sql e sql/admin-link.sql no Supabase.</div>";
            }
        }

        document.getElementById("adminRefresh").onclick=refresh;
        await refresh();
    }

    window.route=function(path){
        const clean=(path||"home").replace(/^#/,"");
        if(clean.split("/")[0]==="chat") return renderTemporaryChat();
        clearChatChannel();
        return originalRoute(path);
    };

    document.addEventListener("keydown",e=>{
        if(e.ctrlKey&&(e.key==="6"||e.code==="Digit6")){
            e.preventDefault();
            openAdmin();
        }
    });

    if((location.hash||"").replace(/^#/,"").split("/")[0]==="chat") window.route(location.hash);
})();
