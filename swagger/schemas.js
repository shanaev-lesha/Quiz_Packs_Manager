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
  },

   QuestionPack: {
    id: "uuid",
    user_id: "uuid",
    title: "Название пака",
    description: "Описание",
    status: "draft",
    created_at: "2026-01-01T10:00:00Z",
    updated_at: "2026-01-01T10:00:00Z"
  },

  CreateQuestionPackRequest: {
    $title: "My pack",
    description: "Описание",
    status: "draft"
  },

  UpdateQuestionPackRequest: {
    title: "Updated title",
    description: "Новое описание",
    status: "published"
  }
  
};