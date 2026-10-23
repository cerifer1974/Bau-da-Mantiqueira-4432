import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True, executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        page=await browser.new_page(viewport={"width":1440,"height":1000},device_scale_factor=1)
        errors=[]
        page.on('pageerror',lambda error:errors.append(str(error)))
        await page.goto('http://localhost:4200',wait_until='networkidle')
        await page.evaluate('document.fonts.ready')
        assert await page.title() == 'Baú da Mantiqueira — Casa & Loft'
        await page.get_by_role('tab',name='02 O Loft ATÉ 4 HÓSPEDES').click()
        assert await page.get_by_role('link',name='Reservar o Loft no Airbnb').get_attribute('href') == 'https://www.airbnb.com.br/rooms/20274293'
        await page.get_by_role('button',name='Ampliar: Ambientes integrados do Loft',exact=True).click()
        await page.get_by_role('dialog').wait_for(state='visible')
        assert await page.evaluate('document.querySelector("dialog").matches(":modal")')
        await page.keyboard.press('ArrowRight')
        assert await page.locator('dialog figure img').get_attribute('src') == '/images/loft-37.jpg'
        await page.keyboard.press('Escape')
        assert await page.get_by_role('dialog').count() == 0
        await page.get_by_text('A propriedade é exclusiva para a minha reserva?',exact=True).click()
        assert await page.locator('details[open]').count() == 1
        await page.get_by_role('tab',name='01 A Casa ATÉ 6 HÓSPEDES').click()
        assert await page.get_by_role('link',name='Reservar a Casa no Airbnb').get_attribute('href') == 'https://www.airbnb.com.br/rooms/6353169'
        for y in range(0,7500,650):
            await page.evaluate('(y)=>window.scrollTo(0,y)',y)
            await page.wait_for_timeout(90)
        await page.evaluate('window.scrollTo(0,0)')
        await page.screenshot(path='/home/user/bau-full-desktop.png',full_page=True)
        for width in [390,375,768]:
            await page.set_viewport_size({'width':width,'height':844})
            await page.evaluate('window.scrollTo(0,0)')
            assert await page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), f'Overflow at {width}'
            if width==390:
                await page.get_by_role('button',name='Abrir menu').click()
                await page.locator('nav').get_by_role('link',name='Casa & Loft').click()
                assert await page.get_by_role('button',name='Abrir menu').get_attribute('aria-expanded') == 'false'
                await page.get_by_role('tab',name='02 O Loft ATÉ 4 HÓSPEDES').click()
                await page.get_by_role('button',name='Ampliar: Ambientes integrados do Loft',exact=True).click()
                await page.get_by_role('button',name='Próxima foto').click()
                await page.get_by_role('button',name='Fechar galeria').click()
                await page.evaluate('window.scrollTo(0,0)')
                await page.screenshot(path='/home/user/bau-mobile.png')
                await page.screenshot(path='/home/user/bau-full-mobile.png',full_page=True)
        await page.evaluate('window.scrollTo(0,document.body.scrollHeight)')
        await page.wait_for_timeout(200)
        broken=await page.evaluate('Array.from(document.images).filter(i=>i.complete && i.naturalWidth===0).map(i=>i.src)')
        assert not broken,broken
        text=await page.locator('body').inner_text()
        assert 'R$' not in text
        assert not errors,errors
        print(json.dumps({'result':'PASS','viewports':[1440,390,375,768],'gallery':'native modal, navigation and escape verified','tabs':'Casa and Loft correct booking links','faq':'verified','overflow':False,'brokenImages':broken,'consoleErrors':errors},ensure_ascii=False))
        await browser.close()

asyncio.run(main())