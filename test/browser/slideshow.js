import { Selector } from 'testcafe'

fixture`Image Hero`
  .page`http://localhost:9531/iframe.html?id=components-sysslideshow--with-foreground&viewMode=story`

const container = Selector('#root')
const background = Selector('picture')
const foreground = Selector('div[style]')

test('background images can span full width', async (t) => {
  const widths = [320, 640, 1024, 2048]

  for (const width of widths) {
    await t.resizeWindow(width, 800)
    await t.expect(background.clientWidth).eql(await container.clientWidth)
  }
})

test('foreground receives the active slide number', async (t) => {
  await t.expect(foreground.innerText).eql('Slide #0')
  await t.wait(6000)
  await t.expect(foreground.innerText).eql('Slide #1')
})
