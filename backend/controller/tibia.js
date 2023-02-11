const { json } = require('express');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { executablePath } = require('puppeteer')

puppeteer.use(StealthPlugin())

const tibia_scrap = async (character) => {

  console.log('✅-->Robot start working!')

  console.log('✅ | Tibia consome demais. -Karlito Juan, 2022.')

  if (!character) {
    console.log('Não foi enviado todos os campos necessários para a requisição.')
    console.log('❌-->Robot stop working!')
    return { statuscode: 400, message: 'favor enviar todos os campos necessário para a requisição.' };
  }

  const browser = await puppeteer.launch({
    executablePath: executablePath(),
    //executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', //local servidor
    //'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: [
      '--ash-force-desktop',
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--ignore-certificate-errors',
      '--disable-dev-shm-usage',
      '--disable-notifications',
      '--disable-geolocation',
      '--disable-infobars',
      '--disable-session-crashed-bubble',
      '--single-process',
      '--no-zygote',
    ]
  });

  try {
    const page = await browser.newPage();
    const timeout = 30000;
    page.setDefaultTimeout(timeout);
    await page.setViewport({ "width": 1366, "height": 768 })
    await page.goto(`https://guildstats.eu/character?nick=${character}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    console.log('IT Scrap Robot | Pagina carregada.')

    let dias1 = await page.$$eval('#tab7 > table:nth-child(8) > tbody > tr', rows => {
      return Array.from(rows, row => {
        const columns = row.querySelectorAll('td');
        return Object.assign({}, Array.from(columns, column => column.innerText))
      });
    });

    let xp_ontem1 = dias1[29][1];
    let xp_anteontem1 = dias1[28][1];
    console.log('IT Scrap Robot | Dados capturados.')
    // await page.goto(`https://guildstats.eu/character?nick=${character2}`, { waitUntil: 'domcontentloaded', timeout: 20000 });

    // let dias2 = await page.$$eval('#tab7 > table:nth-child(8) > tbody > tr', rows => {
    //   return Array.from(rows, row => {
    //     const columns = row.querySelectorAll('td');
    //     return Object.assign({}, Array.from(columns, column => column.innerText))
    //   });
    // });

    // let xp_ontem2 = dias2[29][1];
    // let xp_anteontem2 = dias2[28][1];

    // await page.goto(`https://guildstats.eu/character?nick=${character3}`, { waitUntil: 'domcontentloaded', timeout: 20000 });

    // let dias3 = await page.$$eval('#tab7 > table:nth-child(8) > tbody > tr', rows => {
    //   return Array.from(rows, row => {
    //     const columns = row.querySelectorAll('td');
    //     return Object.assign({}, Array.from(columns, column => column.innerText))
    //   });
    // });

    // let xp_ontem3 = dias3[29][1];
    // let xp_anteontem3 = dias3[28][1];

    // await page.goto(`https://guildstats.eu/character?nick=${character4}`, { waitUntil: 'domcontentloaded', timeout: 20000 });

    // let dias4 = await page.$$eval('#tab7 > table:nth-child(8) > tbody > tr', rows => {
    //   return Array.from(rows, row => {
    //     const columns = row.querySelectorAll('td');
    //     return Object.assign({}, Array.from(columns, column => column.innerText))
    //   });
    // });

    // let xp_ontem4 = dias4[29][1];
    // let xp_anteontem4 = dias4[28][1];

    // await page.goto(`https://guildstats.eu/character?nick=${character5}`, { waitUntil: 'domcontentloaded', timeout: 20000 });

    // let dias5 = await page.$$eval('#tab7 > table:nth-child(8) > tbody > tr', rows => {
    //   return Array.from(rows, row => {
    //     const columns = row.querySelectorAll('td');
    //     return Object.assign({}, Array.from(columns, column => column.innerText))
    //   });
    // });

    // let xp_ontem5 = dias5[29][1];
    // let xp_anteontem5 = dias5[28][1];

    // await page.goto(`https://guildstats.eu/character?nick=${character6}`, { waitUntil: 'domcontentloaded', timeout: 20000 });

    // let dias6 = await page.$$eval('#tab7 > table:nth-child(8) > tbody > tr', rows => {
    //   return Array.from(rows, row => {
    //     const columns = row.querySelectorAll('td');
    //     return Object.assign({}, Array.from(columns, column => column.innerText))
    //   });
    // });

    // let xp_ontem6 = dias6[29][1];
    // let xp_anteontem6 = dias6[28][1];

    // await page.goto(`https://guildstats.eu/character?nick=${character7}`, { waitUntil: 'domcontentloaded', timeout: 20000 });

    // let dias7 = await page.$$eval('#tab7 > table:nth-child(8) > tbody > tr', rows => {
    //   return Array.from(rows, row => {
    //     const columns = row.querySelectorAll('td');
    //     return Object.assign({}, Array.from(columns, column => column.innerText))
    //   });
    // });

    // let xp_ontem7 = dias7[29][1];
    // let xp_anteontem7 = dias7[28][1];

    

    let xp_ontem1_count = xp_ontem1.replace(/[^0-9]/g, "");
    // let xp_ontem2_count = xp_ontem2.replace(/[^0-9]/g, "");
    // let xp_ontem3_count = xp_ontem3.replace(/[^0-9]/g, "");
    // let xp_ontem4_count = xp_ontem4.replace(/[^0-9]/g, "");
    // let xp_ontem5_count = xp_ontem5.replace(/[^0-9]/g, "");
    // let xp_ontem6_count = xp_ontem6.replace(/[^0-9]/g, "");
    // let xp_ontem7_count = xp_ontem7.replace(/[^0-9]/g, "");

    let array1 = {
      character: character,
      xp_ontem: xp_ontem1,
      message: 'De acordo com o GuildStats.eu, o personagem '+character+' fez um total de '+xp_ontem1+' xp no dia de ontem.'
    }
    // let array2 = {
    //   character: character2,
    //   xp_ontem: xp_ontem2
    // }
    // let array3 = {
    //   character: character3,
    //   xp_ontem: xp_ontem3
    // }
    // let array4 = {
    //   character: character4,
    //   xp_ontem: xp_ontem4
    // }
    // let array5 = {
    //   character: character5,
    //   xp_ontem: xp_ontem5
    // }
    // let array6 = {
    //   character: character6,
    //   xp_ontem: xp_ontem6
    // }
    // let array7 = {
    //   character: character7,
    //   xp_ontem: xp_ontem7
    // }

    let array_result = []
    array_result.push(array1)
    console.log('IT Scrap Robot | Json estruturado.')
    console.log(array_result)


    //console.log('De acordo com o GuildStats.eu, o personagem ' + character1 + ' fez um total de ' + xp_ontem1 + ' xp no dia de ontem.\nDe acordo com o GuildStats.eu, o personagem ' + character2 + ' fez um total de ' + xp_ontem2 + ' xp no dia de ontem.\nDe acordo com o GuildStats.eu, o personagem ' + character3 + ' fez um total de ' + xp_ontem3 + ' xp no dia de ontem.\nDe acordo com o GuildStats.eu, o personagem ' + character4 + ' fez um total de ' + xp_ontem4 + ' xp no dia de ontem.\nDe acordo com o GuildStats.eu, o personagem ' + character5 + ' fez um total de ' + xp_ontem5 + ' xp no dia de ontem.\nDe acordo com o GuildStats.eu, o personagem ' + character6 + ' fez um total de ' + xp_ontem6 + ' xp no dia de ontem.\nDe acordo com o GuildStats.eu, o personagem ' + character7 + ' fez um total de ' + xp_ontem7 + ' xp no dia de ontem.')
      //console.log('De acordo com o GuildStats.eu, o personagem '+character+' fez um total de '+xp_ontem1+' xp no dia de ontem.')
    //  console.log('De acordo com o GuildStats.eu, o personagem '+character3+' fez um total de '+xp_ontem3+' xp no dia de ontem.')
    //  console.log('De acordo com o GuildStats.eu, o personagem '+character4+' fez um total de '+xp_ontem4+' xp no dia de ontem.')
    //  console.log('De acordo com o GuildStats.eu, o personagem '+character5+' fez um total de '+xp_ontem5+' xp no dia de ontem.')
    //  console.log('De acordo com o GuildStats.eu, o personagem '+character6+' fez um total de '+xp_ontem6+' xp no dia de ontem.')
    //  console.log('De acordo com o GuildStats.eu, o personagem '+character7+' fez um total de '+xp_ontem7+' xp no dia de ontem.')
    // console.log()
    // console.log()
    // console.log()
    // console.log()


    // await page.waitForSelector('#highscores > div.Border_2 > div > div > form > div > table > tbody > tr > td > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > select');
    // await page.select('#highscores > div.Border_2 > div > div > form > div > table > tbody > tr > td > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > select', value = servidor)
    // console.log('selecionou o servidor')
    // //await page.waitForSelector('#session_password');
    // await page.click('#highscores > div.Border_2 > div > div > form > div > table > tbody > tr > td > div > table > tbody > tr:nth-child(4) > td:nth-child(4) > div > div > input')
    // console.log('clicou')

    // let array_result = []

    //   await page.waitForSelector('#highscores > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > small > div:nth-child(1) > b > span:nth-child(20)')
    //   let qtdePaginas = await page.$eval("#highscores > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > small > div:nth-child(1) > b > span:nth-child(20)", (input) => {
    //     return input.getAttribute("value")
    //   });

    //   qtdePaginas = parseInt(qtdePaginas)

    //   console.log('Quantidade de páginas: ', qtdePaginas)

    //   console.log('Processando página 1')




    //   array_result.push(result_table)

    //   console.log(array_result)

    // await page.waitForSelector('#main-content > section > div > div > form > button');
    // await page.click('#main-content > section > div > div > form > button')

    // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });


    // const buttons = await page.$$(
    //     '[class="artdeco-button artdeco-button--2 artdeco-button--secondary ember-view full-width"]'
    // );
    //     console.log(buttons)




    console.log('Sucesso.')
    console.log('✅-->Finished script!')
    browser.close()
    return { statuscode: 200, message: array_result };

  } catch (error) {
    console.log('Conexão expirou: O site demorou mais que o esperado para responder, tente novamente.')
    console.log('❌-->Robot stop working!', error)
    browser.close()
    return { statuscode: 500, message: 'Conexão expirou: O site demorou mais que o esperado para responder, tente novamente.' };

  }
}

module.exports = tibia_scrap;