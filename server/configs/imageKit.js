import ImageKit from "imagekit";

var imagekit = new ImageKit({
    publicKey : process.env.ImageKit_PUBLIC_KEY,
    privateKey : process.env.ImageKit_PRIVATE_KEY,
    urlEndpoint : process.env.ImageKit_URL_ENDPOINT
});

export default imagekit;