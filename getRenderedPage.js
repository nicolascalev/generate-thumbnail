module.exports = function getRenderedPage(params) {
  if (
    !params.header ||
    !params.title ||
    !params.description ||
    !params.photoUrl
  ) {
    return null;
  }
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
  
      body {
        margin: 0px;
        font-family: 'Inter', sans-serif;
      }
  
      .container {
        position: relative;
        width: 1920px;
        height: 1080px;
        background: #FFFFFF;
      }
  
      .header {
        position: absolute;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 1100px;
        height: 100px;
        left: 100px;
        top: 200px;
        font-weight: 700;
        font-size: 64px;
        line-height: 77px;
        color: #1363DF;
      }
  
      .title {
        position: absolute;
        overflow: hidden;
        width: 1100px;
        height: 250px;
        left: 100px;
        top: 287px;
        font-weight: 700;
        font-size: 96px;
        line-height: 116px;
        color: #000000;
      }
  
      .description {
        position: absolute;
        overflow: hidden;
        width: 1100px;
        height: 350px;
        left: 100px;
        top: 600px;
        font-weight: 400;
        font-size: 48px;
        line-height: 58.09px;
        color: #343A40;
      }
  
      .image {
        position: absolute;
        width: 500px;
        height: 500px;
        left: 1300px;
        top: 200px;
        border-radius: 50px;
        background: url('${params.photoUrl}');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
  
      .logo {
        position: absolute;
        width: 104px;
        height: 150px;
        left: 1696px;
        top: 800px;
      }
  
      .footer {
        position: absolute;
        width: 1920px;
        height: 43px;
        left: 0px;
        top: 1037px;
        background: #1363DF;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="header">
        ${params.header}
      </div>
      <div class="title">
        ${params.title}
      </div>
      <div class="description">
        ${params.description}
      </div>
      <div class="image"></div>
      <img src="data:image/png;base64,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" alt="Toptierperk watermark logo" class="logo">
      <div class="footer"></div>
    </div>
  </body>
  
  </html>
  `;

}