// @flow

export class Lexer {
  pos:    number
  start:  number
  width:  number
  input:  string
  length: number

  constructor(input: string) {
    this.input = input
    this.start = 0
    this.pos = 0
    this.width = 0
    this.length = input.length
  }

  ignore() {
    this.start = this.pos
  }

  backup() {
    this.pos -= this.width
    this.width = 0
  }

  get next(): ?string {
    if (this.pos >= this.length) {
      this.width = 0
      return null
    }

    this.width = 1
    this.pos += this.width
    return this.input[this.pos - 1]    
  }

  get peek(): ?string {
    const value = this.next
    this.backup
    return value    
  }

  get current(): ?string {
    this.backup()
    return this.next   
  }

  get buffer(): string {
    return this.input.substring(this.start, this.pos)
  }

  get value(): string {
    const val = this.buffer
    this.ignore()
    return val
  }

  accept(valid: string): boolean {
    const part = this.next
    if (part != null && valid.indexOf(part) != -1) {
      return true
    }
    this.backup()
    return false
  }

  acceptRun(valid: string) {
    let part
    while (true ){
      part = this.next
      if (part == null || valid.indexOf(part) == -1) {
        break
      }
    }
    this.backup()
  }

  acceptRunUntil(invalid: string) {
    let part
    while (true) {
      part = this.next
      if (part == null || invalid.indexOf(part) != -1) {
        break
      }
    }
    this.backup()
  }

  acceptInSequence(seq: string): boolean {
    const len: number = seq.length
    const savedPos = this.pos

    let result: boolean = false
    let forward: number

    for (forward = 0; forward < len; forward++) {
      if (!this.accept(seq[forward])) {
        result = false
        break
      }
      result = true
    }

    if (!result) {
      this.pos = savedPos
      this.width = 0
    }

    return result
  }  
}