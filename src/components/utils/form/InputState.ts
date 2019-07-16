export interface Rules {
  isRequired?: boolean
  isEmail?: boolean
  minLength?: number
  confirmPass?: string
}

export interface InputState {
  value: string
  valid: boolean
  type: string
  rules: Rules
}

export interface InputStateObject {
  [key: string]: InputState
}
