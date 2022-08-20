const express = require('express')
const app = express()
const port = 5000
const getRenderedPage = require('./getRenderedPage')
const { v4 } = require('uuid');
const puppeteer = require('puppeteer');
const stream = require('stream');
const resizeImg = require('resize-img');

app.set('view engine', 'ejs');

// store cache here
let cache = {}

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.get('/thumbnail', async (req, res) => {
  // take only whats necesary from query
  const params = { header, title, description, photoUrl } = req.query;
  if (
    !params.header ||
    !params.title ||
    !params.description
  ) {
    return res.status(400).json({ message: "The following parameters are required: header, title, description, photoUrl" });
  }
  if (!params.photoUrl) {
    params.photoUrl = 'https://i.ibb.co/m0mWdtK/ttplogo.png';
  }
  // for cache check if this request with the same params has been made
  const key = Object.values(params).join('');
  // if for that exact url there has been a response, then respond with cache
  if (cache[key]) {
    const fileName = `${v4()}.png`;
    var readStream = new stream.PassThrough();
    readStream.end(cache[key]);
    res.set('Content-disposition', 'attachment; filename=' + fileName);
    res.set('Content-Type', 'image/png');
    readStream.pipe(res);
    return;
  }
  const pageTemplate = getRenderedPage(params);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 })

  try {
    const fileName = `${v4()}.png`;

    await page.setContent(pageTemplate);

    const content = await page.$('body');
    const imageBuffer = await content.screenshot({ omitBackground: true });
    const smallImage = await resizeImg(imageBuffer, {
      width: 500,
    });
    // store the image in cache
    cache[key] = smallImage;

    var readStream = new stream.PassThrough();
    readStream.end(smallImage);

    res.set('Content-disposition', 'attachment; filename=' + fileName);
    res.set('Content-Type', 'image/png');

    readStream.pipe(res);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  } finally {
    await browser.close();
  }
})

app.listen(port, () => {
  console.log(`Create Thumbnail running on ${port}`)
})