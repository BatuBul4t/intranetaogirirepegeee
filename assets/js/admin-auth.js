const ADMIN_LOGIN = {
    username: "batu",
    email: "batu@aogiri.local"
};

async function adminSignIn(username,password){
    if(String(username||"").trim().toLowerCase()!==ADMIN_LOGIN.username){
        throw new Error("ACCESS_DENIED");
    }

    const {error}=await sb.auth.signInWithPassword({
        email:ADMIN_LOGIN.email,
        password
    });

    if(error) throw error;

    const {data:isAdmin,error:roleError}=await sb.rpc("is_admin");

    if(roleError||!isAdmin){
        await sb.auth.signOut();
        throw new Error("NOT_ADMIN");
    }

    return true;
}

async function adminSignOut(){
    await sb.auth.signOut();
}

async function adminSession(){
    const {data:{user}}=await sb.auth.getUser();
    if(!user) return null;

    const {data:isAdmin,error}=await sb.rpc("is_admin");
    if(error||!isAdmin) return null;

    return user;
}

async function adminDeleteRecord(type,id){
    const tableMap={
        thread:"forum_threads",
        post:"forum_posts",
        comment:"article_comments",
        article:"community_articles",
        chat:"temporary_chat_messages"
    };

    const table=tableMap[type];
    if(!table) throw new Error("INVALID_TYPE");

    const {error}=await sb.from(table).delete().eq("id",id);
    if(error) throw error;
}

async function adminDashboardData(){
    const [
        threadsCount,
        postsCount,
        articlesCount,
        commentsCount,
        chatCount,
        recentThreads,
        recentPosts,
        recentArticles,
        recentChat
    ]=await Promise.all([
        sb.from("forum_threads").select("*",{count:"exact",head:true}),
        sb.from("forum_posts").select("*",{count:"exact",head:true}),
        sb.from("community_articles").select("*",{count:"exact",head:true}),
        sb.from("article_comments").select("*",{count:"exact",head:true}),
        sb.from("temporary_chat_messages").select("*",{count:"exact",head:true}),
        sb.from("forum_threads").select("*").order("created_at",{ascending:false}).limit(8),
        sb.from("forum_posts").select("*").order("created_at",{ascending:false}).limit(12),
        sb.from("community_articles").select("*").order("created_at",{ascending:false}).limit(8),
        sb.from("temporary_chat_messages").select("*").order("created_at",{ascending:false}).limit(12)
    ]);

    const errors=[
        threadsCount.error,postsCount.error,articlesCount.error,commentsCount.error,chatCount.error,
        recentThreads.error,recentPosts.error,recentArticles.error,recentChat.error
    ].filter(Boolean);

    if(errors.length) throw errors[0];

    return {
        counts:{
            threads:threadsCount.count||0,
            posts:postsCount.count||0,
            articles:articlesCount.count||0,
            comments:commentsCount.count||0,
            chat:chatCount.count||0
        },
        threads:recentThreads.data||[],
        posts:recentPosts.data||[],
        articles:recentArticles.data||[],
        chat:recentChat.data||[]
    };
}
