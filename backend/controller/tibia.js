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


    

    const h1 = await page.$('#tab1 > table > tbody > tr:nth-child(1) > td:nth-child(2) > h1');
    const text = await page.evaluate(h1 => h1.textContent, h1);
    if (character != text) {
      console.log(`IT Scrap Robot | ${character} é diferente de ${text}`)
      console.log('❌-->Robot stop working!', error)
      browser.close()
      return { statuscode: 401, message: `${character} é diferente de ${text}` };

    }
    console.log('IT Scrap Robot | Nome do personagem confere com o da página carregada.')

    let geral = await page.$$eval('#tab1 > table > tbody > tr', rows => {
      return Array.from(rows, row => {
        const columns = row.querySelectorAll('td');
        return Object.assign({}, Array.from(columns, column => column.innerText))
      });
    });

    let sexo = geral.find(item => item["0"] === "Sex:");
    const result_sexo = sexo ? sexo["1"] : null;

    let vocacao = geral.find(item => item["0"] === "Vocation:");
    const result_vocacao = vocacao ? vocacao["1"] : null;

    let level = geral.find(item => item["0"] === "Level:");
    let result_level_ = level ? level["1"] : null;
    const result_level = result_level_.replace(/\(.*\)/, "");

    let mundo = geral.find(item => item["0"] === "World:");
    const result_mundo = mundo ? mundo["1"] : null;

    let guild = geral.find(item => item["0"] === "Guild:");
    const result_guild = guild ? guild["1"] : null;

    let last_login = geral.find(item => item["0"] === "Last login:");
    const result_last_login = last_login ? last_login["1"] : null;

    let online = geral.find(item => item["0"] === "Online:");
    const result_online = online ? online["1"] : null;

    let mortes_geral = await page.$$eval('#deathContent > table > tbody > tr', rows => {
      return Array.from(rows, row => {
        const columns = row.querySelectorAll('td');
        return Object.assign({}, Array.from(columns, column => column.innerText))
      });
    });

    let ultima_morte_dia_ = mortes_geral[0][1]
    let ultima_morte_dia = ultima_morte_dia_.substr(0, 10);

    let ultima_morte_criatura = mortes_geral[0][2]

    let ultima_morte_level = mortes_geral[0][3]

    let ultima_morte_xp = mortes_geral[0][4]


    const h2 = await page.$('#tab7 > table:nth-child(8) > tfoot > tr > th:nth-child(2)');
    const xp_mensal = await page.evaluate(h2 => h2.textContent, h2);
    
    const h3 = await page.$('#tab7 > table:nth-child(4) > tbody > tr > td:nth-child(2)');
    const xp_record = await page.evaluate(h3 => h3.textContent, h3);

    let dias1 = await page.$$eval('#tab7 > table:nth-child(8) > tbody > tr', rows => {
      return Array.from(rows, row => {
        const columns = row.querySelectorAll('td');
        return Object.assign({}, Array.from(columns, column => column.innerText))
      });
    });

    let xp_ontem1 = dias1[29][1];
    let xp_anteontem1 = dias1[28][1];
    console.log('IT Scrap Robot | Dados capturados.')

    

    let xp_ontem1_count = xp_ontem1.replace(/[^0-9]/g, "");

    let array1 = {
      character: character,
      sex: result_sexo,
      vocation: result_vocacao,
      level: result_level,
      world: result_mundo,
      guild: result_guild,
      last_login: result_last_login,
      online: result_online,
      xp_yesterday: xp_ontem1,
      total_in_month: xp_mensal,
      record_xp: xp_record,
      last_death: 'Level '+ultima_morte_level+' no dia '+ultima_morte_dia+' para '+ultima_morte_criatura+' perdendo um total de '+ultima_morte_xp+ ' xp.'
    }

    let array_result = []
    array_result.push(array1)
    //array_result.push(geral)
    
    console.log('IT Scrap Robot | Json estruturado.')
    console.log(array_result)



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