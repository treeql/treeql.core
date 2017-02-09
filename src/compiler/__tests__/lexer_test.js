import { expect } from 'chai'

import { Lexer } from '../lexer'

describe('lexer', () => {
  it('ignore', () => {
    const input = "hello world"
    const expected = 0

    const lex = new Lexer(input)

    lex.ignore()

    expect(lex.start).be.equal(expected)
  })
})