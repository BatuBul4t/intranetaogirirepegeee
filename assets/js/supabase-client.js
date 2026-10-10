const sb = window.supabase.createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.publishableKey,
    {
        auth: { persistSession: false, autoRefreshToken: false },
        realtime: { params: { eventsPerSecond: 10 } }
    }
);

function getAnonId(){
    let id=localStorage.getItem("aogiri.anon.id");
    if(!id){
        const alphabet="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
        let code="";
        crypto.getRandomValues(new Uint8Array(8)).forEach(v=>code+=alphabet[v%alphabet.length]);
        id="ID:"+code;
        localStorage.setItem("aogiri.anon.id",id);
    }
    return id;
}

const ANON_ID=getAnonId();
let presenceChannel=null;

function startPresence(onCount){
    if(presenceChannel) return;
    presenceChannel=sb.channel("aogiri-online",{
        config:{presence:{key:ANON_ID}}
    });
    presenceChannel
      .on("presence",{event:"sync"},()=>{
          const state=presenceChannel.presenceState();
          onCount(Object.keys(state).length);
      })
      .subscribe(async status=>{
          if(status==="SUBSCRIBED"){
              await presenceChannel.track({online_at:new Date().toISOString()});
          }
      });
}

async function loadThreads(board){
    let query=sb.from("forum_threads").select("*").order("last_post_at",{ascending:false}).limit(120);
    if(board) query=query.eq("board",board);
    const {data,error}=await query;
    if(error) throw error;
    return data||[];
}

async function loadPosts(threadId){
    const {data,error}=await sb.from("forum_posts").select("*").eq("thread_id",threadId).order("created_at",{ascending:true}).limit(500);
    if(error) throw error;
    return data||[];
}

async function createGlobalThread(board,title,content){
    const {data:thread,error:threadError}=await sb.from("forum_threads")
        .insert({board,title,anon_id:ANON_ID})
        .select().single();
    if(threadError) throw threadError;
    const {error:postError}=await sb.from("forum_posts")
        .insert({thread_id:thread.id,anon_id:ANON_ID,content});
    if(postError) throw postError;
    return thread;
}

async function createGlobalPost(threadId,content){
    const {data,error}=await sb.from("forum_posts")
        .insert({thread_id:threadId,anon_id:ANON_ID,content})
        .select().single();
    if(error) throw error;
    return data;
}

async function loadComments(articleId){
    const {data,error}=await sb.from("article_comments").select("*")
        .eq("article_id",articleId).order("created_at",{ascending:true}).limit(200);
    if(error) throw error;
    return data||[];
}

async function createComment(articleId,content){
    const {data,error}=await sb.from("article_comments")
        .insert({article_id:articleId,anon_id:ANON_ID,content})
        .select().single();
    if(error) throw error;
    return data;
}

function subscribeBoard(board,onChange){
    const name="board-"+(board||"all")+"-"+Math.random().toString(36).slice(2);
    return sb.channel(name)
      .on("postgres_changes",{event:"*",schema:"public",table:"forum_threads"},onChange)
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"forum_posts"},onChange)
      .subscribe();
}

function subscribeThread(threadId,onPost){
    return sb.channel("thread-"+threadId+"-"+Math.random().toString(36).slice(2))
      .on("postgres_changes",{
          event:"INSERT",schema:"public",table:"forum_posts",
          filter:"thread_id=eq."+threadId
      },payload=>onPost(payload.new))
      .subscribe();
}

function subscribeComments(articleId,onComment){
    return sb.channel("comments-"+articleId+"-"+Math.random().toString(36).slice(2))
      .on("postgres_changes",{
          event:"INSERT",schema:"public",table:"article_comments",
          filter:"article_id=eq."+articleId
      },payload=>onComment(payload.new))
      .subscribe();
}

async function loadCommunityArticles(limit=120){
    const {data,error}=await sb.from("community_articles")
        .select("*")
        .order("created_at",{ascending:false})
        .limit(limit);
    if(error) throw error;
    return data||[];
}

async function loadCommunityArticle(id){
    const {data,error}=await sb.from("community_articles")
        .select("*")
        .eq("id",id)
        .single();
    if(error) throw error;
    return data;
}

async function createCommunityArticle(article){
    const payload={
        title:article.title,
        category:article.category||"Comunidade",
        source_name:article.source_name||"Arquivo Comunitário",
        date_label:article.date_label||"2001",
        summary:article.summary,
        body:article.body,
        tags:article.tags||[],
        anon_id:ANON_ID
    };
    const {data,error}=await sb.from("community_articles")
        .insert(payload)
        .select()
        .single();
    if(error) throw error;
    return data;
}

function subscribeCommunityArticles(onChange){
    return sb.channel("community-articles-"+Math.random().toString(36).slice(2))
        .on("postgres_changes",{
            event:"INSERT",
            schema:"public",
            table:"community_articles"
        },payload=>onChange(payload.new))
        .subscribe();
}


async function loadTemporaryChatMessages(){
    const {data,error}=await sb.from("temporary_chat_messages")
        .select("*")
        .gt("expires_at",new Date().toISOString())
        .order("created_at",{ascending:true})
        .limit(250);
    if(error) throw error;
    return data||[];
}

async function sendTemporaryChatMessage(chatName,content){
    const expiresAt=new Date(Date.now()+30*60*1000).toISOString();
    const {data,error}=await sb.from("temporary_chat_messages")
        .insert({
            chat_name:chatName,
            content,
            expires_at:expiresAt
        })
        .select()
        .single();
    if(error) throw error;
    return data;
}

function subscribeTemporaryChat(onMessage){
    return sb.channel("temporary-public-chat-"+Math.random().toString(36).slice(2))
        .on("postgres_changes",{
            event:"INSERT",
            schema:"public",
            table:"temporary_chat_messages"
        },payload=>onMessage(payload.new))
        .subscribe();
}
