const playlist = [
    {
      title: "What is DevOps",
      videoUrl: "https://www.youtube.com/watch?v=mBBgRdlC4sc",
    },
    {
      title: "Introduction To DevOps ",
      videoId: "Me3ea4nUt0U",
      videoUrl: "https://www.youtube.com/watch?v=Me3ea4nUt0U",
    },
    {
      title: "DevOps Tutorial For Beginners ",
      videoId: "YSkDtQ2RA_c",
      videoUrl: "https://www.youtube.com/watch?v=YSkDtQ2RA_c",
    },
  ];
  const fs = require("fs");
  const ytdl = require("ytdl-core");
  const length = playlist.length;
  
  playlist.forEach((pl, i) => {
    const { videoUrl, title } = pl;
    const item = i + 1;
  
    ytdl(videoUrl, {
      format: "mp4",
    }).pipe(fs.createWriteStream(`${title}.mp4`));
    console.log(`${item}/${length} - ${title} downloaded successfully`);
  });