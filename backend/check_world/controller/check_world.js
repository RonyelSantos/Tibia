const { json } = require('express');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { executablePath } = require('puppeteer')

puppeteer.use(StealthPlugin())

const check_world = async (start) => {

  console.log('✅-->Robot start working!')

  console.log('✅ | Tibia consome demais. -Karlito Juan, 2022.')

  if (!start) {
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


    const page = await browser.newPage();
    const timeout = 15000;
    page.setDefaultTimeout(timeout);

    try {

      await page.setViewport({ "width": 1366, "height": 768 })

      await page.goto(`https://www.tibia.com/community/?subtopic=worlds`, {
        waitUntil: "networkidle2",
      });

      console.log('1. ABRE GUILD STATS')
      //await page.waitForTimeout(5000);

      // for (i = 2; i < 84; i++) {
      //     let result = [];
      //     let world = await page.$eval(`#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`, element => element.innerText);
      //     let player = await page.$eval(`#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`, element => element.innerText);

      //     let json = {
      //         world,
      //         player
      //     }
      //     result.push(json)
      // }





      // console.log(result)

      // console.log('SUCESSO.')

      // console.log('✅-->Finished script!')
      // browser.close()
      // console.log()
      // return res.status(200).send(result)

      //#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(16) > td:nth-child(1) > a
      //#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr > td:nth-child(1) > a
      const world1 = await page.$eval('#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(10) > td:nth-child(1) > a', element => element.innerText);
      const world2 = await page.$eval('#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(16) > td:nth-child(1) > a', element => element.innerText);
      const world3 = await page.$eval('#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(30) > td:nth-child(1) > a', element => element.innerText);
      const world4 = await page.$eval('#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(39) > td:nth-child(1) > a', element => element.innerText);
      const world5 = await page.$eval('#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(86) > td:nth-child(1) > a', element => element.innerText);


      const player1 = await page.$eval('#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(10) > td:nth-child(2)', element => element.innerText);
      const player2 = await page.$eval('#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(16) > td:nth-child(2)', element => element.innerText);
      const player3 = await page.$eval('#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(30) > td:nth-child(2)', element => element.innerText);
      const player4 = await page.$eval('#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(39) > td:nth-child(2)', element => element.innerText);
      const player5 = await page.$eval('#worlds > div.Border_2 > div > div > div > table > tbody > tr > td > div.InnerTableContainer > table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(86) > td:nth-child(2)', element => element.innerText);

      const worldGeral = await page.$eval('body > div.main-site-container > div.main-content.Content > div:nth-child(1) > div.BorderTitleText > div > a:nth-child(4) > span', element => element.innerText);

      const total_player = parseInt(player1) + parseInt(player2) + parseInt(player3) + parseInt(player4) + parseInt(player5);

      const porcentagem_world1 = 100 / total_player * parseInt(player1);
      const porcentagem_world2 = 100 / total_player * parseInt(player2);
      const porcentagem_world3 = 100 / total_player * parseInt(player3);
      const porcentagem_world4 = 100 / total_player * parseInt(player4);
      const porcentagem_world5 = 100 / total_player * parseInt(player5);


      const geralzao = {
        "geral": worldGeral,
        "amarelo": total_player
      }

      const result = [];
      let world = {
        "nome": world1,
        "qtd_player": player1,
        "representando": porcentagem_world1.toFixed(2) + '%',
        // }



        // result.push(world)

        //let world_2 = {
        "nome2": world2,
        "qtd_player2": player2,
        "representando2": porcentagem_world2.toFixed(2) + '%',
        //}

        //result.push(world)

        // let world_3 = {
        "nome3": world3,
        "qtd_player3": player3,
        "representando3": porcentagem_world3.toFixed(2) + '%',
        //}

        //result.push(world)

        //let world_4 = {
        "nome4": world4,
        "qtd_player4": player4,
        "representando4": porcentagem_world4.toFixed(2) + '%',
        //}

        //result.push(world)

        //let world_5 = {
        "nome5": world5,
        "qtd_player5": player5,
        "representando5": porcentagem_world5.toFixed(2) + '%'
      }

      result.push(world)

      console.log(result)

      // const celebra = {
      //     "nome": world2,
      //     "qtd_player": player2,
      //     "representando": porcentagem_world2.toFixed(2)+'%'
      // }

      // const gentebra = {
      //     "nome": world3,
      //     "qtd_player": player3,
      //     "representando": porcentagem_world3.toFixed(2)+'%'
      // }

      // const kalibra = {
      //     "nome": world4,
      //     "qtd_player": player4,
      //     "representando": porcentagem_world4.toFixed(2)+'%'
      // }

      // const yonabra = {
      //     "nome": world5,
      //     "qtd_player": player5,
      //     "representando": porcentagem_world5.toFixed(2)+'%'
      // }

      // const mundos_amarelos = {belobra, celebra, gentebra, kalibra, yonabra}


      // const result = [];

      // result.push(geralzao, mundos_amarelos)

      // console.log(result)

      console.log('SUCESSO.')

      console.log('✅-->Finished script!')
      browser.close()
      console.log()
      return { statuscode: 200, message: result };


    } catch (error) {
      console.log('Conexão expirou: O site demorou mais que o esperado para responder, tente novamente.')
      console.log('❌-->Robot stop working!', error)
      browser.close()
      return { statuscode: 500, message: 'Conexão expirou: O site demorou mais que o esperado para responder, tente novamente.' };

    }
  }

module.exports = check_world;