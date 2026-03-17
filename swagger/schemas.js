export const schemas = {

  RegisterBody: {
    $email: "test@test.com",
    $password: "Password1"
  },

  LoginBody: {
    $email: "test@test.com",
    $password: "Password1"
  },

  User: {
    id: "uuid",
    email: "user@mail.com",
    created_at: "2026-01-01T10:00:00Z"
  },

  Token: {
    token: "jwt.token.here"
  }

};