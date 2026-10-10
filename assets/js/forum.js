function allThreads(){
    return [...FORUM_THREADS_SEED,...getUserThreads()]
}

function createThread(board,title,text){
    const threads=getUserThreads();
    const id=Date.now();
    threads.unshift({
        id,
        board,
        title:title.trim()||"sem título",
        posts:[{
            id:1,
            author:"名無しさん",
            date:new Date().toLocaleString("ja-JP"),
            text:text.trim()
        }]
    });
    saveUserThreads(threads);
    return id
}

function replyThread(threadId,text){
    const userThreads=getUserThreads();
    let thread=userThreads.find(t=>String(t.id)===String(threadId));
    if(!thread){
        const seed=FORUM_THREADS_SEED.find(t=>String(t.id)===String(threadId));
        if(seed){
            thread=JSON.parse(JSON.stringify(seed));
            userThreads.push(thread)
        }
    }
    if(!thread) return false;
    thread.posts.push({
        id:thread.posts.length+1,
        author:"名無しさん",
        date:new Date().toLocaleString("ja-JP"),
        text:text.trim()
    });
    saveUserThreads(userThreads);
    return true
}