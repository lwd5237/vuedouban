export function attachImageUrl(srcUrl) {  
    if(srcUrl !== undefined){
     /* return srcUrl.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p');*/
     srcUrl = "https://images.weserv.nl/?url="+srcUrl.substr(7);
     return srcUrl;
   }
}