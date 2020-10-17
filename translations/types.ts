import { locales } from './config'

export type Locale = typeof locales[number]

export type Strings = {
  [key in Locale]: {
    [key: string]: string
  }
}
