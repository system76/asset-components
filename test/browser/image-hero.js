import { Selector } from 'testcafe'

fixture`Image Hero`
  .page`http://localhost:9531/iframe.html?id=components-sysassetimagehero--example&viewMode=story`

const container = Selector('#root')
const hero = Selector('picture')

test('spans the full width', async (t) => {
  await t.expect(hero.clientWidth).eql(await container.clientWidth)
})
