export default (async (req)=>{
    return new URL(`/using-typescript`, req.url);
});