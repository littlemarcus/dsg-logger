export default (async (req)=>{
    return new URL(`/using-typescript`, req.url);
});

export const config = {
    path: '/test/*'
};